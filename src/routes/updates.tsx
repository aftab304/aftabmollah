import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { updates, updateImages } from "@/content/site";
import { SectionHeader } from "@/components/SectionHeader";
import { useVariantOnView } from "@/hooks/useVariantOnView";

const sizeMap: Record<string, string> = {
  sm: "md:col-span-3 md:row-span-1",
  md: "md:col-span-4 md:row-span-1",
  lg: "md:col-span-6 md:row-span-1",
};

export function UpdatesSection() {
  const ref = useVariantOnView<HTMLElement>("updates");
  const [expanded, setExpanded] = useState(false);

  const toggleUpdates = () => {
    if (expanded) {
      setExpanded(false);
      requestAnimationFrame(() => {
        document.getElementById("updates-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    setExpanded(true);
  };

  return (
    <section id="updates" ref={ref} className="mx-auto max-w-7xl px-6 pt-8 pb-20 scroll-mt-24">
      <div id="updates-heading" className="scroll-mt-28">
        <SectionHeader
          eyebrow="Notice Board"
          title={<>Recent <span className="text-gradient italic">updates</span>.</>}
          description="A scientific newsroom: awards, papers, talks, and the people I'm proud to mentor."
        />
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-fr">
        <AnimatePresence initial={false}>
        {updates.map((u, i) => {
          if (i >= 3 && !expanded) return null;
          const size = sizeMap[u.size ?? "md"];
          const img = updateImages[u.id];
          return (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: expanded ? Math.max(0, i - 3) * 0.025 : 0 }}
              className={`${size} group text-left glass rounded-2xl overflow-hidden relative flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-glow`}
            >
              <div className="relative h-[180px] w-full overflow-hidden">
                {img ? (
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-60 transition-opacity duration-300 ease-out group-hover:opacity-100"
                  />
                ) : null}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent pointer-events-none transition-opacity duration-300 ease-out group-hover:opacity-0" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs z-10">
                  <span className="rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider text-foreground/80">
                    {u.tag}
                  </span>
                  <span className="font-display text-[var(--azure)] bg-background/80 backdrop-blur rounded-full px-2.5 py-0.5">{u.year}</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="font-display text-lg md:text-xl leading-snug">{u.title}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                  {u.body}
                </p>
              </div>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={toggleUpdates}
          aria-expanded={expanded}
          className="inline-flex items-center justify-center rounded-full border border-teal-500 px-5 py-2.5 text-sm font-medium text-teal-600 transition-all duration-300 hover:bg-teal-500/10 hover:shadow-glow dark:text-teal-300"
        >
          {expanded ? "Show less ↑" : "Show all updates →"}
        </button>
      </div>
    </section>
  );
}
