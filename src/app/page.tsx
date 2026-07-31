import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import {
  ChaosSection,
  SolutionSection,
  CalmSection,
  FeatureStagesSection,
  FAQSection,
  ContactSection,
  FinalCTASection,
  Footer,
} from "@/components/landing-sections";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Film grain texture overlay — cinematic feel */}
      <div className="grain-overlay" aria-hidden="true" />

      <Navbar />

      <main className="flex-1 relative z-10">
        {/* Hero — product reveal */}
        <HeroSection />

        {/* Act 1 — The Problem (chaos) */}
        <ChaosSection />

        {/* Act 2 — The Solution (notifications merge) */}
        <SolutionSection />

        {/* Act 3 — The Outcome (calm) */}
        <CalmSection />

        {/* Feature Stages — each gets a full screen */}
        <FeatureStagesSection />

        {/* FAQ */}
        <FAQSection />

        {/* Contact */}
        <ContactSection />

        {/* Final CTA — cinematic close */}
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
