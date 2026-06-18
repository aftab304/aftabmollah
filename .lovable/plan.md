## Plan: Restructure home into single-scroll + content polish

### 1. Single-page scroll home

Convert `/` into a long scrolling page that stitches every section in this order:
Hero → Updates → Expertise → Story → Research → Experience → Publications → Contact.

- Refactor each existing route component (`updates.tsx`, `expertise.tsx`, `story.tsx`, `research.tsx`, `experience.tsx`, `publications.tsx`, `contact.tsx`) so its body is exported as a reusable `<UpdatesSection />`, `<ExpertiseSection />`, etc. The route files keep working (still render the same section) for deep links / SEO, but `index.tsx` imports and stacks all of them.
- Wrap each section on the home page in a `<section id="updates|expertise|…">` with generous vertical padding so scroll lands cleanly.
- Update top nav links to use in-page anchors on `/` (smooth scroll) and fall back to route links on sub-pages.
- Drive the `MolecularCanvas` variant from scroll position on `/` using IntersectionObserver — as each section enters the viewport, swap the background variant (hero → updates → expertise …) so the 3D scene shifts as the user scrolls.
- Keep per-section `head()` metadata on the standalone routes for SEO; home keeps its own combined meta.

### 2. Placeholder images for Updates

- Add a square `image` field to every update item in `src/content/site.ts` (achievements, mentee, LinkedIn).
- Generate ~10 lightweight branded placeholder images (gradient tiles with subtle molecular motif + small label) into `src/assets/updates/` — each update gets one. Reuses biotech palette so the bento grid looks intentional. User can swap files later by overwriting the same filenames.
- Update bento cards in `UpdatesSection` to render the image as the card's visual top.

### 3. Animated images for Cell Culture and Nanotechnology

- Add two new canvas-based animations to `TechniqueAnims.tsx`:
  - `CellCultureAnim` — dividing/clustering animated cells in a culture dish (radial gradients, mitosis pulses, drifting media particles).
  - `NanotechAnim` — animated nano-lattice / nanoparticle assembly (hex grid with traveling electrons + glowing nano-spheres docking onto a surface).
- Wire both into the Expertise "hero techniques" list in `expertise.tsx` (promote to animated cards; bumping animated count from 6 → 8). Adjust the static-cards list to remove duplicates.

### 4. Graphical-abstract placeholders on Research

- In `research.tsx`, each research entry currently has only text + (some) molecule preview. Add a square placeholder slot on the LEFT of every research card:
  - Render a `<div class="aspect-square glass">` with a faint gradient + "Graphical abstract" caption + an `<img>` pointing to `src/assets/research/abstract-{slug}.png` that 404s gracefully (hidden onError) until user drops a file.
- Layout becomes a 2-col grid on md+: `[square abstract] [text + molecule preview]`. Mobile stacks.
- Generate 3–4 neutral square placeholders so the UI is not visually empty before the user supplies real abstracts.

### 5. Story chapters cleanup

- In `story.tsx`, remove the central blue dot/marker on the timeline (the `<div className="…rounded-full bg-azure">` between chapters).
- Replace each chapter's empty side with a square placeholder image slot styled like the research abstracts (glass frame + caption + graceful onError). Alternate left/right to preserve the zig-zag rhythm.
- Generate 4–6 thematic placeholder images for the chapters (West Bengal → IIT Patna → Kent State → research life).

### Technical details

- New asset folders: `src/assets/updates/`, `src/assets/research/`, `src/assets/story/`. All generated via `imagegen--generate_image` at low cost (fast tier, 768×768 jpg) with subtle biotech-palette gradients and abstract iconography — clearly placeholder, not pretending to be real data.
- Section components live in `src/components/sections/` (one file per section). Existing route files become 3-line wrappers: import + render section inside `PageShell`.
- Scroll-driven variant: `useEffect` + `IntersectionObserver` on each section, updates a `useState<Variant>` passed to `MolecularCanvas` via context or prop on the home page. No impact on sub-routes (they keep their fixed variant).
- Nav: detect `pathname === "/"` → render anchor `<a href="#updates">`; else `<Link to="/updates">`. Smooth scroll via `scroll-behavior: smooth` on `html` (already fine for sub-anchors).
- Out of scope: real graphical abstracts, real update photos, real chapter photos (user supplies); changing route URLs; removing sub-route pages.
