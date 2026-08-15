import AboutSection from "@/components/sections/AboutSection";
import LargeTextSection from "@/components/sections/LargeTextSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TeamSection from "@/components/sections/TeamSection";
import WritingSection from "@/components/sections/WritingSection";
import HomeHero from "@/components/HomeHero";

export default function Home() {
  return (
    <main className="index layout-block">
      <HomeHero />
      <AboutSection />
      <LargeTextSection />
      <WritingSection />
      <TeamSection />
      <PortfolioSection />
    </main>
  );
}