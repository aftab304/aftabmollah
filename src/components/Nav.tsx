import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { hash: "hero", label: "Home" },
  { hash: "updates", label: "Updates" },
  { hash: "expertise", label: "Expertise" },
  { hash: "research", label: "Research" },
  { hash: "story", label: "Story" },
  { hash: "experience", label: "Experience" },
  { hash: "publications", label: "Publications" },
  { hash: "contact", label: "Contact" },
] as const;

export function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`glass rounded-2xl flex items-center justify-between px-4 py-2.5 transition-all ${scrolled ? "shadow-glow" : ""}`}>
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 shrink-0 aspect-square rounded-full bg-gradient-to-br from-[var(--azure)] to-[var(--cyan)] shadow-glow">
              <div className="absolute inset-1 rounded-full bg-[var(--background)]/40 backdrop-blur" />
            </div>
            <span className="font-display text-lg leading-none">Aftab Mollah</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <a
                key={it.hash}
                href={`#${it.hash}`}
                className="relative px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="h-9 w-9 rounded-full grid place-items-center hover:bg-[var(--accent)] transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="md:hidden h-9 w-9 rounded-full grid place-items-center hover:bg-[var(--accent)] transition-colors"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-2 glass rounded-2xl p-3 grid gap-1"
            >
              {items.map((it) => (
                <a
                  key={it.hash}
                  href={`#${it.hash}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm hover:bg-[var(--accent)]"
                >
                  {it.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
