import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Linkedin,
  Mail,
  GraduationCap,
  BookOpen,
  Sparkles,
} from "lucide-react";
import {
  portraitUrl,
  portraitAlt,
  linkedinUrl,
  scholarUrl,
  orcidUrl,
  researchgateUrl,
  cvUrl,
  email,
} from "@/content/site";
import { useVariantOnView } from "@/hooks/useVariantOnView";

const tags = [
  "PhD Candidate",
  "MSc · Indian Institute of Technology",
  "MA · Kent State University",
  "Biochemist",
  "Molecular Biologist",
  "RNA Researcher",
];

function RGIcon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-[10px] font-semibold tracking-tight ${className}`}
      aria-hidden
    >
      RG
    </span>
  );
}

export function HeroSection() {
  const ref = useVariantOnView<HTMLElement>("hero");
  return (
    <section id="hero" ref={ref} className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-20 pb-24 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground"
          >
            <Sparkles className="h-3 w-3 text-[var(--azure)]" />
            Kent State University · Chemistry & Biochemistry
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-balance"
          >
            Decoding the <span className="text-gradient italic">hidden language</span> between RNA
            and proteins.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 max-w-xl glass rounded-2xl border-l-4 border-teal-500 bg-background/40 dark:bg-background/30 p-5"
          >
            <p className="font-display text-lg md:text-xl leading-snug text-foreground">
              We identified the m1p1 peptide motif within the hnRNP A1 RRM domain that selectively
              recognizes m6A within DRACH sequence contexts.
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              This finding has direct implications for understanding RNA dysregulation in cancer and
              neurological disease.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            My research sits at the intersection of RNA biology and biophysics — using isothermal
            titration calorimetry, fluorescence spectroscopy, and EMSA to characterize how proteins
            recognize chemically modified RNA. The work is mechanistically grounded and directly
            relevant to RNA dysregulation in cancer and neurological disease.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-7 flex flex-wrap gap-2"
          >
            {tags.map((t) => (
              <span key={t} className="glass rounded-full px-3 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 dark:bg-teal-500/15 text-teal-800 dark:text-teal-300 px-3 py-1 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
              Seeking postdoctoral &amp; industry R&amp;D positions · Expected graduation June 2027
              · Available from Summer 2027
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href={cvUrl}
              download="Aftab_Mollah_CV.pdf"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium shadow-glow hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <a
              href="#publications"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium hover:shadow-glow"
            >
              Publications <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium hover:shadow-glow"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex items-center gap-3"
          >
            {[
              { href: linkedinUrl, icon: Linkedin, label: "LinkedIn" },
              { href: scholarUrl, icon: GraduationCap, label: "Google Scholar" },
              { href: orcidUrl, icon: BookOpen, label: "ORCID" },
              { href: researchgateUrl, icon: RGIcon, label: "ResearchGate" },
              { href: `mailto:${email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={label}
                className="glass h-10 w-10 grid place-items-center rounded-full hover:shadow-glow transition-all hover:-translate-y-0.5"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[var(--azure)]/40 via-[var(--cyan)]/30 to-transparent blur-2xl" />
          <div className="relative glass rounded-[2rem] p-3 shadow-glass">
            <div className="relative overflow-hidden rounded-[1.6rem] aspect-[4/5]">
              <img
                src={portraitUrl}
                alt={portraitAlt}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-3 text-xs">
                <p className="font-display text-base">Aftab Mollah</p>
                <p className="text-muted-foreground">PhD Candidate · Kent State University</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-2 text-xs shadow-glow">
            <span className="text-muted-foreground">Currently researching · </span>
            <span className="font-medium">RNA–Protein Interactions</span>
          </div>
        </motion.div>
      </div>

      {/* Highlights strip */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { n: "2", l: "Peer-reviewed articles" },
            { n: "4", l: "Conference presentations" },
            { n: "15+", l: "Experimental techniques" },
            { n: "5+", l: "Awards & scholarships" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-5"
            >
              <p className="font-display text-4xl text-gradient">{s.n}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-4 pb-8">
        {[
          {
            to: "#research",
            title: "Research",
            desc: "m6A readers, RNA-protein recognition, biophysical characterization.",
          },
          {
            to: "#expertise",
            title: "Expertise",
            desc: "ITC, fluorescence, confocal microscopy, cloning and beyond.",
          },
          {
            to: "#story",
            title: "Story",
            desc: "From West Bengal to IIT Patna to Kent State — a curiosity-led path.",
          },
        ].map((c, i) => (
          <motion.a
            key={c.to}
            href={c.to}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group block glass rounded-2xl p-6 h-full hover:shadow-glow transition-all hover:-translate-y-1"
          >
            <p className="font-display text-2xl">{c.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--azure)]">
              Explore{" "}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
