"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Code, Globe, Zap, Heart, Briefcase, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const perks = [
    {
        icon: <Globe className="w-6 h-6 text-cyan-400" />,
        title: "Remote First",
        description: "Work from anywhere in the world. We believe in output, not hours.",
    },
    {
        icon: <Zap className="w-6 h-6 text-yellow-400" />,
        title: "High Impact",
        description: "Work on products used by thousands. Your code matters here.",
    },
    {
        icon: <Code className="w-6 h-6 text-green-400" />,
        title: "Modern Tech",
        description: "We use the latest stack. Next.js, React, Node - no legacy code.",
    },
    {
        icon: <Heart className="w-6 h-6 text-red-400" />,
        title: "Great Culture",
        description: "Collaborative, inclusive, and fun. We support each other's growth.",
    },
];

interface Job {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
}

const jobs: Job[] = [];

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Careers",
    description: "Join the Code & Chill team. We are looking for passionate developers and designers to build the future of tech events.",
};

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:text-white relative overflow-hidden flex flex-col">

            <Navbar />

            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 flex-grow">

                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
                            Join the Revolution.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            We are building the future of event experiences.
                            If you are passionate about code, design, and community, we want you on our team.
                        </p>
                    </motion.div>
                </div>

                {/* Perks Grid */}
                <div className="max-w-6xl mx-auto mb-32">
                    <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Why Code & Chill?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {perks.map((perk, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group"
                            >
                                <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {perk.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{perk.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{perk.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Open Positions */}
                <div className="max-w-4xl mx-auto mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold mb-10 flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-cyan-500" /> Open Positions
                    </h2>

                    {jobs.length > 0 ? (
                        <div className="space-y-4">
                            {jobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-cyan-500/50 transition-all cursor-pointer overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 group-hover:via-cyan-500/5 transition-all duration-500"></div>

                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                                                {job.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                                                <span className="bg-white/5 px-3 py-1 rounded-full">{job.department}</span>
                                                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {job.location}</span>
                                                <span>{job.type}</span>
                                            </div>
                                            <p className="text-slate-500 text-sm max-w-xl">
                                                {job.description}
                                            </p>
                                        </div>

                                        <button className="px-6 py-3 bg-white/10 hover:bg-cyan-600 hover:text-white text-slate-300 font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap">
                                            Apply Now <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-slate-400 text-lg">No open positions currently.</p>
                            <p className="text-slate-500 text-sm mt-2">Check back soon or drop us an email!</p>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-3xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <h2 className="text-3xl font-bold mb-4 relative z-10">Don't see your role?</h2>
                    <p className="text-slate-400 mb-8 relative z-10">
                        We are always looking for talented individuals. Send us your resume and tell us how you can make an impact.
                    </p>
                    <a
                        href="mailto:careers@codeandchill.com"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-cyan-500 hover:scale-105 transition-all relative z-10"
                    >
                        <Mail className="w-5 h-5" /> Email Us
                    </a>
                </div>

            </div>

            <Footer />
        </div>
    );
}
