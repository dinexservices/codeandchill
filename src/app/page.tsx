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
import Marquee from '@/components/Marquee';
import UpcomingEvents from '@/components/UpcomingEvents';

export default function Home() {
  const marqueeItems = [
    "24-Hour AI Hackathon",
    "Code & Chill 2.0",
    "Innovation Meets Creativity",
    "Real-world Bharat Challenges",
    "Join the Tech Revolution",
    "Network with Industry Leaders"
  ];

  return (
    <div className="min-h-screen bg-transparent font-sans text-white selection:bg-blue-900 selection:text-white relative overflow-hidden">
      <GrainOverlay />

      {/* Background Gradient Blobs - Blue Theme */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-blue-800/10 rounded-full blur-[150px] animate-pulse-slow delay-2000"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section - Full Screen */}
        <HeroCarousel />

        {/* Marquee Section */}
        <Marquee items={marqueeItems} speed={25} />

        {/* Upcoming Events Section */}
        <UpcomingEvents />

        {/* About Sections Grid */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimatedSection>
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <AboutConclave />
              <AboutCollabify />
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* Partners Section */}
        <ScrollAnimatedSection delay={0.3}>
          <Partners />
        </ScrollAnimatedSection>

        <Footer />
      </div>
    </div>
  );
}