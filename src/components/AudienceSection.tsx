import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

const stats = [
  { n: "2", l: "First-author papers" },
  { n: "15+", l: "Experimental techniques" },
  { n: "3", l: "Institutions, 2 continents" },
  { n: "5+", l: "Awards & scholarships" },
];

export function AudienceSection() {
  return (
    <section id="audience" className="mx-auto max-w-7xl px-6 pt-8 pb-20 scroll-mt-24">
      <SectionHeader
        eyebrow="What I Bring"
        title={<>The short version, for anyone <span className="text-gradient italic">who wants it</span>.</>}
        description="A concise account of the skills, experience, and scientific focus I bring to any research environment."
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 glass rounded-3xl p-8 md:p-14 relative overflow-hidden"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-[36rem] rounded-full bg-gradient-to-br from-[var(--azure)]/30 to-[var(--cyan)]/30 blur-3xl pointer-events-none" />
        <h3 className="relative font-display text-3xl md:text-5xl leading-tight text-center text-balance max-w-3xl mx-auto">
          I quantify how <span className="text-gradient italic">biology makes decisions</span> at the molecular level.
        </h3>
        <div className="relative mt-8 max-w-[700px] mx-auto space-y-5 text-base md:text-lg leading-relaxed text-foreground/85 dark:text-muted-foreground">
          <p>
            My work sits at the intersection of biophysics and RNA biology — specifically, how
            proteins recognize chemically modified RNA and what that recognition costs
            thermodynamically. I use isothermal titration calorimetry, fluorescence spectroscopy,
            and confocal microscopy to get numbers, not just observations.
          </p>
          <p>
            That means I'm useful anywhere precision matters: understanding a biological mechanism
            deeply enough to intervene in it, whether in an academic lab or an R&amp;D setting.
          </p>
        </div>
        <div className="relative mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <p className="font-display text-3xl md:text-4xl text-[var(--azure)]">{s.n}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
