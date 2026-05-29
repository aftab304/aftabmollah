import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { useVariantOnView } from "@/hooks/useVariantOnView";
import chapter1 from "@/assets/story/chapter-1.jpg";
import chapter2 from "@/assets/story/chapter-2.jpg";
import chapter3 from "@/assets/story/chapter-3.jpg";
import chapter4 from "@/assets/story/chapter-4.jpg";
import chapter5 from "@/assets/story/chapter-5.jpg";
import chapter6 from "@/assets/story/chapter-6.jpg";

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
    image: chapter1,
  },
  {
    tag: "Foundation",
    year: "IIT Patna",
    title: "Earning the rigor.",
    body:
      "I pursued my Master's in Chemistry at the Indian Institute of Technology Patna, where rigorous training in physical and analytical chemistry shaped how I think about molecules and measurements. The Best Master's Project award here was less about a prize and more about realizing research could be a calling.",
    quote: "Precision is a form of respect for nature.",
    image: chapter2,
  },
  {
    tag: "Leap",
    year: "Across the ocean",
    title: "Moving to the United States.",
    body:
      "I left for the United States alone, carrying two suitcases and a fully funded PhD position at Kent State University. The first months were equal parts intimidation and exhilaration — a new country, a new lab, and a new way of working.",
    quote: "Curiosity is portable. Ambition is not optional.",
    image: chapter3,
  },
  {
    tag: "Research",
    year: "Kent State University",
    title: "Falling for RNA and proteins.",
    body:
      "My doctoral work centers on RNA–protein interactions and m6A reader proteins — the molecules that decide which messages in our cells get read, and how. Biophysics gave me a way to ask thermodynamic questions about biology and actually answer them.",
    quote: "Every binding event is a tiny sentence in the language of life.",
    image: chapter4,
  },
  {
    tag: "Mentorship",
    year: "Today",
    title: "Teaching the next generation.",
    body:
      "Mentoring undergraduates and participating in STEM outreach reshaped what success looks like for me. Some of my proudest moments have been watching mentees win their own awards at the Ohio Academy of Science and the ACS Honors Week.",
    quote: "Science multiplies when it's shared.",
    image: chapter5,
  },
  {
    tag: "Vision",
    year: "What's next",
    title: "The road from molecules to medicine.",
    body:
      "I want to keep working at the interface of biophysics and biomedicine — where mechanistic insight into RNA–protein recognition becomes leverage for new diagnostics, modulators, and therapies. Academic or industry, the question is the same: how do we read the molecular language well enough to rewrite it for human good?",
    quote: "Driven by curiosity, guided by molecular interactions.",
    image: chapter6,
  },
];

export function StorySection() {
  const ref = useVariantOnView<HTMLElement>("story");
  return (
    <section id="story" ref={ref} className="mx-auto max-w-6xl px-6 pt-8 pb-20 scroll-mt-24">
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
                  <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--azure)]" /> {c.tag} · {c.year}
                  </div>
                  <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight text-balance">{c.title}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{c.body}</p>
                  <p className="mt-5 font-display text-lg md:text-xl italic text-foreground/80 leading-snug">
                    "{c.quote}"
                  </p>
                </div>
                <div className={`relative ${left ? "md:pl-12" : "md:pr-12"}`}>
                  <div className="glass rounded-3xl p-3 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-[var(--azure)]/40 to-[var(--cyan)]/30 blur-2xl pointer-events-none" />
                    <div className="relative aspect-square rounded-2xl overflow-hidden">
                      <img
                        src={c.image}
                        alt=""
                        loading="lazy"
                        width={768}
                        height={768}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-foreground/90">
                        <span className="bg-background/70 backdrop-blur rounded-full px-2.5 py-1">Chapter {i + 1}</span>
                        <span className="bg-background/70 backdrop-blur rounded-full px-2.5 py-1">{c.year}</span>
                      </div>
                    </div>
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

function StoryPage() {
  return <StorySection />;
}
