import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { updates } from "@/content/site";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title: "Recent Updates — Aftab Mollah" },
      { name: "description", content: "Recent awards, publications, talks, and mentorship highlights." },
      { property: "og:title", content: "Recent Updates — Aftab Mollah" },
      { property: "og:description", content: "A scientific notice board of recent highlights." },
      { property: "og:url", content: "/updates" },
    ],
    links: [{ rel: "canonical", href: "/updates" }],
  }),
  component: UpdatesPage,
});

const sizeMap: Record<string, string> = {
  sm: "md:col-span-3 md:row-span-1",
  md: "md:col-span-4 md:row-span-1",
  lg: "md:col-span-6 md:row-span-1",
};

function UpdatesPage() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="mx-auto max-w-7xl px-6 pt-8 pb-20">
      <SectionHeader
        eyebrow="Notice Board"
        title={<>Recent <span className="text-gradient italic">updates</span>.</>}
        description="A scientific newsroom — awards, papers, talks, and the people I'm proud to mentor."
      />

      <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-fr">
        {updates.map((u, i) => {
          const size = sizeMap[u.size ?? "md"];
          const isOpen = open === u.id;
          return (
            <motion.button
              key={u.id}
              layout
              onClick={() => setOpen(isOpen ? null : u.id)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className={`${size} text-left glass rounded-2xl p-5 relative overflow-hidden hover:shadow-glow transition-all min-h-[170px]`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--azure)]/50 to-transparent" />
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-[var(--accent)]/60 px-2.5 py-1 text-[10px] uppercase tracking-wider text-foreground/80">
                  {u.tag}
                </span>
                <span className="font-display text-[var(--azure)]">{u.year}</span>
              </div>
              <p className="mt-4 font-display text-xl md:text-2xl leading-snug">{u.title}</p>
              <motion.p
                initial={false}
                animate={{ height: isOpen ? "auto" : "auto", opacity: 1 }}
                className={`mt-3 text-sm text-muted-foreground leading-relaxed ${isOpen ? "" : "line-clamp-3"}`}
              >
                {u.body}
              </motion.p>
              <div className="absolute bottom-3 right-4 text-[10px] uppercase tracking-wider text-muted-foreground">
                {isOpen ? "Click to collapse" : "Click to expand"}
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
