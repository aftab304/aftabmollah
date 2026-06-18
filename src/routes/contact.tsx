import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Mail, Linkedin, GraduationCap, BookOpen, Send, Check, AlertCircle } from "lucide-react";
import { email, linkedinUrl, scholarUrl, orcidUrl, researchgateUrl } from "@/content/site";
import { useVariantOnView } from "@/hooks/useVariantOnView";

const FORMSPREE_URL = "https://formspree.io/f/mvznrgeq";

export function ContactSection() {
  const ref = useVariantOnView<HTMLElement>("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="mx-auto max-w-6xl px-6 pt-8 pb-20 scroll-mt-24">
      <SectionHeader
        eyebrow="Contact"
        title={
          <>
            Let's <span className="text-gradient italic">collaborate</span>.
          </>
        }
        description="Postdoctoral positions, industry roles, scientific collaborations, mentorship, talks — happy to hear from you."
      />

      <div className="mt-14 grid lg:grid-cols-[1.1fr_1fr] gap-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-7 md:p-9"
        >
          <p className="font-display text-2xl">Send a message</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Submissions are emailed directly — no app required.
          </p>

          {status === "sent" ? (
            <div className="mt-8 rounded-2xl border border-teal-500/30 bg-teal-500/10 p-6 text-center">
              <Check className="mx-auto h-8 w-8 text-teal-500" />
              <p className="mt-3 font-display text-xl">Message sent! I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <label className="grid gap-1.5">
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Name
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus:border-[var(--azure)]"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus:border-[var(--azure)]"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Subject
                </span>
                <input
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus:border-[var(--azure)]"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus:border-[var(--azure)] resize-none"
                />
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium shadow-glow disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
              {status === "error" && (
                <div className="mt-2 flex items-start gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    Something went wrong. Please email me directly at{" "}
                    <a className="underline" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </span>
                </div>
              )}
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="grid gap-4 content-start"
        >
          <a
            href={`mailto:${email}`}
            className="glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-glow transition-all"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--azure)]/30 to-[var(--cyan)]/30 grid place-items-center">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</p>
              <p className="font-medium">{email}</p>
            </div>
          </a>
          {[
            {
              href: linkedinUrl,
              icon: Linkedin,
              label: "LinkedIn",
              value: "linkedin.com/in/aftabmollah",
            },
            {
              href: scholarUrl,
              icon: GraduationCap,
              label: "Google Scholar",
              value: "scholar.google.com",
            },
            {
              href: researchgateUrl,
              icon: BookOpen,
              label: "ResearchGate",
              value: "researchgate.net",
            },
            {
              href: orcidUrl,
              icon: BookOpen,
              label: "ORCID",
              value: "orcid.org/0009-0006-8601-5984",
            },
          ].map((it) => {
            const Icon = it.icon;
            return (
              <a
                key={it.label}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-glow transition-all"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--azure)]/30 to-[var(--cyan)]/30 grid place-items-center">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {it.label}
                  </p>
                  <p className="font-medium">{it.value}</p>
                </div>
              </a>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 glass rounded-3xl p-10 text-center relative overflow-hidden"
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-[36rem] rounded-full bg-gradient-to-br from-[var(--azure)]/30 to-[var(--cyan)]/30 blur-3xl pointer-events-none" />
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Scientific vision
        </p>
        <p className="mt-4 font-display text-3xl md:text-5xl italic leading-snug text-balance max-w-3xl mx-auto">
          "Driven by curiosity, guided by molecular interactions, and inspired by the endless
          complexity of life."
        </p>
      </motion.div>
    </section>
  );
}
