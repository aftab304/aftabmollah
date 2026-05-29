import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Search, ExternalLink, ChevronDown } from "lucide-react";
import { publications, type Publication } from "@/content/site";
import { useVariantOnView } from "@/hooks/useVariantOnView";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications & Presentations — Aftab Mollah" },
      { name: "description", content: "Peer-reviewed publications, poster presentations, and conference talks on RNA-protein interactions and m6A biology." },
      { property: "og:title", content: "Publications — Aftab Mollah" },
      { property: "og:description", content: "Papers, posters, and talks." },
      { property: "og:url", content: "/publications" },
    ],
    links: [{ rel: "canonical", href: "/publications" }],
  }),
  component: PublicationsPage,
});

const filters = [
  { id: "all", label: "All" },
  { id: "article", label: "Articles" },
  { id: "poster", label: "Posters" },
  { id: "talk", label: "Talks" },
] as const;

function PubCard({ p }: { p: Publication }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article layout className="glass rounded-2xl p-5 hover:shadow-glow transition-all">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full bg-[var(--accent)]/60 px-2.5 py-0.5 uppercase tracking-wider text-[10px]">{p.type}</span>
            <span className="text-muted-foreground">{p.venue}</span>
            <span className="text-[var(--azure)]">{p.year}</span>
          </div>
          <h3 className="mt-2 font-display text-xl md:text-2xl text-balance leading-snug">{p.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.authors}</p>
        </div>
        {p.link && (
          <a href={p.link} target="_blank" rel="noreferrer" aria-label="Open publication"
             className="shrink-0 glass h-9 w-9 grid place-items-center rounded-full hover:shadow-glow">
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
      <button
        onClick={() => setOpen(o => !o)}
        className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--azure)] hover:underline"
      >
        {open ? "Hide abstract" : "Show abstract"} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 text-sm text-muted-foreground leading-relaxed overflow-hidden"
          >
            {p.abstract}
            {p.doi && <span className="block mt-2 text-xs">DOI: <a className="text-[var(--azure)] hover:underline" href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">{p.doi}</a></span>}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function PublicationsSection() {
  const ref = useVariantOnView<HTMLElement>("publications");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<typeof filters[number]["id"]>("all");

  const items = useMemo(() => {
    return publications
      .filter(p => filter === "all" || p.type === filter)
      .filter(p => {
        if (!q.trim()) return true;
        const s = q.toLowerCase();
        return p.title.toLowerCase().includes(s) || p.venue.toLowerCase().includes(s) || p.abstract.toLowerCase().includes(s);
      })
      .sort((a, b) => b.year - a.year);
  }, [q, filter]);

  return (
    <section id="publications" ref={ref} className="mx-auto max-w-5xl px-6 pt-8 pb-20 scroll-mt-24">
      <SectionHeader
        eyebrow="Archive"
        title={<>Publications & <span className="text-gradient italic">presentations</span>.</>}
        description="A modern archive of papers, posters, and talks."
      />

      <div className="mt-12 glass rounded-2xl p-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles, venues, abstracts..."
            className="w-full bg-transparent rounded-xl pl-10 pr-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${filter === f.id ? "bg-foreground text-background" : "hover:bg-[var(--accent)]"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {items.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
            No results match your filters.
          </div>
        ) : (
          items.map(p => <PubCard key={p.id} p={p} />)
        )}
      </div>
    </section>
  );
}
