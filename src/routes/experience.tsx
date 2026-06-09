import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Microscope, GraduationCap, Users, Sparkles, Mic, Award } from "lucide-react";
import { useVariantOnView } from "@/hooks/useVariantOnView";

const items = [
  {
    icon: Microscope, kind: "Research",
    title: "Doctoral Researcher — Kent State University",
    when: "2022 — Present",
    body: "Investigating RNA–protein interactions and m6A reader proteins using biophysics and molecular biology.",
  },
  {
    icon: GraduationCap, kind: "Teaching",
    title: "Graduate Teaching Assistant — Department of Chemistry & Biochemistry",
    when: "2022 — Present · Kent State University",
    body: "Led general and organic chemistry laboratories; designed problem sets and one-on-one tutoring sessions.",
  },
  {
    icon: Users, kind: "Mentorship",
    title: "Undergraduate Research Mentor",
    when: "2023 — Present · Kent State University",
    body: "Mentored undergraduates whose work has won the Ohio Academy of Science and ACS Honors Week poster awards.",
  },
  {
    icon: Sparkles, kind: "Outreach",
    title: "STEM Outreach & Sci-Pals",
    when: "2023 — Present · Northeastern Ohio",
    body: "Communicating molecular biology to K-12 students and the public — making the invisible feel real.",
  },
  {
    icon: Mic, kind: "Service",
    title: "Judge — Annual Undergraduate Research Symposium",
    when: "2025 · Kent State University",
    body: "Evaluated undergraduate research presentations across chemistry, biology, and physics tracks.",
  },
  {
    icon: Award, kind: "Conferences",
    title: "Biophysical Society Annual Meetings · Rustbelt RNA · MSNO",
    when: "2024 — Present · Philadelphia, Los Angeles, Ohio",
    body: "Poster and talk presentations across national and regional venues from 2024 onward.",
  },
  {
    icon: Microscope, kind: "Research",
    title: "Master's Researcher — IIT Patna",
    when: "2020 — 2022 · Indian Institute of Technology Patna",
    body: "Awarded Best Master's Project by the Department of Chemistry for thesis work in physical chemistry.",
  },
];

export function ExperienceSection() {
  const ref = useVariantOnView<HTMLElement>("experience");
  return (
    <section id="experience" ref={ref} className="mx-auto max-w-5xl px-6 pt-8 pb-20 scroll-mt-24">
      <SectionHeader
        eyebrow="Experience"
        title={<>Research, teaching & <span className="text-gradient italic">leadership</span>.</>}
        description="A timeline of the people, classrooms, conferences, and outreach efforts that shape how I do science."
      />

      <div className="relative mt-16">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--azure)]/40 to-transparent md:-translate-x-1/2" />
        <div className="space-y-10">
          {items.map((it, i) => {
            const Icon = it.icon;
            const right = i % 2 === 1;
            return (
              <motion.div
                key={it.title + i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={`relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-10`}
              >
                <div className={`absolute left-4 md:left-1/2 top-3 md:-translate-x-1/2 h-5 w-5 rounded-full bg-[var(--azure)] ring-4 ring-background shadow-glow grid place-items-center`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-background" />
                </div>
                <div className={`${right ? "md:col-start-2 md:pl-10" : "md:pr-10 md:text-right"}`}>
                  <div className={`inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground`}>
                    <Icon className="h-3 w-3 text-[var(--azure)]" /> {it.kind}
                  </div>
                  <p className="mt-3 font-display text-xl md:text-2xl leading-snug">{it.title}</p>
                  <p className="mt-1 text-xs text-[var(--azure)]">{it.when}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

