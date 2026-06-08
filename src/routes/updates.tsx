import { motion } from "framer-motion";
import { useState } from "react";
import { updates, updateImages, updatePlaceholders } from "@/content/site";
import { SectionHeader } from "@/components/SectionHeader";
import { useVariantOnView } from "@/hooks/useVariantOnView";

const sizeMap: Record<string, string> = {
  sm: "md:col-span-3 md:row-span-1",
  md: "md:col-span-4 md:row-span-1",
  lg: "md:col-span-6 md:row-span-1",
};


export function UpdatesSection() {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useVariantOnView<HTMLElement>("updates");
  return (
    <section id="updates" ref={ref} className="mx-auto max-w-7xl px-6 pt-8 pb-20 scroll-mt-24">
      <SectionHeader
        eyebrow="Notice Board"
        title={<>Recent <span className="text-gradient italic">updates</span>.</>}
        description="A scientific newsroom — awards, papers, talks, and the people I'm proud to mentor."
      />

      <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-fr">
        {updates.map((u, i) => {
          const size = sizeMap[u.size ?? "md"];
          const isOpen = open === u.id;
          const img = updateImages[u.id];
          const placeholder = updatePlaceholders[u.id];
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
              className={`${size} text-left glass rounded-2xl overflow-hidden relative hover:shadow-glow transition-all min-h-[300px] flex flex-col`}
            >
              <div className="relative h-32 w-full overflow-hidden">
                {img ? (
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-muted/40 px-4 text-center text-xs text-muted-foreground">
                    {placeholder ?? "📷 Photo coming soon"}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider text-foreground/80">
                    {u.tag}
                  </span>
                  <span className="font-display text-[var(--azure)] bg-background/80 backdrop-blur rounded-full px-2.5 py-0.5">{u.year}</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="font-display text-lg md:text-xl leading-snug">{u.title}</p>
                <motion.p
                  initial={false}
                  className={`mt-3 text-sm text-muted-foreground leading-relaxed flex-1 ${isOpen ? "" : "line-clamp-3"}`}
                >
                  {u.body}
                </motion.p>
                <div className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {isOpen ? "Click to collapse" : "Click to expand"}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

function UpdatesPage() {
  return <UpdatesSection />;
}
