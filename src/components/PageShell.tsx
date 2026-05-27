import type { ReactNode } from "react";
import { MolecularCanvas } from "./MolecularCanvas";

type Variant = "hero" | "updates" | "expertise" | "story" | "research" | "experience" | "publications" | "contact";

export function PageShell({ variant, children }: { variant: Variant; children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-hero">
      <div className="fixed inset-0 -z-10 opacity-80">
        <MolecularCanvas variant={variant} className="h-full w-full" />
      </div>
      <main className="relative pt-28 pb-24">{children}</main>
    </div>
  );
}
