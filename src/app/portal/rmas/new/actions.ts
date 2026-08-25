"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const intakeSchema = z.object({
  manufacturer: z.string().trim().min(2).max(120),
  model: z.string().trim().min(1).max(120),
  serial_number: z.string().trim().min(1).max(120),
  category: z.string().trim().max(80).optional(),
  fault_description: z.string().trim().min(10).max(5000),
  priority: z.enum(["standard", "urgent", "critical"]),
});

export type IntakeState = { error?: string };

export async function createRma(_prev: IntakeState, formData: FormData): Promise<IntakeState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Session expired. Please sign in again." };

  const parsed = intakeSchema.safeParse({
    manufacturer: formData.get("manufacturer"),
    model: formData.get("model"),
    serial_number: formData.get("serial_number"),
    category: formData.get("category") || undefined,
    fault_description: formData.get("fault_description"),
    priority: formData.get("priority"),
  });
  if (!parsed.success) {
    return { error: "Please check the form — equipment fields and a fault description of at least 10 characters are required." };
  }

  const { data: profile } = await supabase.from("profiles").select("organization_id").eq("id", user.id).single();
  if (!profile?.organization_id) {
    return { error: "Your account isn't linked to an organization yet. Contact NiNes support to get set up." };
  }

  // Register the equipment (or reuse it when this serial already exists).
  const { serial_number, manufacturer, model, category } = parsed.data;
  let equipmentId: string | null = null;
  const { data: existing } = await supabase
    .from("equipment")
    .select("id")
    .eq("serial_number", serial_number)
    .limit(1);
  if (existing && existing.length > 0) {
    equipmentId = existing[0].id;
  } else {
    const { data: inserted, error: equipError } = await supabase
      .from("equipment")
      .insert({ organization_id: profile.organization_id, manufacturer, model, serial_number, category: category ?? null })
      .select("id")
      .single();
    if (equipError) return { error: `Could not register equipment: ${equipError.message}` };
    equipmentId = inserted.id;
  }

  const { data: rma, error: rmaError } = await supabase
    .from("rmas")
    .insert({
      organization_id: profile.organization_id,
      requested_by: user.id,
      equipment_id: equipmentId,
      fault_description: parsed.data.fault_description,
      priority: parsed.data.priority,
      status: "submitted",
      submitted_at: new Date().toISOString(),
    })
    .select("id")
    .single();
  if (rmaError) return { error: `Could not submit RMA: ${rmaError.message}` };

  await supabase.from("rma_events").insert({ rma_id: rma.id, actor_id: user.id, status: "submitted", note: "RMA submitted by customer." });

  revalidatePath("/portal");
  redirect(`/portal/rmas/${rma.id}?submitted=1`);
}
