import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, GraduationCap, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Aftab Mollah</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            PhD candidate decoding the hidden language between RNA and proteins — at the
            intersection of biophysics, molecular biology, and biomolecular recognition.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link to="/research" className="text-muted-foreground hover:text-foreground">Research</Link>
          <Link to="/expertise" className="text-muted-foreground hover:text-foreground">Expertise</Link>
          <Link to="/publications" className="text-muted-foreground hover:text-foreground">Publications</Link>
          <Link to="/story" className="text-muted-foreground hover:text-foreground">Story</Link>
          <Link to="/experience" className="text-muted-foreground hover:text-foreground">Experience</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
        </div>
        <div className="flex md:justify-end items-start gap-3">
          <a href="https://www.linkedin.com/in/aftabmollah/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
             className="glass rounded-full h-10 w-10 grid place-items-center hover:shadow-glow transition-all">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="https://scholar.google.com/citations?user=" target="_blank" rel="noreferrer" aria-label="Google Scholar"
             className="glass rounded-full h-10 w-10 grid place-items-center hover:shadow-glow transition-all">
            <GraduationCap className="h-4 w-4" />
          </a>
          <a href="https://orcid.org/" target="_blank" rel="noreferrer" aria-label="ORCID"
             className="glass rounded-full h-10 w-10 grid place-items-center hover:shadow-glow transition-all">
            <BookOpen className="h-4 w-4" />
          </a>
          <a href="mailto:amollah1@kent.edu" aria-label="Email"
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
