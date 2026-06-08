import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowRight, ExternalLink } from "lucide-react";
import { publications } from "@/content/site";
import { useVariantOnView } from "@/hooks/useVariantOnView";
import abstractM6a from "@/assets/research/abstract-m6a.jpg";
import abstractRecognition from "@/assets/research/abstract-recognition.jpg";
import abstractBiophysics from "@/assets/research/abstract-biophysics.jpg";
import abstractImaging from "@/assets/research/abstract-imaging.jpg";

const themes = [
  {
    title: "m6A Reader Proteins",
    problem: "N6-methyladenosine (m6A) is the most abundant internal mRNA modification, yet how reader proteins selectively recognize it within DRACH motifs is still being decoded.",
    matters: "Reader recognition controls mRNA stability, localization, and translation — directly tied to development, cancer, and immune responses.",
    approach: "I identify and characterize candidate readers like hnRNP A1 using ITC, fluorescence binding assays, and structural biology.",
    accent: "from-[var(--azure)] to-[var(--cyan)]",
    pubIds: ["m6a-motifs-2025", "m6a-biophysj-2024"],
    image: abstractM6a,
  },
  {
    title: "RNA–Protein Recognition",
    problem: "Specificity in RNA–protein interactions emerges from a subtle balance of shape, charge, and sequence context.",
    matters: "Quantifying that balance is the first step toward engineering RNA-targeting therapeutics and diagnostic probes.",
    approach: "I combine systematic mutagenesis with quantitative biophysics — thermodynamic fingerprints reveal what binding really costs.",
    accent: "from-[var(--cyan)] to-[var(--azure)]",
    pubIds: ["bps-philly-2024", "bps-la-2025"],
    image: abstractRecognition,
  },
  {
    title: "Biophysical Characterization",
    problem: "Many candidate RNA-binding proteins lack a quantitative description of their binding modes.",
    matters: "Without rigorous thermodynamics and kinetics, mechanistic hypotheses remain just hypotheses.",
    approach: "ITC for thermodynamics, fluorescence for kinetics and conformational change, EMSA for selectivity — used together they form a complete picture.",
    accent: "from-[var(--azure)] to-[var(--cyan)]",
    pubIds: ["rustbelt-rna"],
    image: abstractBiophysics,
  },
  {
    title: "Fluorescence & Imaging",
    problem: "Bulk biophysics misses cellular context; imaging misses molecular detail.",
    matters: "Bridging these scales lets us tie thermodynamic affinity to where and when binding happens in living systems.",
    approach: "Confocal fluorescence microscopy on labeled biomolecules connects in-cell observations with in vitro biophysics.",
    accent: "from-[var(--cyan)] to-[var(--azure)]",
    pubIds: ["msno-2026"],
    image: abstractImaging,
  },
];

function pubById(id: string) {
  return publications.find(p => p.id === id);
}

export function ResearchSection() {
  const ref = useVariantOnView<HTMLElement>("research");
  return (
    <section id="research" ref={ref} className="mx-auto max-w-7xl px-6 pt-8 pb-20 scroll-mt-24">
      <SectionHeader
        eyebrow="Research"
        title={<>The science I <span className="text-gradient italic">live in</span>.</>}
        description="Four interconnected themes at the intersection of RNA biology, biophysics, and biomolecular recognition."
      />

      <div className="mt-16 grid gap-8">
        {themes.map((t, i) => (
          <motion.article
            key={t.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className={`absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gradient-to-br ${t.accent} opacity-30 blur-3xl pointer-events-none`} />
            <div className="grid md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] gap-6 md:gap-8 items-start">
              {/* Graphical abstract placeholder — square */}
              <div className="relative">
                <div className="glass rounded-2xl p-2 relative overflow-hidden">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[var(--accent)]/40 to-transparent">
                    <img
                      src={t.image}
                      alt=""
                      loading="lazy"
                      width={768}
                      height={768}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] uppercase tracking-[0.2em]">
                      <span className="bg-background/80 backdrop-blur rounded-full px-2 py-1 text-foreground/80">Graphical abstract</span>
                      <span className="bg-background/80 backdrop-blur rounded-full px-2 py-1 text-muted-foreground">Placeholder</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Theme {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-3xl md:text-4xl text-balance">{t.title}</h3>
                <div className={`mt-3 h-1 w-16 rounded-full bg-gradient-to-r ${t.accent}`} />

                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--azure)]">The problem</p>
                    <p className="mt-1.5 text-foreground/90 leading-relaxed">{t.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--azure)]">Why it matters</p>
                    <p className="mt-1.5 text-muted-foreground leading-relaxed">{t.matters}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--azure)]">My approach</p>
                    <p className="mt-1.5 text-muted-foreground leading-relaxed">{t.approach}</p>
                  </div>
                  {t.pubIds.length > 0 && (
                    <div className="pt-1">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Related work</p>
                      <div className="mt-3 grid sm:grid-cols-2 gap-2">
                        {t.pubIds.map(id => {
                          const p = pubById(id); if (!p) return null;
                          return (
                            <a
                              key={id}
                              href={p.link ?? "#"}
                              target={p.link ? "_blank" : undefined}
                              rel="noreferrer"
                              className="group flex items-start gap-2 rounded-xl border border-border/60 hover:border-[var(--azure)]/60 bg-background/40 p-3 text-sm transition-colors"
                            >
                              <ExternalLink className="h-3.5 w-3.5 mt-0.5 text-[var(--azure)] shrink-0" />
                              <span className="leading-snug">
                                <span className="font-medium">{p.title}</span>
                                <span className="block text-xs text-muted-foreground mt-0.5">{p.venue} · {p.year}</span>
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link to="/publications" className="inline-flex items-center gap-2 glass rounded-full px-5 py-3 text-sm font-medium hover:shadow-glow">
          See all publications & presentations <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function ResearchPage() {
  return <ResearchSection />;
}
