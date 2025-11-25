import dynamic from "next/dynamic";
import Navbar from "@/app/components/Navbar";
import PreloaderGate from "@/app/components/PreloaderGate";
import Sidebar from "@/app/components/Sidebar";
import HomeIntro from "@/app/components/HomeIntro";
import AboutSection from "@/app/components/AboutSection";

// Lazy load below-the-fold components
const ExperienceSection = dynamic(() => import("@/app/components/ExperienceSection"), {
  loading: () => <div className="min-h-screen" />,
});
const WorkSection = dynamic(() => import("@/app/components/WorkSection"), {
  loading: () => <div className="min-h-screen" />,
});
const OtherProjectsSection = dynamic(() => import("@/app/components/OtherProjectsSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const SaasSection = dynamic(() => import("@/app/components/SaasSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const ContactSection = dynamic(() => import("@/app/components/ContactSection"), {
  loading: () => <div className="min-h-[400px]" />,
});
const ScrollToTopButton = dynamic(() => import("@/app/components/ScrollToTopButton"));

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
