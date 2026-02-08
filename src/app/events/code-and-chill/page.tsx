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
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-900 selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-transparent overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                {/* <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-black to-black"></div> */}

                {/* Abstract Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow delay-1000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 bg-cyan-900/20 border border-cyan-500/30 backdrop-blur-sm text-cyan-300 rounded-full text-sm font-semibold mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                        Code & Chill – 24 Hour AI Hackathon
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Build. Innovate. <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">Solve Real Bharat Challenges.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Code & Chill is a 24-hour innovation-driven hackathon focused on building Artificial Intelligence solutions for real-world challenges across India’s key sectors. The event brings together creative thinkers, developers, designers, and innovators to collaborate and build impactful technology solutions.
                    </p>

                    <div className="mb-12">
                        <CountdownTimer targetDate={eventDate} />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/events/code-and-chill/register" className="px-8 py-4 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] w-full sm:w-auto text-center">
                            Register Now
                        </Link>
                        <Link href="#domains" className="px-8 py-4 bg-white/5 backdrop-blur-md text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-colors w-full sm:w-auto text-center">
                            Explore Domains
                        </Link>
                        <button className="px-8 py-4 bg-transparent text-cyan-400 font-bold rounded-xl hover:bg-cyan-950/30 transition-colors w-full sm:w-auto border border-cyan-900/50 hover:border-cyan-700">
                            Download Brochure
                        </button>
                    </div>
                </div>
            </section>

            {/* Event Details */}
            <ScrollAnimatedSection>
                <section className="py-12 border-y border-white/5 bg-white/2 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Event Date</div>
                                    <div className="text-white font-bold text-lg">To Be Announced</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Duration</div>
                                    <div className="text-white font-bold text-lg">24 Hours</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Location</div>
                                    <div className="text-white font-bold text-lg">Offline</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 font-medium">Registration Fee</div>
                                    <div className="text-white font-bold text-lg">₹199 / Participant</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollAnimatedSection>


            {/* About & Highlights Section */}
            <section className="py-24 bg-transparent relative">
                <div className="absolute left-0 top-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <ScrollAnimatedSection direction="right">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About The Event</h2>
                                <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
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
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Trophy className="w-6 h-6 text-amber-400" />
                                    Event Highlights
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        "24 Hour Continuous Hackathon",
                                        "Industry Mentorship",
                                        "Real Problem Statements",
                                        "Prize Pool Recognition",
                                        "Participation Certificates",
                                        "Networking Opportunities",
                                        "Industry Skill Exposure"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
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
            <section id="domains" className="py-24 bg-transparent relative overflow-hidden">
                {/* <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black"></div> */}
                <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ScrollAnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hackathon Domains</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                                Select a domain to build your solution.
                            </p>
                        </div>
                    </ScrollAnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "FinTech", desc: "Develop AI solutions focused on digital payments, fraud detection, financial inclusion, smart banking tools, and credit accessibility.", color: "cyan" },
                            { title: "EdTech", desc: "Create personalized AI learning platforms, skill development tools, adaptive education models, and vernacular learning solutions.", color: "blue" },
                            { title: "AgriTech", desc: "Design smart farming solutions including crop prediction, irrigation automation, yield optimization, and farmer assistance tools.", color: "green" },
                            { title: "HealthTech", desc: "Build AI healthcare solutions such as telemedicine platforms, diagnostic tools, mental health support systems, and healthcare resource management.", color: "red" },
                            { title: "Mobility", desc: "Develop smart transport systems, traffic optimization tools, logistics automation solutions, and accessibility-focused mobility innovations.", color: "amber" },
                            { title: "Sustainability", desc: "Create environmental monitoring tools, waste management solutions, renewable energy optimization systems, and carbon tracking platforms.", color: "emerald" }
                        ].map((track, i) => (
                            <ScrollAnimatedSection key={i} delay={i * 0.1} direction="up">
                                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 group transition-all duration-300 h-full hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform border border-white/10 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                        <Target className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{track.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">{track.desc}</p>
                                </div>
                            </ScrollAnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Structure / Hackathon Flow */}
            <section className="py-24 bg-transparent relative">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ScrollAnimatedSection>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hackathon Flow</h2>
                            <p className="text-slate-400 text-lg">The journey from registration to results.</p>
                        </div>
                    </ScrollAnimatedSection>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyan-900/50 before:to-transparent">
                        {[
                            { phase: "Phase 1", title: "Registration", desc: "Participants register individually or as teams through the website." },
                            { phase: "Phase 2", title: "Team Formation", desc: "Participants finalize teams and brainstorm innovative solutions based on selected domains." },
                            { phase: "Phase 3", title: "Development Stage", desc: "Teams develop working prototypes with mentor guidance and technical support." },
                            { phase: "Phase 4", title: "Project Submission", desc: "Teams submit their project source code, prototype, and presentation." },
                            { phase: "Phase 5", title: "Results", desc: "Projects are evaluated by industry experts and winners are announced." },
                        ].map((item, i) => (
                            <ScrollAnimatedSection key={i} delay={i * 0.15} direction={i % 2 === 0 ? "right" : "left"}>
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-cyan-900 shadow-[0_0_15px_rgba(6,182,212,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg hover:border-cyan-500/30 transition-all hover:-translate-y-1">
                                        <div className="flex items-center justify-between space-x-2 mb-2">
                                            <div className="font-bold text-white text-lg">{item.title}</div>
                                            <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">{item.phase}</div>
                                        </div>
                                        <div className="text-slate-400 text-sm leading-relaxed">{item.desc}</div>
                                    </div>
                                </div>
                            </ScrollAnimatedSection>
                        ))}
                    </div>

                    <ScrollAnimatedSection delay={0.5}>
                        <div className="mt-20 text-center">
                            <Link href="/events/code-and-chill/register" className="inline-flex items-center justify-center px-10 py-5 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] text-lg group">
                                Register Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </ScrollAnimatedSection>

                </div>
            </section>

            <Footer />
        </div>
    );
}
