"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

export default function PartnersPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const benefits = [
        {
            icon: <Users className="w-8 h-8 text-blue-400" />,
            title: "Access Top Talent",
            desc: "Direct access to our vast network of highly skilled student developers, designers, and innovators eager to make an impact."
        },
        {
            icon: <Target className="w-8 h-8 text-cyan-400" />,
            title: "Brand Visibility",
            desc: "Place your brand boldly in front of thousands of tech enthusiasts across high-engagement events, streams, and hackathons."
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
            title: "Community Impact",
            desc: "Drive and support grass-roots technology adoption by investing in modern learning structures and community-driven events."
        }
    ];

    const tiers = [
        {
            name: "Bronze",
            price: "Base Investment",
            color: "text-amber-600",
            bg: "bg-amber-600/10",
            border: "border-amber-600/30",
            features: [
                "Logo display on event webpages",
                "Shoutout on social media platforms",
                "Distribute digital marketing materials",
                "Access to public attendee metrics"
            ]
        },
        {
            name: "Silver",
            price: "Standard Investment",
            color: "text-slate-300",
            bg: "bg-slate-300/10",
            border: "border-slate-300/30",
            features: [
                "Everything in Bronze tier",
                "Dedicated speaker slot (15 mins)",
                "Physical booth at offline events",
                "Access to participant resumes (opt-in)",
                "1-on-1 introductory talent matching"
            ]
        },
        {
            name: "Gold",
            price: "Premium Investment",
            color: "text-yellow-400",
            bg: "bg-yellow-400/10",
            border: "border-yellow-400/30",
            popular: true,
            features: [
                "Everything in Silver tier",
                "Title sponsor status and brand exclusivity",
                "Keynote speaker slot (45 mins)",
                "Host private challenges/hackathons",
                "Full access to candidate databanks",
                "VIP networking dinner with organizers"
            ]
        }
    ];

    // Dummy logos for infinite marquee (using placeholder SVGs)
    const partners = [
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png"
    ];

    return (
        <div className="min-h-screen bg-transparent font-sans text-white selection:bg-blue-900 selection:text-white relative flex flex-col overflow-x-hidden">
            <style jsx global>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-250px * 6)); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
            
            {/* Background Layers */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            <Navbar />

            <main className="relative z-10 flex-grow pt-32 pb-24 w-full">
                
                {/* Hero / Why Partner */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-400 tracking-tight">
                            Partner With Us
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                            Join us in building the next generation of tech talent. Connect with top-tier student developers, amplify your brand, and ignite groundbreaking innovation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((b, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                                <div className="p-4 bg-black/40 rounded-2xl inline-block mb-6 border border-white/5">
                                    {b.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white">{b.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sponsorship Tiers */}
                <section className="bg-black/40 py-24 border-y border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Sponsorship Packages</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">Choose a partnership level that aligns with your hiring and marketing goals.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 items-stretch">
                            {tiers.map((tier, idx) => (
                                <div key={idx} className={`relative flex flex-col h-full bg-black/60 border ${tier.border} rounded-3xl p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-${tier.color.split('-')[1]}-500/20 group`}>
                                    {tier.popular && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-yellow-400 text-black text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-yellow-400/30">
                                            Most Popular
                                        </div>
                                    )}
                                    <h3 className={`text-3xl font-black mb-2 ${tier.color} group-hover:scale-105 transition-transform origin-left`}>{tier.name}</h3>
                                    <p className="text-slate-400 font-medium mb-8">{tier.price}</p>
                                    
                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {tier.features.map((ft, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className={`w-5 h-5 shrink-0 ${tier.color}`} />
                                                <span className="text-slate-300 text-sm leading-relaxed">{ft}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={`w-full py-4 mt-auto rounded-xl font-bold border transition-all duration-300 ${tier.bg} ${tier.border} ${tier.color} hover:bg-opacity-20 hover:scale-[1.02] shadow-sm`}>
                                        Contact to Sponsor
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Infinite Marquee - Previous Partners */}
                <section className="max-w-7xl py-24 mx-auto px-4 overflow-hidden">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Our Previous Partners</h2>
                        <p className="text-slate-400">Trusted by industry leaders worldwide.</p>
                    </div>

                    <div className="relative w-full overflow-hidden bg-white/5 py-10 rounded-3xl border border-white/10 backdrop-blur-sm before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[100px] before:bg-gradient-to-r before:from-[#0a0f1c] before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[100px] after:bg-gradient-to-l after:from-[#0a0f1c] after:to-transparent after:content-['']">
                        <div className="flex animate-scroll w-[calc(250px*12)]">
                            {/* Original List */}
                            {partners.map((logo, index) => (
                                <div key={index} className="flex items-center justify-center w-[250px] px-8">
                                    <div className="h-16 w-full relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center bg-white/90 rounded-2xl border border-white/20 p-4 shadow-lg hover:bg-white">
                                        <img src={logo} alt={`Partner ${index}`} className="max-h-12 w-auto object-contain" />
                                    </div>
                                </div>
                            ))}
                            {/* Duplicated List for smooth infinite scroll loop */}
                            {partners.map((logo, index) => (
                                <div key={`dup-${index}`} className="flex items-center justify-center w-[250px] px-8">
                                    <div className="h-16 w-full relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center bg-white/90 rounded-2xl border border-white/20 p-4 shadow-lg hover:bg-white">
                                        <img src={logo} alt={`Partner duplicate ${index}`} className="max-h-12 w-auto object-contain" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
