# Aftab Mollah — Portfolio

Premium scientist portfolio built on **TanStack Start** (React 19 + Vite 7), Tailwind v4, Three.js (react-three-fiber) molecular visualizations, and Framer Motion. SSR-ready and deployable to **Vercel** out of the box.

## Tech stack

- TanStack Start (file-based routing, SSR, server functions)
- React 19, TypeScript (strict)
- Tailwind CSS v4 (`src/styles.css`)
- shadcn/ui + Radix primitives
- Three.js / @react-three/fiber / @react-three/postprocessing
- Framer Motion
- Nitro (build adapter; Cloudflare for local sandbox, Vercel for prod)

## Local development

```bash
npm install
npm run dev          # http://localhost:8080
npm run build        # production build (default preset)
npm run preview      # preview built app
```

## Deploy to Vercel (one-click)

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Vercel → **Add New Project** → import the repo.
3. Vercel auto-detects the Build Output API at `.vercel/output/` — no manual settings required.
4. (Optional) set a custom domain.

`vite.config.ts` switches Nitro to the `vercel` preset automatically when the `VERCEL=1` environment variable is present (Vercel injects this during builds). Local builds keep the default preset, so nothing changes for sandbox / preview.

Files involved:

- `vercel.json` — pins build/install commands (no rewrites needed; SSR is handled by the generated function).
- `vite.config.ts` — emits `.vercel/output/static` + `.vercel/output/functions/__nitro.func` on Vercel.

### Manual deploy via CLI

```bash
npm i -g vercel
vercel link
vercel --prod
```

## Project structure

```
src/
  routes/             file-based routes (TanStack)
    __root.tsx        app shell, head metadata, providers
    index.tsx         home (composes all sections)
    updates|expertise|story|research|experience|publications|contact.tsx
    sitemap[.]xml.ts  generated /sitemap.xml
  components/         UI + Three.js scenes (MolecularCanvas, TechniqueAnims)
  content/site.ts     portrait, social URLs, email
  lib/                theme, variant context, utils
  hooks/              useVariantOnView (scroll-driven background switch)
  styles.css          design tokens + Tailwind v4 setup
public/
  robots.txt          crawler rules
```

## SEO

- Per-route `head()` metadata (title, description, og:*) in every route file.
- JSON-LD `Person` schema in `__root.tsx`.
- `public/robots.txt` allows all crawlers and references the sitemap.
- `/sitemap.xml` served by a TanStack server route, lists every public route.

Update `BASE_URL` in `src/routes/sitemap[.]xml.ts` and the `Sitemap:` line in `public/robots.txt` if you change the production domain.

## Performance notes

- Three.js scenes downgrade to a static gradient on mobile (<640px) and when `prefers-reduced-motion: reduce` is set (see `MolecularCanvas.tsx`).
- DPR clamped to `[1, 1.5]`, antialias on, bloom postprocessing scoped to one effect composer.
- Route components are code-split by the TanStack Router plugin (see `dist/client/_ssr/*` chunks).
- Fonts (`@fontsource/instrument-serif`, `@fontsource/inter-tight`) are self-hosted and tree-shaken per weight.

## Accessibility

- Single `<main>` rendered from `__root.tsx` via `<Outlet />`.
- Icon-only buttons use `aria-label`.
- All animated backgrounds are `aria-hidden` and respect `prefers-reduced-motion`.

## Scripts

| Command           | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Vite dev server (HMR + SSR)              |
| `npm run build`   | Production build                         |
| `npm run preview` | Serve the built app locally              |
| `npm run lint`    | ESLint                                   |
| `npm run format`  | Prettier write                           |

## Post-deployment checklist

1. Confirm `/sitemap.xml` and `/robots.txt` are reachable.
2. Submit the sitemap to Google Search Console.
3. Verify the Three.js scenes render on desktop (mobile/reduced-motion show the gradient fallback by design).
4. Replace the placeholder images under `src/assets/updates/`, `src/assets/story/`, `src/assets/research/` with final graphics.
5. Update the canonical/og URLs in `src/routes/__root.tsx` and the sitemap base URL if you switch domains.
