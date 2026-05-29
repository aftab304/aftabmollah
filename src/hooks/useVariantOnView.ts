import { useEffect, useRef } from "react";
import { useVariant, type SceneVariant } from "@/lib/variant";

/** Sets the scene variant when this section is the most-visible one. */
export function useVariantOnView<T extends HTMLElement>(variant: SceneVariant) {
  const ref = useRef<T | null>(null);
  const { setVariant } = useVariant();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.35) {
            setVariant(variant);
            break;
          }
        }
      },
      { threshold: [0.35, 0.6], rootMargin: "-20% 0px -20% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant, setVariant]);
  return ref;
}
