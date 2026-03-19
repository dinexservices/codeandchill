"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Trophy,
  Users,
  Briefcase,
  Lightbulb,
  Handshake,
  BookOpen,
  Globe,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const offers = [
  {
    icon: Code2,
    color: "blue",
    title: "Hackathons & Coding Challenges",
    description:
      "24-hour and multi-day hackathons where teams tackle real-world problems and compete for prizes, recognition, and incubation opportunities.",
  },
  {
    icon: Trophy,
    color: "amber",
    title: "Competitive Programming",
    description:
      "Structured contests that sharpen algorithmic thinking and problem-solving skills — from beginners to seasoned coders.",
  },
  {
    icon: Users,
    color: "cyan",
    title: "Tech Conclaves & Summits",
    description:
      "High-impact conferences featuring industry stalwarts, startup founders, and thought leaders sharing actionable insights.",
  },
  {
    icon: Briefcase,
    color: "emerald",
    title: "Career & Recruitment Fairs",
    description:
      "Direct access to top-tier companies looking to recruit talented developers, designers, and product thinkers from our community.",
  },
  {
    icon: Lightbulb,
    color: "yellow",
    title: "Workshops & Bootcamps",
    description:
      "Hands-on learning experiences on cutting-edge technologies — AI/ML, Web3, DevOps, product design, and more.",
  },
  {
    icon: Handshake,
    color: "purple",
    title: "Mentorship Programs",
    description:
      "One-on-one and group mentorship sessions connecting emerging talent with experienced industry professionals and serial entrepreneurs.",
  },
  {
    icon: BookOpen,
    color: "pink",
    title: "Student Club Collaborations",
    description:
      "Partner with your college tech club to co-host events, access resources, and amplify your community's reach nationally.",
  },
  {
    icon: Globe,
    color: "indigo",
    title: "Networking Events",
    description:
      "Curated networking experiences — both online and in-person — that help you forge lasting professional relationships.",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; shadow: string }> = {
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/20",    text: "text-blue-400",    shadow: "group-hover:shadow-blue-500/20" },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/20",   text: "text-amber-400",   shadow: "group-hover:shadow-amber-500/20" },
  cyan:    { bg: "bg-cyan-500/10",    border: "border-cyan-500/20",    text: "text-cyan-400",    shadow: "group-hover:shadow-cyan-500/20" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", shadow: "group-hover:shadow-emerald-500/20" },
  yellow:  { bg: "bg-yellow-500/10",  border: "border-yellow-500/20",  text: "text-yellow-400",  shadow: "group-hover:shadow-yellow-500/20" },
  purple:  { bg: "bg-purple-500/10",  border: "border-purple-500/20",  text: "text-purple-400",  shadow: "group-hover:shadow-purple-500/20" },
  pink:    { bg: "bg-pink-500/10",    border: "border-pink-500/20",    text: "text-pink-400",    shadow: "group-hover:shadow-pink-500/20" },
  indigo:  { bg: "bg-indigo-500/10",  border: "border-indigo-500/20",  text: "text-indigo-400",  shadow: "group-hover:shadow-indigo-500/20" },
};

const WhatWeOffer = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* ambient blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-5">
            <Sparkles className="w-4 h-4" />
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Level Up
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From competitive events to career-building opportunities, Code&amp;Chill
            is your one-stop platform for everything tech.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, i) => {
            const c = colorMap[offer.color];
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl ${c.shadow}`}
              >
                <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${c.text}`} />
                </div>
                <h4 className="text-white font-bold text-base mb-2 leading-snug">
                  {offer.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {offer.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105"
          >
            Explore All Events
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
