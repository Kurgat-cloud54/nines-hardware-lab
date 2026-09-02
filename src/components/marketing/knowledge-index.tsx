import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

const articles = [
  { slug: "/knowledge-centre/when-repair-beats-replacement", tag: "Repair economics", title: "When repair beats replacement", excerpt: "How to judge whether fixing failed enterprise hardware is smarter than buying new — cost, lead time, risk and value." },
  { slug: "/knowledge-centre/repair-esg-e-waste", tag: "Sustainability", title: "How repair supports your ESG and e-waste goals", excerpt: "Electronic waste is one of the fastest-growing waste streams in the world. See how documented repair turns hardware maintenance into measurable sustainability." },
  { slug: "/knowledge-centre/preparing-equipment-for-assessment", tag: "Practical guide", title: "Preparing equipment for assessment", excerpt: "What to document, what to include and how to pack failed hardware so our engineers can diagnose it quickly." },
] as const;

export function KnowledgeIndex() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.slug} href={article.slug} className="group flex flex-col rounded-lg border border-blue-900/80 bg-panel p-7 transition hover:border-blue-500/70">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-400">{article.tag}</p>
            <h2 className="mt-4 text-xl font-semibold leading-snug">{article.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{article.excerpt}</p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-400">Read article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></p>
          </Link>
        ))}
      </div>
      <p className="mt-10 text-sm text-slate-500">Engineering notes and case studies are on the way. <Link href="/contact" className="text-sky-400 transition hover:text-sky-300">Tell us</Link> if there is a topic you would like covered.</p>
    </div>
  );
}

export function KnowledgeArticle({ page }: { page: { sections: { title: string; copy?: string; items: string[] }[] } }) {
  return (
    <article className="mx-auto max-w-3xl">
      <Link href="/knowledge-centre" className="text-sm text-sky-400 transition hover:text-sky-300">← Back to knowledge centre</Link>
      <div className="mt-10 space-y-12">
        {page.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            {section.copy && <p className="mt-4 leading-8 text-slate-300">{section.copy}</p>}
            <ul className="mt-6 space-y-4">{section.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-electric" />{item}</li>)}</ul>
          </section>
        ))}
      </div>
    </article>
  );
}
