import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/lib/theme";
import { VariantProvider } from "@/lib/variant";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/routes/index";
import { UpdatesSection } from "@/routes/updates";
import { ExpertiseSection } from "@/routes/expertise";
import { StorySection } from "@/routes/story";
import { ResearchSection } from "@/routes/research";
import { ExperienceSection } from "@/routes/experience";
import { PublicationsSection } from "@/routes/publications";
import { ContactSection } from "@/routes/contact";
import { AudienceSection } from "@/components/AudienceSection";

function GradientBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden
      style={{
        background:
          "radial-gradient(ellipse at 20% 15%, color-mix(in oklab, var(--azure) 28%, transparent), transparent 60%), radial-gradient(ellipse at 80% 80%, color-mix(in oklab, var(--cyan) 24%, transparent), transparent 60%)",
      }}
    />
  );
}

export function App() {
  return (
    <ThemeProvider>
      <VariantProvider>
        <div className="relative min-h-screen bg-hero">
          <GradientBackground />
          <Nav />
          <main>
            <HeroSection />
            <AudienceSection />
            <UpdatesSection />
            <ExpertiseSection />
            <StorySection />
            <ResearchSection />
            <ExperienceSection />
            <PublicationsSection />
            <ContactSection />
          </main>
          <Footer />
          <Analytics />
        </div>
      </VariantProvider>
    </ThemeProvider>
  );
}
