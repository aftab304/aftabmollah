import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Mail, Linkedin, GraduationCap, BookOpen, Send, Check } from "lucide-react";
import { email, linkedinUrl, scholarUrl, orcidUrl, researchgateUrl } from "@/content/site";
import { useVariantOnView } from "@/hooks/useVariantOnView";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Scientific Vision — Aftab Mollah" },
      { name: "description", content: "Get in touch about RNA-protein interactions, collaborations, and postdoctoral or industry opportunities." },
      { property: "og:title", content: "Contact — Aftab Mollah" },
      { property: "og:description", content: "Collaboration, postdoc, and industry inquiries welcome." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

export function ContactSection() {
  const ref = useVariantOnView<HTMLElement>("contact");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", from: "", message: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry — ${form.name || "anonymous"}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.from}>`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" ref={ref} className="mx-auto max-w-6xl px-6 pt-8 pb-20 scroll-mt-24">
      <SectionHeader
        eyebrow="Contact"
        title={<>Let's <span className="text-gradient italic">collaborate</span>.</>}
        description="Postdoctoral positions, industry roles, scientific collaborations, mentorship, talks — happy to hear from you."
      />

      <div className="mt-14 grid lg:grid-cols-[1.1fr_1fr] gap-8">
        <motion.form
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={onSubmit}
          className="glass rounded-3xl p-7 md:p-9"
        >
          <p className="font-display text-2xl">Send a message</p>
          <p className="mt-1 text-sm text-muted-foreground">Opens your email client — your message is yours to send.</p>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Your name</span>
              <input
                required value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus:border-[var(--azure)]"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Your email</span>
              <input
                required type="email" value={form.from}
                onChange={e => setForm({ ...form, from: e.target.value })}
                className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus:border-[var(--azure)]"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Message</span>
              <textarea
                required rows={5} value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus:border-[var(--azure)] resize-none"
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium shadow-glow"
            >
              {sent ? <><Check className="h-4 w-4" /> Sent to your mail client</> : <><Send className="h-4 w-4" /> Open in mail</>}
            </button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="grid gap-4 content-start"
        >
          <a href={`mailto:${email}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-glow transition-all">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--azure)]/30 to-[var(--cyan)]/30 grid place-items-center">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</p>
              <p className="font-medium">{email}</p>
            </div>
          </a>
          {[
            { href: linkedinUrl, icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/aftabmollah" },
            { href: scholarUrl, icon: GraduationCap, label: "Google Scholar", value: "scholar.google.com" },
            { href: researchgateUrl, icon: BookOpen, label: "ResearchGate", value: "researchgate.net" },
            { href: orcidUrl, icon: BookOpen, label: "ORCID", value: "orcid.org" },
          ].map(it => {
            const Icon = it.icon;
            return (
              <a key={it.label} href={it.href} target="_blank" rel="noreferrer"
                 className="glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-glow transition-all">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--azure)]/30 to-[var(--cyan)]/30 grid place-items-center">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{it.label}</p>
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
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Scientific vision</p>
        <p className="mt-4 font-display text-3xl md:text-5xl italic leading-snug text-balance max-w-3xl mx-auto">
          "Driven by curiosity, guided by molecular interactions, and inspired by the endless complexity of life."
        </p>
      </motion.div>
    </section>
  );
}
