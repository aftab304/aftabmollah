import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "My Story — Aftab Mollah" },
      { name: "description", content: "From West Bengal to IIT Patna to Kent State — a curiosity-led journey through chemistry, biophysics, and RNA biology." },
      { property: "og:title", content: "My Story — Aftab Mollah" },
      { property: "og:description", content: "A cinematic journey from West Bengal to Kent State." },
      { property: "og:url", content: "/story" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/story" }],
  }),
  component: StoryPage,
});

const chapters = [
  {
    tag: "Origin",
    year: "West Bengal",
    title: "A child who took things apart.",
    body:
      "I grew up in West Bengal, India, the kind of place where small questions about the natural world quickly turn into big curiosities. Chemistry was the language that first made the invisible feel real to me.",
    quote: "Why does anything become anything else?",
  },
  {
    tag: "Foundation",
    year: "IIT Patna",
    title: "Earning the rigor.",
    body:
      "I pursued my Master's in Chemistry at the Indian Institute of Technology Patna, where rigorous training in physical and analytical chemistry shaped how I think about molecules and measurements. The Best Master's Project award here was less about a prize and more about realizing research could be a calling.",
    quote: "Precision is a form of respect for nature.",
  },
  {
    tag: "Leap",
    year: "Across the ocean",
    title: "Moving to the United States.",
    body:
      "I left for the United States alone, carrying two suitcases and a fully funded PhD position at Kent State University. The first months were equal parts intimidation and exhilaration — a new country, a new lab, and a new way of working.",
    quote: "Curiosity is portable. Ambition is not optional.",
  },
  {
    tag: "Research",
    year: "Kent State University",
    title: "Falling for RNA and proteins.",
    body:
      "My doctoral work centers on RNA–protein interactions and m6A reader proteins — the molecules that decide which messages in our cells get read, and how. Biophysics gave me a way to ask thermodynamic questions about biology and actually answer them.",
    quote: "Every binding event is a tiny sentence in the language of life.",
  },
  {
    tag: "Mentorship",
    year: "Today",
    title: "Teaching the next generation.",
    body:
      "Mentoring undergraduates and participating in STEM outreach reshaped what success looks like for me. Some of my proudest moments have been watching mentees win their own awards at the Ohio Academy of Science and the ACS Honors Week.",
    quote: "Science multiplies when it's shared.",
  },
  {
    tag: "Vision",
    year: "What's next",
    title: "The road from molecules to medicine.",
    body:
      "I want to keep working at the interface of biophysics and biomedicine — where mechanistic insight into RNA–protein recognition becomes leverage for new diagnostics, modulators, and therapies. Academic or industry, the question is the same: how do we read the molecular language well enough to rewrite it for human good?",
    quote: "Driven by curiosity, guided by molecular interactions.",
  },
];

function StoryPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-8 pb-20">
      <SectionHeader
        eyebrow="My Story"
        title={<>A journey through <span className="text-gradient italic">molecules</span>.</>}
        description="Six chapters — from a curious child in West Bengal to a biophysicist asking thermodynamic questions about life."
      />

      <div className="relative mt-20">
        {/* center line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--azure)]/40 to-transparent -translate-x-1/2" />

        <div className="space-y-20 md:space-y-32">
          {chapters.map((c, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7 }}
                className={`relative grid md:grid-cols-2 gap-8 items-center ${left ? "" : "md:[&>*:first-child]:order-2"}`}
              >
                <div className={`${left ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <div className={`inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--azure)]" /> {c.tag} · {c.year}
                  </div>
                  <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight text-balance">{c.title}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
                <div className={`relative ${left ? "md:pl-12" : "md:pr-12"}`}>
                  <div className="absolute hidden md:block top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
                    <div className="h-4 w-4 rounded-full bg-[var(--azure)] shadow-glow ring-4 ring-background/80" />
                  </div>
                  <div className="glass rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-[var(--azure)]/40 to-[var(--cyan)]/30 blur-2xl" />
                    <p className="font-display text-3xl md:text-4xl italic leading-snug text-balance">
                      "{c.quote}"
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">Chapter {i + 1}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
