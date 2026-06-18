// 3D molecular canvas removed in favor of a clean CSS gradient background.
// This stub preserves the export surface so any lingering imports keep compiling.
type Variant =
  | "hero"
  | "updates"
  | "expertise"
  | "story"
  | "research"
  | "experience"
  | "publications"
  | "contact";

export function MolecularCanvas({ className = "" }: { variant?: Variant; className?: string }) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      aria-hidden
      style={{
        background:
          "radial-gradient(ellipse at 25% 20%, color-mix(in oklab, var(--azure) 35%, transparent), transparent 60%), radial-gradient(ellipse at 75% 75%, color-mix(in oklab, var(--cyan) 30%, transparent), transparent 60%)",
      }}
    />
  );
}

export default MolecularCanvas;
