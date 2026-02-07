import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TechBackground from '@/components/TechBackground';
import HeroCarousel from '@/components/HeroCarousel';
import AboutCollabify from '@/components/AboutCollabify';
import AboutConclave from '@/components/AboutConclave';
import Partners from '@/components/Partners';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import GrainOverlay from '@/components/GrainOverlay';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white selection:bg-cyan-900 selection:text-white relative overflow-hidden">
      <GrainOverlay />

      {/* Background Gradient Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-900/20 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-fuchsia-900/10 rounded-full blur-[150px] animate-pulse-slow delay-2000"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section - Full Screen */}
        <HeroCarousel />

        {/* About Conclave Section */}
        <ScrollAnimatedSection>
          <AboutConclave />
        </ScrollAnimatedSection>

        {/* About Collabify Section */}
        <ScrollAnimatedSection delay={0.2} direction="left">
          <AboutCollabify />
        </ScrollAnimatedSection>

        {/* Partners Section */}
        <ScrollAnimatedSection delay={0.3}>
          <Partners />
        </ScrollAnimatedSection>

        <Footer />
      </div>
    </div>
  );
}