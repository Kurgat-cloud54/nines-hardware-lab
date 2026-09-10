"use client";

import { useMemo, useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";

const BUSINESS = {
  name: "NiNes Hardware Lab",
  email: "nineshardware.lab@gmail.com",
  phone: "+254 181 246 914",
  site: "nines-hardware-lab.vercel.app",
};

type LineItem = { id: number; description: string; qty: string; unitPrice: string };

const input = "w-full rounded border border-blue-900/80 bg-ink p-2.5 text-sm outline-none focus:border-blue-500";
const label = "text-xs font-semibold uppercase tracking-wide text-slate-400";

let nextId = 1;
const emptyItem = (): LineItem => ({ id: nextId++, description: "", qty: "1", unitPrice: "" });

export default function InvoicePage() {
  const today = new Date().toISOString().slice(0, 10);
  const [invoiceNo, setInvoiceNo] = useState(`NHL-${today.replace(/-/g, "").slice(2)}-01`);
  const [date, setDate] = useState(today);
  const [dueDate, setDueDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientOrg, setClientOrg] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [currency, setCurrency] = useState("KES");
  const [taxRate, setTaxRate] = useState("16");
  const [notes, setNotes] = useState("Thank you for your business. Payment is due within 7 days.");
  const [items, setItems] = useState<LineItem[]>([{ ...emptyItem(), description: "Repair service" }]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (Number(item.qty) || 0) * (Number(item.unitPrice) || 0), 0);
    const tax = subtotal * ((Number(taxRate) || 0) / 100);
    return { subtotal, tax, total: subtotal + tax };
  }, [items, taxRate]);

  const money = (value: number) => `${currency} ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  function updateItem(id: number, field: keyof LineItem, value: string) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  }

  async function downloadPdf() {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    const doc = new jsPDF();

    doc.setFillColor(3, 11, 21);
    doc.rect(0, 0, 210, 34, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text(BUSINESS.name, 14, 15);
    doc.setFontSize(9);
    doc.setTextColor(148, 197, 255);
    doc.text(`${BUSINESS.email}  ·  ${BUSINESS.phone}  ·  ${BUSINESS.site}`, 14, 23);

    doc.setTextColor(8, 124, 255);
    doc.setFontSize(22);
    doc.text("INVOICE", 160, 16, { align: "right" });
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(9);
    doc.text(`No: ${invoiceNo}`, 196, 24, { align: "right" });
    doc.text(`Date: ${date}`, 196, 29, { align: "right" });

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(10);
    doc.text("BILL TO", 14, 46);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text([clientName || "-", clientOrg || "", clientContact || ""].filter(Boolean), 14, 53);
    if (dueDate) {
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      doc.text("DUE DATE", 140, 46);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.text(dueDate, 196, 53, { align: "right" });
    }

    autoTable(doc, {
      startY: 76,
      head: [["#", "Description", "Qty", "Unit price", "Amount"]],
      body: items.map((item, index) => [
        String(index + 1),
        item.description || "-",
        item.qty || "1",
        money(Number(item.unitPrice) || 0),
        money((Number(item.qty) || 0) * (Number(item.unitPrice) || 0)),
      ]),
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3.5 },
      headStyles: { fillColor: [8, 124, 255], textColor: 255 },
      alternateRowStyles: { fillColor: [241, 246, 252] },
      columnStyles: { 0: { cellWidth: 10 }, 2: { halign: "right", cellWidth: 20 }, 3: { halign: "right", cellWidth: 35 }, 4: { halign: "right", cellWidth: 35 } },
    });

    const afterItems = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    const rows: [string, string][] = [
      ["Subtotal", money(totals.subtotal)],
      [`VAT (${taxRate || 0}%)`, money(totals.tax)],
      ["Total due", money(totals.total)],
    ];
    let y = afterItems;
    rows.forEach(([name, value], index) => {
      const isTotal = index === rows.length - 1;
      if (isTotal) {
        doc.setFillColor(3, 11, 21);
        doc.rect(120, y - 5, 66, 10, "F");
        doc.setTextColor(255, 255, 255);
      }
      doc.setFontSize(isTotal ? 11 : 10);
      if (!isTotal) doc.setTextColor(60, 60, 60);
      doc.text(name, 126, y + 2);
      doc.text(value, 182, y + 2, { align: "right" });
      y += isTotal ? 0 : 7;
    });

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(doc.splitTextToSize(notes, 180), 14, Math.max(afterItems + 40, y + 14));
    doc.text(`${BUSINESS.name} — Enterprise electronics repair laboratory`, 14, 288);

    doc.save(`${invoiceNo || "invoice"}.pdf`);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Create invoice</h1>
          <p className="mt-2 text-sm text-slate-400">Fill in the details, then download a branded PDF to send to your customer.</p>
        </div>
        <button onClick={downloadPdf} className="inline-flex items-center gap-2 rounded bg-electric px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500">
          <Download className="h-4 w-4" /> Download PDF
        </button>
      </div>

      <div className="mt-8 grid gap-6">
        <section className="grid gap-4 rounded-lg border border-blue-900/80 bg-panel p-6 sm:grid-cols-4">
          <div><p className={label}>Invoice no.</p><input className={`${input} mt-2`} value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} /></div>
          <div><p className={label}>Date</p><input type="date" className={`${input} mt-2`} value={date} onChange={e => setDate(e.target.value)} /></div>
          <div><p className={label}>Due date</p><input type="date" className={`${input} mt-2`} value={dueDate} onChange={e => setDueDate(e.target.value)} /></div>
          <div><p className={label}>Currency</p>
            <select className={`${input} mt-2`} value={currency} onChange={e => setCurrency(e.target.value)}>
              <option>KES</option><option>USD</option><option>EUR</option><option>GBP</option>
            </select>
          </div>
        </section>

        <section className="rounded-lg border border-blue-900/80 bg-panel p-6">
          <p className={label}>Bill to</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <input className={input} placeholder="Client name" value={clientName} onChange={e => setClientName(e.target.value)} />
            <input className={input} placeholder="Organisation" value={clientOrg} onChange={e => setClientOrg(e.target.value)} />
            <input className={input} placeholder="Email / phone" value={clientContact} onChange={e => setClientContact(e.target.value)} />
          </div>
        </section>

        <section className="rounded-lg border border-blue-900/80 bg-panel p-6">
          <div className="flex items-center justify-between">
            <p className={label}>Line items</p>
            <button onClick={() => setItems(prev => [...prev, emptyItem()])} className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 transition hover:text-sky-300">
              <Plus className="h-4 w-4" /> Add item
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-[1fr_70px_110px_110px_36px] items-center gap-3">
                <input className={input} placeholder={`Item ${index + 1} description`} value={item.description} onChange={e => updateItem(item.id, "description", e.target.value)} />
                <input className={input} type="number" min="0" placeholder="Qty" value={item.qty} onChange={e => updateItem(item.id, "qty", e.target.value)} />
                <input className={input} type="number" min="0" placeholder="Unit price" value={item.unitPrice} onChange={e => updateItem(item.id, "unitPrice", e.target.value)} />
                <p className="text-right text-sm text-slate-300">{money((Number(item.qty) || 0) * (Number(item.unitPrice) || 0))}</p>
                <button aria-label="Remove item" onClick={() => setItems(prev => prev.length === 1 ? prev : prev.filter(row => row.id !== item.id))} className="rounded p-2 text-slate-500 transition hover:text-red-400 disabled:opacity-30" disabled={items.length === 1}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-end gap-1.5 border-t border-blue-900/60 pt-4 text-sm">
            <p className="flex w-64 justify-between text-slate-400"><span>Subtotal</span><span>{money(totals.subtotal)}</span></p>
            <p className="flex w-64 justify-between text-slate-400"><span>VAT ({taxRate || 0}%)</span><span>{money(totals.tax)}</span></p>
            <p className="flex w-64 justify-between text-base font-bold text-white"><span>Total</span><span>{money(totals.total)}</span></p>
          </div>
        </section>

        <section className="grid gap-4 rounded-lg border border-blue-900/80 bg-panel p-6 sm:grid-cols-[110px_1fr]">
          <div><p className={label}>VAT %</p><input className={`${input} mt-2`} type="number" min="0" value={taxRate} onChange={e => setTaxRate(e.target.value)} /></div>
          <div><p className={label}>Notes</p><textarea className={`${input} mt-2`} rows={3} value={notes} onChange={e => setNotes(e.target.value)} /></div>
        </section>
      </div>
    </div>
  );
}
