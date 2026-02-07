"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Trophy, Users, Lightbulb, CheckCircle, ArrowRight, Target } from 'lucide-react';
import Link from 'next/link';

export default function CodeAndChillPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 opacity-70"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 bg-cyan-100 border border-cyan-200 text-cyan-700 rounded-full text-sm font-semibold mb-6">
                        Code & Chill – 24 Hour AI Hackathon
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
                        Build. Innovate. <br /> <span className="text-cyan-600">Solve Real Bharat Challenges.</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Code & Chill is a 24-hour innovation-driven hackathon focused on building Artificial Intelligence solutions for real-world challenges across India’s key sectors. The event brings together creative thinkers, developers, designers, and innovators to collaborate and build impactful technology solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/events/code-and-chill/register" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 w-full sm:w-auto text-center">
                            Register Now
                        </Link>
                        <Link href="#domains" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors w-full sm:w-auto text-center">
                            Explore Domains
                        </Link>
                        <button className="px-8 py-4 bg-cyan-100 text-cyan-700 font-bold rounded-xl hover:bg-cyan-200 transition-colors w-full sm:w-auto">
                            Download Brochure
                        </button>
                    </div>
                </div>
            </section>

            {/* Event Details */}
            <section className="py-12 border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 font-medium">Event Date</div>
                                <div className="text-slate-900 font-bold">To Be Announced</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 font-medium">Duration</div>
                                <div className="text-slate-900 font-bold">24 Hours</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 font-medium">Location</div>
                                <div className="text-slate-900 font-bold">(To Be Announced) Offline</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 font-medium">Registration Fee</div>
                                <div className="text-slate-900 font-bold">₹199 Per Participant</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* About & Highlights Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">About The Event</h2>
                            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    Code & Chill is a 24-hour AI innovation hackathon designed to encourage students to develop real-world solutions using Artificial Intelligence and emerging technologies.
                                </p>
                                <p>
                                    The hackathon is built around the theme “AI for Bharat”, encouraging participants to design scalable and inclusive solutions that address real challenges in India across finance, education, agriculture, healthcare, sustainability, and mobility.
                                </p>
                                <p>
                                    Participants can join individually or participate as a team of up to four members. Participants will collaborate, develop working prototypes, and present their solutions before industry experts and mentors.
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-amber-500" />
                                Event Highlights
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "24 Hour Continuous Hackathon",
                                    "Industry Mentorship",
                                    "Real Problem Statements",
                                    "Prize Pool Recognition",
                                    "Participation and Merit Certificates",
                                    "Networking Opportunities",
                                    "Industry Skill Exposure"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                                        <span className="font-medium text-slate-700 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Domains Section */}
            <section id="domains" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Hackathon Domains</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Select a domain to build your solution.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "FinTech", desc: "Develop AI solutions focused on digital payments, fraud detection, financial inclusion, smart banking tools, and credit accessibility." },
                            { title: "EdTech", desc: "Create personalized AI learning platforms, skill development tools, adaptive education models, and vernacular learning solutions." },
                            { title: "AgriTech", desc: "Design smart farming solutions including crop prediction, irrigation automation, yield optimization, and farmer assistance tools." },
                            { title: "HealthTech", desc: "Build AI healthcare solutions such as telemedicine platforms, diagnostic tools, mental health support systems, and healthcare resource management." },
                            { title: "Mobility", desc: "Develop smart transport systems, traffic optimization tools, logistics automation solutions, and accessibility-focused mobility innovations." },
                            { title: "Sustainability", desc: "Create environmental monitoring tools, waste management solutions, renewable energy optimization systems, and carbon tracking platforms." }
                        ].map((track, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all hover:border-cyan-200 group">
                                <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
                                    <Target className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{track.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{track.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Structure / Hackathon Flow */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Hackathon Flow</h2>
                        <p className="text-slate-600">The journey from registration to results.</p>
                    </div>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {[
                            { phase: "Phase 1", title: "Registration", desc: "Participants register individually or as teams through the website." },
                            { phase: "Phase 2", title: "Team Formation and Idea Development", desc: "Participants finalize teams and brainstorm innovative solutions based on selected domains." },
                            { phase: "Phase 3", title: "Development Stage", desc: "Teams develop working prototypes with mentor guidance and technical support." },
                            { phase: "Phase 4", title: "Project Submission", desc: "Teams submit their project source code, prototype, and presentation." },
                            { phase: "Phase 5", title: "Evaluation and Results", desc: "Projects are evaluated by industry experts and winners are announced." },
                        ].map((item, i) => (
                            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className="font-bold text-slate-900">{item.title}</div>
                                        <div className="font-mono text-xs text-cyan-500 font-bold uppercase">{item.phase}</div>
                                    </div>
                                    <div className="text-slate-600 text-sm leading-snug">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/events/code-and-chill/register" className="inline-flex items-center justify-center px-10 py-5 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-xl shadow-cyan-500/25 text-lg">
                            Register Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}
