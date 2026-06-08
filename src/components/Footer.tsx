import { Linkedin, Mail, GraduationCap, BookOpen } from "lucide-react";
import { linkedinUrl, scholarUrl, orcidUrl, email } from "@/content/site";

export function Footer() {
  const links: { hash: string; label: string }[] = [
    { hash: "research", label: "Research" },
    { hash: "expertise", label: "Expertise" },
    { hash: "publications", label: "Publications" },
    { hash: "story", label: "Story" },
    { hash: "experience", label: "Experience" },
    { hash: "contact", label: "Contact" },
  ];
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Aftab Mollah</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            PhD candidate decoding the hidden language between RNA and proteins — at the
            intersection of biophysics, molecular biology, and biomolecular recognition.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            <a href={scholarUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">scholar.google.com</a>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {links.map((l) => (
            <a key={l.hash} href={`#${l.hash}`} className="text-muted-foreground hover:text-foreground">{l.label}</a>
          ))}
        </div>
        <div className="flex md:justify-end items-start gap-3">
          <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn"
             className="glass rounded-full h-10 w-10 grid place-items-center hover:shadow-glow transition-all">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={scholarUrl} target="_blank" rel="noreferrer" aria-label="Google Scholar"
             className="glass rounded-full h-10 w-10 grid place-items-center hover:shadow-glow transition-all">
            <GraduationCap className="h-4 w-4" />
          </a>
          <a href={orcidUrl} target="_blank" rel="noreferrer" aria-label="ORCID"
             className="glass rounded-full h-10 w-10 grid place-items-center hover:shadow-glow transition-all">
            <BookOpen className="h-4 w-4" />
          </a>
          <a href={`mailto:${email}`} aria-label="Email"
             className="glass rounded-full h-10 w-10 grid place-items-center hover:shadow-glow transition-all">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/40 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aftab Mollah · Crafted with curiosity.
      </div>
    </footer>
  );
}
