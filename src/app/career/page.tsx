"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Briefcase, ArrowRight, Building2, Globe, Users } from 'lucide-react';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';

export default function CareerPage() {
    const jobs = [
        {
            title: "Frontend Developer Intern",
            type: "Internship",
            location: "Remote",
            department: "Engineering",
            icon: <Globe className="w-5 h-5" />
        },
        {
            title: "Community Manager",
            type: "Volunteer",
            location: "Hybrid",
            department: "Community",
            icon: <Users className="w-5 h-5" />
        },
        {
            title: "Event Coordinator",
            type: "Part-time",
            location: "On-site",
            department: "Operations",
            icon: <Building2 className="w-5 h-5" />
        }
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-900 selection:text-white">
            <Navbar />

            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <ScrollAnimatedSection>
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-emerald-900/30 text-emerald-400 border border-emerald-800/30 rounded-full text-sm font-semibold mb-6">
                            Join the Team
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Build the <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-green-500">Future</span> with Us
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Be part of a dynamic team driving innovation in the student community. We are looking for passionate individuals.
                        </p>
                    </div>
                </ScrollAnimatedSection>

                <div className="grid gap-6 max-w-4xl mx-auto">
                    {jobs.map((job, index) => (
                        <ScrollAnimatedSection key={index} delay={index * 0.1} direction="up">
                            <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group">
                                <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-emerald-900/30 group-hover:text-emerald-400 transition-colors">
                                        {job.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{job.title}</h3>
                                        <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                                            <span>{job.department}</span>
                                            <span>•</span>
                                            <span>{job.type}</span>
                                            <span>•</span>
                                            <span>{job.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full md:w-auto px-6 py-3 bg-slate-700 border border-slate-600 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors flex items-center justify-center gap-2 group-hover:border-emerald-500/30">
                                    Apply Now
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </ScrollAnimatedSection>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
