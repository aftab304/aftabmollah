import { createContext, useContext, useState, type ReactNode } from "react";

export type SceneVariant =
  | "hero"
  | "updates"
  | "expertise"
  | "story"
  | "research"
  | "experience"
  | "publications"
  | "contact";

type Ctx = { variant: SceneVariant | null; setVariant: (v: SceneVariant) => void };
const VariantCtx = createContext<Ctx>({ variant: null, setVariant: () => {} });

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<SceneVariant | null>(null);
  return <VariantCtx.Provider value={{ variant, setVariant }}>{children}</VariantCtx.Provider>;
}

export const useVariant = () => useContext(VariantCtx);
