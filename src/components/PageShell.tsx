import type { ReactNode } from "react";

export function PageShell({ children }: { variant?: string; children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-hero">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 20% 15%, color-mix(in oklab, var(--azure) 28%, transparent), transparent 60%), radial-gradient(ellipse at 80% 80%, color-mix(in oklab, var(--cyan) 24%, transparent), transparent 60%)",
        }}
      />
      <main className="relative pt-28 pb-24">{children}</main>
    </div>
  );
}
