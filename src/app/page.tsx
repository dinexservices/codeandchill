import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TechBackground from '@/components/TechBackground';
import HeroCarousel from '@/components/HeroCarousel';
import AboutCollabify from '@/components/AboutCollabify';
import AboutConclave from '@/components/AboutConclave';
import Partners from '@/components/Partners';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-cyan-100 selection:text-cyan-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <TechBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900">
              Innovate. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Code.</span> Chill.
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Join the ultimate ecosystem of student developers, creators, and innovators.
              Participate in hackathons, network with peers, and shape the future of tech.
            </p>
          </div>

          <HeroCarousel />
        </div>
      </section>

      {/* About Conclave Section */}
      <AboutConclave />

      {/* About Collabify Section */}
      <AboutCollabify />

      {/* Partners Section */}
      <Partners />

      <Footer />
    </div>
  );
}