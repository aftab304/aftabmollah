import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useMatchRoute,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { ThemeProvider } from "@/lib/theme";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MolecularCanvas } from "@/components/MolecularCanvas";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-4">
      <div className="glass rounded-3xl p-10 text-center max-w-md">
        <p className="font-display text-7xl text-gradient">404</p>
        <h2 className="mt-3 font-display text-2xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This route doesn't exist in the lab notebook.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-4">
      <div className="glass rounded-3xl p-10 text-center max-w-md">
        <h1 className="font-display text-2xl">An experiment failed to load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border px-5 py-2 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aftab Mollah — RNA-Protein Biophysics & Molecular Biology" },
      {
        name: "description",
        content:
          "PhD candidate in Chemistry & Biochemistry decoding the hidden language between RNA and proteins. Biophysics, m6A reader proteins, ITC, fluorescence spectroscopy, confocal microscopy.",
      },
      { name: "author", content: "Aftab Mollah" },
      { property: "og:title", content: "Aftab Mollah — RNA-Protein Biophysics & Molecular Biology" },
      { property: "og:description", content: "A premium, futuristic portfolio website showcasing a scientist's expertise in RNA-protein interactions and molecular biology." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Aftab Mollah" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Aftab Mollah — RNA-Protein Biophysics & Molecular Biology" },
      { name: "description", content: "A premium, futuristic portfolio website showcasing a scientist's expertise in RNA-protein interactions and molecular biology." },
      { name: "twitter:description", content: "A premium, futuristic portfolio website showcasing a scientist's expertise in RNA-protein interactions and molecular biology." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/yRjviX93miP24npc0oNaoCGlPPh1/social-images/social-1779909819274-1759114240140.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/yRjviX93miP24npc0oNaoCGlPPh1/social-images/social-1779909819274-1759114240140.webp" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Aftab Mollah",
          jobTitle: "PhD Candidate in Chemistry & Biochemistry",
          affiliation: { "@type": "Organization", name: "Kent State University" },
          alumniOf: [
            { "@type": "Organization", name: "Indian Institute of Technology Patna" },
          ],
          knowsAbout: [
            "RNA-Protein Interactions",
            "Biophysical Chemistry",
            "Molecular Biology",
            "m6A Reader Proteins",
            "Isothermal Titration Calorimetry",
            "Fluorescence Spectroscopy",
            "Confocal Microscopy",
          ],
          sameAs: [
            "https://www.linkedin.com/in/aftabmollah/",
            "https://scholar.google.com/citations?user=V5A0-tkAAAAJ&hl=en",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function VariantBackground() {
  const matchRoute = useMatchRoute();
  const variant =
    matchRoute({ to: "/", fuzzy: false }) ? "hero" :
    matchRoute({ to: "/updates" }) ? "updates" :
    matchRoute({ to: "/expertise" }) ? "expertise" :
    matchRoute({ to: "/story" }) ? "story" :
    matchRoute({ to: "/research" }) ? "research" :
    matchRoute({ to: "/experience" }) ? "experience" :
    matchRoute({ to: "/publications" }) ? "publications" :
    matchRoute({ to: "/contact" }) ? "contact" :
    "hero";
  return (
    <div className="fixed inset-0 -z-10 opacity-70 pointer-events-none">
      <MolecularCanvas variant={variant as "hero"} className="h-full w-full" />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="relative min-h-screen bg-hero">
          <VariantBackground />
          <Nav />
          <Outlet />
          <Footer />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
