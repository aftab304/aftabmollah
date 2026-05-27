# Aftab Mollah — Scientific Portfolio

A cinematic, single-domain portfolio site built on the existing TanStack Start template. Light-blue / off-white biotech aesthetic with optional dark mode, stylized Three.js RNA-protein scenes drifting behind every section, and content seeded from your LinkedIn + Google Scholar via Firecrawl.

## Information Architecture (separate routes, SEO-friendly)

```
/                 Hero + brief highlights
/updates          Bento-grid notice board (10+ items)
/expertise        Techniques dashboard
/story            Cinematic timeline (India → IIT → Kent State)
/research         Research themes + projects
/experience       Teaching, mentorship, leadership, conferences
/publications     Searchable/filterable archive
/contact          Contact + scientific vision
```

Shared glass nav + footer in `__root.tsx`. Each route gets its own `head()` with unique title, description, og tags.

## Visual System

- **Palette** (tokens in `src/styles.css`, oklch):
  - Light: off-white `#FAFBFD`, soft silver, biotech blues (`#3B82F6` → `#06B6D4` accent gradient), deep ink text
  - Dark: deep navy `#0A1628`, glass surfaces `rgba(255,255,255,0.06)`, same blue/cyan accents glowing
- **Typography**: Instrument Serif (display) + Inter Tight (body) — elegant, scientific, not generic
- **Effects**: glassmorphism cards (`backdrop-blur`), soft shadows, gradient borders, subtle grain
- **Motion**: Framer Motion — scroll-triggered fades/parallax, magnetic buttons, restrained micro-interactions
- **Dark mode**: toggle in nav, persisted in `localStorage`, `next-themes`-style class on `<html>`

## 3D Molecular Background (stylized Three.js)

A single `<MolecularCanvas />` mounted in `__root.tsx`, fixed full-viewport behind content (z-index -1, pointer-events conditional).

- Stylized helix/ribbon protein meshes + RNA strand (instanced spheres with phosphate backbone tubes) generated procedurally — no PDB parsing
- Per-route scene variant (hero = protein + RNA duet, research = m6A reader cartoon, contact = drifting nucleotides)
- Smooth auto-rotation, mouse parallax via `useFrame`, soft bloom + fresnel glow
- Scroll progress drives camera dolly + scene morph
- Perf: `dpr={[1, 1.5]}`, `frameloop="demand"` on idle tabs, mobile fallback to static SVG gradient

Libraries: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`.

## Section Specs

### Hero (`/`)

Split layout: left = portrait (linkedin URL, rounded glass frame with animated gradient ring), right = molecular scene. Display heading "Decoding the hidden language between RNA and proteins." Subhead with role tags. CTA cluster: Download CV, Publications, Contact + icon links (LinkedIn, Google Scholar, ORCID).

### Updates (`/updates`)

Bento grid (varying card sizes) with 10+ items: all 5 personal achievements + 2 mentee achievements + 3+ LinkedIn post summaries (scraped). Hover lift, click expands to full text. Timeline ribbon along the left edge with year markers.

### Expertise (`/expertise`)

Hero techniques with custom animations (Framer Motion + small Canvas widgets):

1. ITC — animated heat-injection curve
2. Fluorescence Spectroscopy — pulsing emission spectrum
3. Confocal Microscopy — z-stack scan reveal
4. RNA-Protein Binding Assays — animated docking
5. Protein Purification — column elution animation
6. Molecular Cloning — DNA ligation loop
7. EMSA & Western Blot,- smallband moving through gel matrix animation

Remaining 7 techniques (NMR, TEM/SEM, DLS,  Cell Culture, Gel Electrophoresis, UV, IR) as refined static glass cards with a shared subtle molecular motif and short description.

### Story (`/story`)

Vertical scroll-driven timeline with alternating left/right panels, scroll-snap-ish feel using Framer scroll progress. Chapters: West Bengal roots → IIT Patna → transatlantic move → Kent State PhD → mentorship → vision. Each chapter has a quote pull-out and one decorative scientific visual.

### Research (`/research`)

Horizontal-scroll deck (desktop) / stacked cards (mobile) of research themes: RNA-protein interactions, m6A readers, biomolecular recognition, biophysical characterization, fluorescence studies. Each card has: problem → why it matters → approach → linked publications, with an inline mini 3D molecule preview.

### Experience (`/experience`)

Two-column timeline: research/teaching positions, conferences (Biophysical Society Philadelphia + LA, Rustbelt RNA, MSNO), STEM outreach, Sci-Pals. Institution wordmarks rendered as styled text (no logo image dependency).

### Publications (`/publications`)

Seeded from Google Scholar via Firecrawl. Search input + filter chips (Articles / Posters / Talks / Year). Expandable cards with abstract, DOI, venue. Empty-state messaging while data loads.

### Contact (`/contact`)

Glass contact form (name, email, message) posting to a server function that emails you (placeholder log until you wire Resend). Email, LinkedIn, Scholar, ORCID. Closing line: "Driven by curiosity, guided by molecular interactions, and inspired by the endless complexity of life." Drifting nucleotide background.

## Data Pipeline (Firecrawl)

One-time scrape during build, results cached as static JSON in `src/content/`:

- `scripts/scrape-linkedin.ts` → Firecrawl `scrape` on `https://www.linkedin.com/in/aftabmollah/` with `formats: ['markdown']`, extract 3–5 recent post snippets → `src/content/linkedin-posts.json`
- `scripts/scrape-scholar.ts` → Firecrawl `search` "Aftab Mollah Kent State" + `scrape` profile → `src/content/publications.json`

Runs as `bun run scrape` (manual). Fallback: hardcoded placeholders so the site never breaks if scraping fails. LinkedIn often blocks; if so, I'll surface what I got and you can paste the rest.

Connector: Firecrawl (will prompt you to connect during build).

## Technical Plan

- **Add deps**: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `framer-motion`, `next-themes` (or lightweight custom theme hook), `@mendable/firecrawl-js`, fonts via `@fontsource/instrument-serif` + `@fontsource/inter-tight`
- **Routes**: 8 files in `src/routes/`, each with proper `head()` meta
- **Components**: `MolecularCanvas`, `SceneVariants/*`, `GlassCard`, `Nav`, `Footer`, `ThemeToggle`, `MagneticButton`, `BentoGrid`, `TimelineChapter`, `TechniqueCard`, `PublicationsList`
- **Tokens**: extend `src/styles.css` with biotech palette + glass utility classes
- **Server**: contact form via `createServerFn` (logs for now, ready to wire Resend later)
- **Perf**: lazy-load Three scene per route via `React.lazy`, prefers-reduced-motion respected, mobile uses CSS gradient fallback
- **SEO**: per-route titles/descriptions, JSON-LD `Person` schema on `/`, sitemap-ready route structure

## Build Order

1. Tokens, fonts, theme toggle, nav/footer shell
2. Molecular canvas + 2 scene variants (proves the hardest piece early)
3. Hero + Updates + Contact (covers the main impression surfaces)
4. Expertise with 6 animated techniques
5. Story timeline
6. Research deck + Publications
7. Experience
8. Firecrawl scrape scripts + content wiring
9. Polish pass: motion timing, dark mode QA, mobile

## Out of Scope (for this first build)

- Real PDB parsing / scientifically literal structures (stylized only, as agreed)
- Live Resend wiring (placeholder server fn ready, needs your API key later)
- CMS — content lives in typed files you can edit directly

Approve and I'll start building.