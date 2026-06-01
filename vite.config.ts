// @lovable.dev/vite-tanstack-config bundles tanstackStart, viteReact, tailwindcss,
// tsConfigPaths, nitro (build-only), and sandbox detection. Do NOT add those plugins
// manually or the app will break with duplicates.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// When building on Vercel (`VERCEL=1` is injected automatically), switch the
// nitro preset to `vercel` so the build emits `.vercel/output/` for one-click
// deploys. Locally / in the Lovable sandbox the default preset is used.
const isVercel = !!process.env.VERCEL;

export default defineConfig({
  tanstackStart: {
    // SSR entry wrapper lives at src/server.ts
    server: { entry: "server" },
  },
  ...(isVercel ? { nitro: { preset: "vercel" } } : {}),
});
