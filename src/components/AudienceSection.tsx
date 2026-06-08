import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

const academic = [
  "Expert in RNA-protein biophysics — ITC, fluorescence spectroscopy, confocal microscopy",
  "First-author publications in Cell Press and MDPI journals",
  "Trained in structural biology, molecular cloning, and mammalian cell culture",
  "Mentorship track record — mentees winning awards at Ohio Academy of Science and ACS Honors Week",
  "Seeking postdoctoral positions in RNA biology, epitranscriptomics, or biophysics",
];

const industry = [
  "15+ validated assay and characterization techniques transferable to drug discovery pipelines",
  "Target validation: quantifying RNA-binding protein interactions relevant to cancer, neurodegeneration, and immune modulation",
  "Assay development: ITC, EMSA, fluorescence binding — adaptable to high-throughput formats",
  "Comfortable working across biology, chemistry, and biophysics in multidisciplinary teams",
  "Open to R&D scientist, assay development, and biophysics roles in biotech and pharma",
];

export function AudienceSection() {
  return (
    <section id="audience" className="mx-auto max-w-7xl px-6 pt-8 pb-20 scroll-mt-24">
      <SectionHeader
        eyebrow="Who I work with"
        title={<>What I bring to the <span className="text-gradient italic">table</span>.</>}
        description="For both academic labs and industry R&D teams."
      />
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-7 md:p-9 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-teal-400/40 to-cyan-400/30 blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/15 text-teal-300 px-3 py-1 text-[10px] uppercase tracking-[0.18em]">
            For Academic Postdocs
          </div>
          <h3 className="mt-4 font-display text-2xl md:text-3xl">Academic research labs</h3>
          <ul className="mt-5 space-y-3">
            {academic.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-500/15 text-teal-300 px-3 py-1.5 text-xs">
            Available from June 2027
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="glass rounded-3xl p-7 md:p-9 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-amber-400/40 to-orange-400/30 blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 text-amber-300 px-3 py-1 text-[10px] uppercase tracking-[0.18em]">
            For Industry R&amp;D
          </div>
          <h3 className="mt-4 font-display text-2xl md:text-3xl">Biotech &amp; pharma R&amp;D</h3>
          <ul className="mt-5 space-y-3">
            {industry.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500/15 text-amber-300 px-3 py-1.5 text-xs">
            Open to opportunities from June 2027
          </div>
        </motion.div>
      </div>
    </section>
  );
}
