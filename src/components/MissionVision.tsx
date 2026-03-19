"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Target, Eye, Sparkles } from "lucide-react";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2, ease: "easeOut" as const },
  }),
};

const MissionVision = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-5">
            <Sparkles className="w-4 h-4" />
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
            Driven by{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Purpose
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            At Code&amp;Chill, every event we host and every connection we foster
            is guided by a clear mission and a bold vision for the future of
            tech in India.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Mission Card */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-blue-500/40 hover:bg-white/[0.08] transition-all duration-500 overflow-hidden"
          >
            {/* Decorative corner glow */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-7 h-7 text-blue-400" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                Our Mission
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                Empowering India&apos;s Next{" "}
                <span className="text-blue-400">Tech Generation</span>
              </h3>

              <p className="text-slate-400 leading-relaxed mb-6">
                Our mission is to build a thriving ecosystem where students,
                developers, founders, and innovators come together to learn,
                compete, and grow. We bridge the gap between academic learning
                and real-world problem solving through immersive hackathons,
                conclaves, and collaborative events that challenge and inspire.
              </p>

              <ul className="space-y-3">
                {[
                  "Democratize access to tech opportunities across India",
                  "Connect talent with mentors and industry leaders",
                  "Foster a culture of innovation and entrepreneurship",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mt-0.5 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-purple-500/40 hover:bg-white/[0.08] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-pink-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-7 h-7 text-purple-400" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
                Our Vision
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                India&apos;s Most{" "}
                <span className="text-purple-400">Vibrant Tech Community</span>
              </h3>

              <p className="text-slate-400 leading-relaxed mb-6">
                We envision a future where every young technologist in India has
                a launchpad — a community that celebrates curiosity, rewards
                creativity, and transforms ambition into achievement. Code&amp;Chill
                aspires to be the premier platform where the brightest minds
                collaborate to build the technologies of tomorrow.
              </p>

              <ul className="space-y-3">
                {[
                  "India's #1 student-led tech event platform by 2026",
                  "10,000+ active community members across 50+ cities",
                  "Partnership with 100+ companies for recruitment &amp; mentorship",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mt-0.5 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
