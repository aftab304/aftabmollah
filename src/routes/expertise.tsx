import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import {
  ITCAnim, FluorescenceAnim, ConfocalAnim, BindingAnim,
  PurificationAnim, CloningAnim, GelAnim,
  CellCultureAnim, NanotechAnim,
} from "@/components/TechniqueAnims";
import { useVariantOnView } from "@/hooks/useVariantOnView";

const hero = [
  { title: "Isothermal Titration Calorimetry", short: "ITC", desc: "Used to measure binding thermodynamics of m6A reader protein interactions — providing ΔH, ΔS, and Kd values to support and validate phage display and pull-down assay data.", anim: ITCAnim },
  { title: "Fluorescence Spectroscopy", short: "Fluorescence", desc: "Applied during Master's research to image fluorescent carbon nanoparticles inside cancer cells, demonstrating selective drug uptake — and used at Kent State to probe RNA-protein binding interactions.", anim: FluorescenceAnim },
  { title: "Confocal Fluorescence Microscopy", short: "Confocal", desc: "Applied to visualize fluorophore-labeled biomolecules and RNA-protein complexes in fixed and live cell systems.", anim: ConfocalAnim },
  { title: "RNA–Protein Binding Assays", short: "RNA–Protein", desc: "EMSA, fluorescence binding, and competition assays to quantify specificity and selectivity. Applied in the context of m6A reader protein characterization.", anim: BindingAnim },
  { title: "Human Cell Culture", short: "Cell Culture", desc: "Mammalian cell lines for expression, transfection, and live-cell imaging of RNA-protein complexes. Applied in the context of m6A reader protein characterization.", anim: CellCultureAnim },
  { title: "Nanotechnology", short: "Nanotech", desc: "Functionalized nanoparticle synthesis and characterization for biological and diagnostic applications. Applied in the context of m6A reader protein characterization.", anim: NanotechAnim },
  { title: "Protein Purification", short: "Purification", desc: "Affinity, ion-exchange, and size-exclusion chromatography for biophysics-grade samples. Applied in the context of m6A reader protein characterization.", anim: PurificationAnim },
  { title: "Molecular Cloning", short: "Cloning", desc: "Mutagenesis, Gibson assembly, and expression vector design for RNA-binding protein constructs. Applied in the context of m6A reader protein characterization.", anim: CloningAnim },
  { title: "EMSA & Western Blot", short: "EMSA", desc: "Used to confirm and characterize RNA-protein binding across 10+ RNA constructs, establishing specificity of m6A reader protein recognition.", anim: GelAnim },
];

const more = [
  { title: "NMR Spectroscopy", desc: "Solution-state NMR for atomic-resolution insight into structure and dynamics." },
  { title: "TEM & SEM", desc: "Ultrastructural imaging of nanoparticles and biomolecular assemblies." },
  { title: "Dynamic Light Scattering", desc: "Size distribution and oligomeric state of macromolecules in solution." },
  { title: "Gel Electrophoresis", desc: "SDS-PAGE and native gels for biochemical characterization." },
  { title: "UV-Visible Spectroscopy", desc: "Absorbance-based quantification and binding studies." },
  { title: "IR Spectroscopy", desc: "Vibrational spectroscopy for secondary structure analysis." },
];

function TechniqueCard({ title, desc, AnimComp, index }: { title: string; desc: string; AnimComp: React.ComponentType; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      className="glass rounded-3xl p-5 overflow-hidden group hover:shadow-glow transition-all"
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--accent)]/40 to-transparent ring-1 ring-border/40">
        <AnimComp />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
      </div>
      <p className="mt-5 font-display text-xl">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.article>
  );
}

export function ExpertiseSection() {
  const ref = useVariantOnView<HTMLElement>("expertise");
  return (
    <section id="expertise" ref={ref} className="mx-auto max-w-7xl px-6 pt-8 pb-20 scroll-mt-24">
      <SectionHeader
        eyebrow="Methods & Instrumentation"
        title={<>Techniques & <span className="text-gradient italic">expertise</span>.</>}
        description="An interactive look at the experimental toolkit I bring to RNA-protein biophysics — from thermodynamics to single-cell imaging."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {hero.map((t, i) => (
          <TechniqueCard key={t.title} title={t.title} desc={t.desc} AnimComp={t.anim} index={i} />
        ))}
      </div>

      <div className="mt-20">
        <p className="font-display text-2xl md:text-3xl">Additional methods.</p>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Complementary techniques that round out a multidisciplinary research practice.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {more.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="glass rounded-2xl p-5 hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-[var(--azure)] to-[var(--cyan)]" />
              <p className="mt-3 font-display text-lg">{m.title}</p>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

