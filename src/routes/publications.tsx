import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Search, ExternalLink, ChevronDown, X } from "lucide-react";
import { publications, type Publication } from "@/content/site";
import { useVariantOnView } from "@/hooks/useVariantOnView";

const FEATURED_FIG = "https://lh3.googleusercontent.com/d/1em1kKrlUuGATZuRe00g7Cw_RA3F79wvB";
const FEATURED_ITC = "https://lh3.googleusercontent.com/d/1gIqgbGJjNEOukpfGbO9qlsLm9bGk_5RP";
const FEATURED_ABSTRACT = "https://lh3.googleusercontent.com/d/1wRfcaXLw7fHLm7_o2BPdEU7hNm7GIof9";

function FeaturedPublication() {
  const [lightbox, setLightbox] = useState(false);
  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative glass rounded-3xl border-l-4 border-teal-500 p-6 md:p-8 overflow-hidden"
      >
        <span className="absolute top-4 right-4 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-medium">
          Featured
        </span>
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400 font-medium">
              First-Author · Peer-Reviewed
            </p>
            <h3 className="mt-3 font-display text-2xl md:text-3xl leading-snug text-balance">
              Identification of Key Sequence Motifs Essential for the Recognition of m6A
              Modification in RNA
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Biomolecules, 16(1), 97 · MDPI · Published January 7, 2026 · DOI:{" "}
              <a
                href="https://doi.org/10.3390/biom16010097"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--azure)] hover:underline"
              >
                10.3390/biom16010097
              </a>
            </p>
            <p className="mt-5 text-foreground/90 leading-relaxed">
              Using phage display screening, we identified the m1p1 peptide motif within the hnRNP
              A1 RRM domain that selectively recognizes m6A within DRACH sequence contexts. This
              mechanistic finding establishes a molecular basis for selective m6A reading — with
              direct implications for RNA dysregulation in cancer and neurological disease.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Author contributions: Investigation · Experiment Design · Data Collection · Data
              Analysis · Visualization · Methodology
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground/80">
              Aftab Mollah, Rushdhi Rauff, Sudeshi Abedeera, Chathurani Ekanayake, Chamali Thalagaha
              Mudiyanselage, Minhchau To, Helen Piontkivska, Sanjaya Abeysirigunawardena
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://doi.org/10.3390/biom16010097"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-teal-500 text-white px-5 py-2.5 text-sm font-medium hover:bg-teal-600 transition-colors"
              >
                <ExternalLink className="h-4 w-4" /> Read Paper
              </a>
              <button
                onClick={() => setLightbox(true)}
                className="inline-flex items-center gap-2 rounded-full glass border border-border px-5 py-2.5 text-sm font-medium hover:shadow-glow"
              >
                View Graphical Abstract
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="glass rounded-2xl p-2 overflow-hidden">
              <img
                src={FEATURED_FIG}
                alt="Sequence motif figure"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-xl object-contain bg-background/40"
              />
            </div>
            <div className="glass rounded-2xl p-2 overflow-hidden">
              <img
                src={FEATURED_ITC}
                alt="ITC binding thermogram"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-xl object-contain bg-background/40"
              />
              <p className="text-center text-xs text-muted-foreground mt-2 mb-1">
                ITC binding thermogram
              </p>
            </div>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm grid place-items-center p-6"
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-6 right-6 glass h-10 w-10 grid place-items-center rounded-full"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={FEATURED_ABSTRACT}
              alt="Graphical abstract"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-glow"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const filters = [
  { id: "all", label: "All" },
  { id: "article", label: "Articles" },
  { id: "abstract", label: "Abstracts" },
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
            <span className="rounded-full bg-[var(--accent)]/60 px-2.5 py-0.5 uppercase tracking-wider text-[10px]">
              {p.type}
            </span>
            <span className="text-muted-foreground">{p.venue}</span>
            <span className="text-[var(--azure)]">{p.year}</span>
          </div>
          <h3 className="mt-2 font-display text-xl md:text-2xl text-balance leading-snug">
            {p.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.authors}</p>
        </div>
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            aria-label="Open publication"
            className="shrink-0 glass h-9 w-9 grid place-items-center rounded-full hover:shadow-glow"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--azure)] hover:underline"
      >
        {open ? "Hide abstract" : "Show abstract"}{" "}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
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
            {p.doi && (
              <span className="block mt-2 text-xs">
                DOI:{" "}
                <a
                  className="text-[var(--azure)] hover:underline"
                  href={`https://doi.org/${p.doi}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.doi}
                </a>
              </span>
            )}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function PublicationsSection() {
  const ref = useVariantOnView<HTMLElement>("publications");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const items = useMemo(() => {
    return publications
      .filter((p) => filter === "all" || p.type === filter)
      .filter((p) => {
        if (!q.trim()) return true;
        const s = q.toLowerCase();
        return (
          p.title.toLowerCase().includes(s) ||
          p.venue.toLowerCase().includes(s) ||
          p.abstract.toLowerCase().includes(s)
        );
      })
      .sort((a, b) => b.year - a.year);
  }, [q, filter]);

  return (
    <section id="publications" ref={ref} className="mx-auto max-w-5xl px-6 pt-8 pb-20 scroll-mt-24">
      <SectionHeader
        eyebrow="Archive"
        title={
          <>
            Publications & <span className="text-gradient italic">presentations</span>.
          </>
        }
        description="A modern archive of papers, posters, and talks."
      />

      <div className="mt-12">
        <FeaturedPublication />
      </div>

      <div className="mt-8 glass rounded-2xl p-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
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
          {filters.map((f) => (
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
          items.map((p) => <PubCard key={p.id} p={p} />)
        )}
      </div>
    </section>
  );
}
