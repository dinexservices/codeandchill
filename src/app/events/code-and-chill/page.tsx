"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { Calendar, Clock, MapPin, Trophy, Users, CheckCircle, ArrowRight, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CodeAndChillPage() {
    const eventDate = "2024-12-31T00:00:00"; // Set your event date

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-900 selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 opacity-70"></div>

                {/* Abstract Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 bg-cyan-900/30 border border-cyan-700/50 text-cyan-300 rounded-full text-sm font-semibold mb-6">
                        Code & Chill – 24 Hour AI Hackathon
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Build. Innovate. <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Solve Real Bharat Challenges.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Code & Chill is a 24-hour innovation-driven hackathon focused on building Artificial Intelligence solutions for real-world challenges across India’s key sectors. The event brings together creative thinkers, developers, designers, and innovators to collaborate and build impactful technology solutions.
                    </p>

                    <div className="mb-12">
                        <CountdownTimer targetDate={eventDate} />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/events/code-and-chill/register" className="px-8 py-4 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 w-full sm:w-auto text-center">
                            Register Now
                        </Link>
                        <Link href="#domains" className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-colors w-full sm:w-auto text-center">
                            Explore Domains
                        </Link>
                        <button className="px-8 py-4 bg-slate-800 text-cyan-400 font-bold rounded-xl hover:bg-slate-700 transition-colors w-full sm:w-auto border border-slate-700">
                            Download Brochure
                        </button>
                    </div>
                </div>
            </section>

            {/* Event Details */}
            <ScrollAnimatedSection>
                <section className="py-12 border-b border-slate-800 bg-slate-900/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-cyan-900/30 text-cyan-400 rounded-xl border border-cyan-800/30">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Event Date</div>
                                    <div className="text-white font-bold">To Be Announced</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-900/30 text-blue-400 rounded-xl border border-blue-800/30">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Duration</div>
                                    <div className="text-white font-bold">24 Hours</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-900/30 text-purple-400 rounded-xl border border-purple-800/30">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Location</div>
                                    <div className="text-white font-bold">(To Be Announced) Offline</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-900/30 text-emerald-400 rounded-xl border border-emerald-800/30">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Registration Fee</div>
                                    <div className="text-white font-bold">₹199 Per Participant</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollAnimatedSection>


            {/* About & Highlights Section */}
            <section className="py-24 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <ScrollAnimatedSection direction="right">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6">About The Event</h2>
                                <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
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
                        </ScrollAnimatedSection>

                        <ScrollAnimatedSection direction="left" delay={0.2}>
                            <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
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
                                        <div key={i} className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-sm">
                                            <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                            <span className="font-medium text-slate-300 text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollAnimatedSection>
                    </div>
                </div>
            </section>

            {/* Domains Section */}
            <section id="domains" className="py-24 bg-slate-900 relative">
                <div className="absolute inset-0 bg-slate-900/50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ScrollAnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">Hackathon Domains</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                Select a domain to build your solution.
                            </p>
                        </div>
                    </ScrollAnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "FinTech", desc: "Develop AI solutions focused on digital payments, fraud detection, financial inclusion, smart banking tools, and credit accessibility." },
                            { title: "EdTech", desc: "Create personalized AI learning platforms, skill development tools, adaptive education models, and vernacular learning solutions." },
                            { title: "AgriTech", desc: "Design smart farming solutions including crop prediction, irrigation automation, yield optimization, and farmer assistance tools." },
                            { title: "HealthTech", desc: "Build AI healthcare solutions such as telemedicine platforms, diagnostic tools, mental health support systems, and healthcare resource management." },
                            { title: "Mobility", desc: "Develop smart transport systems, traffic optimization tools, logistics automation solutions, and accessibility-focused mobility innovations." },
                            { title: "Sustainability", desc: "Create environmental monitoring tools, waste management solutions, renewable energy optimization systems, and carbon tracking platforms." }
                        ].map((track, i) => (
                            <ScrollAnimatedSection key={i} delay={i * 0.1} direction="up">
                                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:shadow-xl transition-all hover:border-cyan-500/50 hover:bg-slate-800/80 group">
                                    <div className="w-14 h-14 bg-cyan-900/30 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform border border-cyan-800/30">
                                        <Target className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{track.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{track.desc}</p>
                                </div>
                            </ScrollAnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Structure / Hackathon Flow */}
            <section className="py-24 bg-slate-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollAnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">Hackathon Flow</h2>
                            <p className="text-slate-400">The journey from registration to results.</p>
                        </div>
                    </ScrollAnimatedSection>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                        {[
                            { phase: "Phase 1", title: "Registration", desc: "Participants register individually or as teams through the website." },
                            { phase: "Phase 2", title: "Team Formation and Idea Development", desc: "Participants finalize teams and brainstorm innovative solutions based on selected domains." },
                            { phase: "Phase 3", title: "Development Stage", desc: "Teams develop working prototypes with mentor guidance and technical support." },
                            { phase: "Phase 4", title: "Project Submission", desc: "Teams submit their project source code, prototype, and presentation." },
                            { phase: "Phase 5", title: "Evaluation and Results", desc: "Projects are evaluated by industry experts and winners are announced." },
                        ].map((item, i) => (
                            <ScrollAnimatedSection key={i} delay={i * 0.15} direction={i % 2 === 0 ? "right" : "left"}>
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm hover:shadow-cyan-500/10 transition-shadow">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-white">{item.title}</div>
                                            <div className="font-mono text-xs text-cyan-400 font-bold uppercase">{item.phase}</div>
                                        </div>
                                        <div className="text-slate-400 text-sm leading-snug">{item.desc}</div>
                                    </div>
                                </div>
                            </ScrollAnimatedSection>
                        ))}
                    </div>

                    <ScrollAnimatedSection delay={0.5}>
                        <div className="mt-16 text-center">
                            <Link href="/events/code-and-chill/register" className="inline-flex items-center justify-center px-10 py-5 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-xl shadow-cyan-500/25 text-lg">
                                Register Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </ScrollAnimatedSection>

                </div>
            </section>

            <Footer />
        </div>
    );
}
