import AboutSection from "@/components/sections/AboutSection";
import LargeTextSection from "@/components/sections/LargeTextSection";
import WritingSection from "@/components/sections/WritingSection";
import HomeHero from "@/components/HomeHero";

export default function Home() {
  return (
    <main className="index layout-block">
      <HomeHero />
      <AboutSection />
      <LargeTextSection />
      <WritingSection />
    </main>
  );
}