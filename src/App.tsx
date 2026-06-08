import { ThemeProvider } from "@/lib/theme";
import { VariantProvider, useVariant, type SceneVariant } from "@/lib/variant";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MolecularCanvas } from "@/components/MolecularCanvas";
import { HeroSection } from "@/routes/index";
import { UpdatesSection } from "@/routes/updates";
import { ExpertiseSection } from "@/routes/expertise";
import { StorySection } from "@/routes/story";
import { ResearchSection } from "@/routes/research";
import { ExperienceSection } from "@/routes/experience";
import { PublicationsSection } from "@/routes/publications";
import { ContactSection } from "@/routes/contact";
import { AudienceSection } from "@/components/AudienceSection";

function VariantBackground() {
  const { variant } = useVariant();
  const v: SceneVariant = (variant ?? "hero") as SceneVariant;
  return (
    <div className="fixed inset-0 -z-10 opacity-70 pointer-events-none transition-opacity duration-700">
      <MolecularCanvas variant={v as "hero"} className="h-full w-full" />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <VariantProvider>
        <div className="relative min-h-screen bg-hero">
          <VariantBackground />
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
        </div>
      </VariantProvider>
    </ThemeProvider>
  );
}
