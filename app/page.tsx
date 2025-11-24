import Navbar from "@/app/components/Navbar";
import PreloaderGate from "@/app/components/PreloaderGate";
import Sidebar from "@/app/components/Sidebar";
import HomeIntro from "@/app/components/HomeIntro";
import AboutSection from "@/app/components/AboutSection";
import ExperienceSection from "@/app/components/ExperienceSection";
import WorkSection from "@/app/components/WorkSection";
import SaasSection from "@/app/components/SaasSection";
import OtherProjectsSection from "@/app/components/OtherProjectsSection";
import ContactSection from "@/app/components/ContactSection"; 
import ScrollToTopButton from "@/app/components/ScrollToTopButton";

export default function Home() {
  return (
    <PreloaderGate>
      <Navbar />
      <main className="pt-16 md:pl-20">
        {/* Desktop-only left sidebar aligned below the fixed navbar */}
        <Sidebar />

        {/* Centered intro content (mobile and desktop) */}
        <HomeIntro />

        {/* About section with scroll-triggered animations */}
        <AboutSection />

        {/* Experience section with tabs and animations */}
        <ExperienceSection />

        {/* Work section with project showcases */}
        <WorkSection />

        {/* Other noteworthy projects section */}
        <OtherProjectsSection />

        {/* SaaS accelerator section */}
        <SaasSection />

        {/* Contact section with modal */}
        <ContactSection />
      </main>

      {/* Floating scroll-to-top button */}
      <ScrollToTopButton />
    </PreloaderGate>
  );
}
