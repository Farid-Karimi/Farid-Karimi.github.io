import AboutSection from "@/components/sections/AboutSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HomeHero from "@/components/HomeHero";

export default function Home() {
  return (
    <main className="index layout-block">
      <HomeHero />
      <MarqueeSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ExperienceSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}