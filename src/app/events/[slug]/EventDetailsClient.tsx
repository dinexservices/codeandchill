// Migrating existing page content to EventDetailsClient due to rename failure
"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Trophy, Users, CheckCircle, ArrowRight, Target, AlertCircle, Sparkles, Gift, ScrollText, ShieldAlert, X, Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { fetchEventBySlug } from '@/store/slices/eventSlice';
import { Skeleton } from "@/components/ui/Skeleton";
// Removed metadata imports as this is now a client component

const DOMAIN_DETAILS: Record<string, { description: string, icon: any }> = {
    "FinTech": {
        description: "Develop AI solutions focused on digital payments, fraud detection, financial inclusion, smart banking tools, and credit accessibility.",
        icon: Target
    },
    "EdTech": {
        description: "Create personalized AI learning platforms, skill development tools, adaptive education models, and vernacular learning solutions.",
        icon: Target
    },
    "AgriTech": {
        description: "Design smart farming solutions including crop prediction, irrigation automation, yield optimization, and farmer assistance tools.",
        icon: Target
    },
    "HealthTech": {
        description: "Build AI healthcare solutions such as telemedicine platforms, diagnostic tools, mental health support systems, and healthcare resource management.",
        icon: Target
    },
    "Mobility": {
        description: "Develop smart transport systems, traffic optimization tools, logistics automation solutions, and accessibility-focused mobility innovations.",
        icon: Target
    },
    "Sustainability": {
        description: "Create environmental monitoring tools, waste management solutions, renewable energy optimization systems, and carbon tracking platforms.",
        icon: Target
    }
};

export default function EventDetailsClient() {
    const params = useParams();
    const slug = params.slug as string;
    const dispatch = useAppDispatch();
    const { event, loading, error } = useAppSelector((state) => state.event);
    const [selectedSpeaker, setSelectedSpeaker] = React.useState<any>(null);

    useEffect(() => {
        if (slug) {
            dispatch(fetchEventBySlug(slug));
        }
    }, [dispatch, slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
                <Navbar />

                {/* Hero Skeleton */}
                <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <Skeleton className="h-20 w-3/4 mx-auto bg-white/10" />
                            <Skeleton className="h-6 w-2/3 mx-auto bg-white/10" />
                            <div className="flex justify-center gap-6 pt-6">
                                <Skeleton className="h-14 w-48 rounded-full bg-white/10" />
                                <Skeleton className="h-6 w-32 bg-white/10 my-auto" />
                            </div>
                            <Skeleton className="h-24 w-full max-w-2xl mx-auto rounded-xl bg-white/10 mt-12" />
                        </div>
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="container mx-auto px-4 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-40 rounded-3xl bg-white/5" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Error Loading Event</h1>
                <p className="text-gray-400 mb-6">{typeof error === 'string' ? error : 'An unknown error occurred'}</p>
                <Link href="/events" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors">
                    Back to Events
                </Link>
            </div>
        );
    }

    if (!event) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
            <Navbar />

            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-purple-500/10 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">


                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400 leading-tight">
                            {event.title}
                        </h1>

                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {event.shortDescription}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                            <Link
                                href={`/events/${slug}/register`}
                                className="group relative px-8 py-4 bg-white text-black rounded-full font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center gap-2"
                            >
                                Register Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Users className="w-5 h-5" />
                                <span>500+ Registered</span>
                            </div>
                        </div>

                        <CountdownTimer targetDate={event.startDate} />

                        {/* Date & Time Cards */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
                            {/* Date Card */}
                            <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/10 px-8 py-6 rounded-3xl min-w-[280px] hover:border-cyan-500/30 transition-colors group">
                                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                                    <Calendar className="w-7 h-7 text-cyan-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-gray-400 text-sm font-medium mb-1">Event Date</p>
                                    <p className="text-white text-xl font-bold">
                                        {new Date(event.startDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Time Card */}
                            <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/10 px-8 py-6 rounded-3xl min-w-[280px] hover:border-cyan-500/30 transition-colors group">
                                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                                    <Clock className="w-7 h-7 text-cyan-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-gray-400 text-sm font-medium mb-1">Time</p>
                                    <p className="text-white text-xl font-bold">
                                        {new Date(event.startDate).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Registration Fee Card */}
                            <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/10 px-8 py-6 rounded-3xl min-w-[280px] hover:border-cyan-500/30 transition-colors group">
                                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                                    <Target className="w-7 h-7 text-cyan-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-gray-400 text-sm font-medium mb-1">Registration Fee</p>
                                    <p className="text-white text-xl font-bold">
                                        {event.price === 'Free' ? 'Free' : `₹${event.price} / person`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Details Grid */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 mb-12 md:mb-20">
                    <ScrollAnimatedSection className="p-5 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                        <Clock className="w-8 h-8 md:w-10 md:h-10 text-purple-400 mb-3 md:mb-4" />
                        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Duration</h3>
                        <p className="text-sm md:text-base text-gray-400">{event.durationHours} Hours of non-stop innovation</p>
                    </ScrollAnimatedSection>

                    <ScrollAnimatedSection className="p-5 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-colors" delay={0.2}>
                        <MapPin className="w-8 h-8 md:w-10 md:h-10 text-blue-400 mb-3 md:mb-4" />
                        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Location</h3>
                        <p className="text-sm md:text-base text-gray-400">{event.location}</p>
                    </ScrollAnimatedSection>

                    <ScrollAnimatedSection className="col-span-2 md:col-span-1 p-5 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-colors" delay={0.4}>
                        <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 mb-3 md:mb-4" />
                        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Prize Pool</h3>
                        <p className="text-sm md:text-base text-gray-400">Total prizes worth significant value</p>
                    </ScrollAnimatedSection>
                </div>

                {/* About & Highlights Split Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
                    {/* About Section (Left) */}
                    <div className="lg:col-span-7">
                        <ScrollAnimatedSection>
                            <h2 className="text-4xl font-bold mb-8 text-white">
                                About The Event
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-400">
                                <p className="text-lg leading-relaxed">{event.longDescription || event.description}</p>
                            </div>
                        </ScrollAnimatedSection>
                    </div>

                    {/* Highlights Section (Right/Card) */}
                    <div className="lg:col-span-5">
                        <ScrollAnimatedSection delay={0.2}>
                            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <Trophy className="w-6 h-6 text-yellow-500" />
                                    <h3 className="text-xl font-bold text-white">Event Highlights</h3>
                                </div>

                                {event.highlights && event.highlights.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {event.highlights.map((highlight, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                                <div className="mt-1 w-5 h-5 rounded-full border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:border-cyan-500 transition-colors">
                                                    <CheckCircle className="w-3 h-3 text-cyan-500" />
                                                </div>
                                                <span className="text-sm text-gray-300 font-medium leading-tight">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">No highlights available.</p>
                                )}
                            </div>
                        </ScrollAnimatedSection>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-8 space-y-20">

                        {event.speakers && event.speakers.length > 0 && (
                            <ScrollAnimatedSection>
                                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    Speakers & Mentors
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {event.speakers.map((speaker, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedSpeaker(speaker)}
                                            className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]"
                                        >
                                            <div className="aspect-square relative overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                    <h3 className="text-sm font-bold text-white leading-tight mb-0.5">{speaker.name}</h3>
                                                    {speaker.role && (
                                                        <p className="text-xs text-blue-400 font-medium truncate">{speaker.role}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Speaker Modal */}
                                {selectedSpeaker && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedSpeaker(null)}>
                                        <div
                                            className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                onClick={() => setSelectedSpeaker(null)}
                                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>

                                            <div className="overflow-y-auto pr-2 custom-scrollbar mt-2">
                                                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                                                    <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-blue-500/30">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={selectedSpeaker.image}
                                                            alt={selectedSpeaker.name}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-2xl font-bold text-white mb-1">{selectedSpeaker.name}</h3>
                                                        {selectedSpeaker.role && (
                                                            <p className="text-blue-400 font-medium text-lg mb-3">{selectedSpeaker.role}</p>
                                                        )}
                                                        {selectedSpeaker.linkedin && (
                                                            <a
                                                                href={selectedSpeaker.linkedin}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 transition-colors text-sm font-semibold"
                                                            >
                                                                <Linkedin className="w-4 h-4" />
                                                                LinkedIn Profile
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                {selectedSpeaker.about && (
                                                    <div className="prose prose-invert prose-sm max-w-none">
                                                        <p className="text-gray-300 leading-relaxed">{selectedSpeaker.about}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ScrollAnimatedSection>
                        )}


                        {/* Domains */}
                        {event.domains && event.domains.length > 0 && (
                            <ScrollAnimatedSection>
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold mb-4 text-white">Hackathon Domains</h2>
                                    <p className="text-gray-400">Select a domain to build your solution.</p>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                                    {event.domains.map((domain, index) => {
                                        const details = DOMAIN_DETAILS[domain] || {
                                            description: "Innovate and build solutions in this domain using cutting-edge AI technologies.",
                                            icon: Target
                                        };
                                        const Icon = details.icon;

                                        return (
                                            <div key={index} className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center text-center">
                                                <div className="w-12 h-12 mb-4 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-300">
                                                    <Icon className="w-6 h-6 text-cyan-400" />
                                                </div>
                                                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{domain}</h3>
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollAnimatedSection>
                        )}

                        {/* Event Structure */}
                        {event.eventStructure && event.eventStructure.length > 0 && (
                            <ScrollAnimatedSection>
                                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    Event Schedule
                                </h2>
                                <div className="space-y-4">
                                    {event.eventStructure.map((phase, index) => (
                                        <div key={index} className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
                                            <div className="md:w-1/4 flex-shrink-0">
                                                <span className="px-3 py-1 rounded-md bg-purple-500/20 text-purple-300 font-mono text-sm font-bold border border-purple-500/30 inline-block">
                                                    {phase.time}
                                                </span>
                                            </div>
                                            <div className="md:w-3/4">
                                                <h3 className="text-xl font-bold mb-2 text-white">{phase.phaseName}</h3>
                                                <p className="text-gray-400 leading-relaxed">{phase.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollAnimatedSection>
                        )}

                        {/* Tracks/Domains */}


                        {/* Hackathon Flow - Timeline */}
                        {event.hackathonFlow && event.hackathonFlow.length > 0 && (
                            <ScrollAnimatedSection>
                                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                                    Event Sandbox Timeline
                                </h2>
                                <div className="relative">
                                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0" />

                                    {event.hackathonFlow.map((item, index) => (
                                        <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                            <div className="hidden md:block w-1/2" />
                                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-purple-500 z-10" />
                                            <div className="flex-1 ml-12 md:ml-0 md:px-12">
                                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all">
                                                    {/* <span className="text-sm font-mono text-purple-400 mb-2 block">{item.time}</span> */}
                                                    <h3 className="text-xl font-bold mb-2">{item.description}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollAnimatedSection>
                        )}

                        {/* Prizes */}
                        {event.prizes && (event.prizes.firstPlace || event.prizes.secondPlace || event.prizes.thirdPlace) && (
                            <ScrollAnimatedSection>
                                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    Prizes
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {event.prizes.secondPlace && (
                                        <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-500/5 to-transparent border border-gray-500/10 text-center flex flex-col items-center justify-center mt-0 md:mt-8 order-2 md:order-1 relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="w-16 h-16 rounded-full bg-gray-500/10 flex items-center justify-center mb-4 border border-gray-500/20">
                                                <span className="text-2xl font-bold text-gray-400">2</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-300 mb-2">Runner Up</h3>
                                            <p className="text-gray-400 text-sm">{event.prizes.secondPlace}</p>
                                        </div>
                                    )}
                                    {event.prizes.firstPlace && (
                                        <div className="p-8 rounded-2xl bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 text-center flex flex-col items-center justify-center order-1 md:order-2 shadow-[0_0_50px_-20px_rgba(234,179,8,0.1)] relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <Trophy className="w-12 h-12 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                                            <h3 className="text-2xl font-bold text-yellow-400 mb-3">Winner</h3>
                                            <p className="text-gray-300 font-medium">{event.prizes.firstPlace}</p>
                                        </div>
                                    )}
                                    {event.prizes.thirdPlace && (
                                        <div className="p-6 rounded-2xl bg-gradient-to-b from-orange-700/5 to-transparent border border-orange-700/10 text-center flex flex-col items-center justify-center mt-0 md:mt-8 order-3 relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="w-16 h-16 rounded-full bg-orange-700/10 flex items-center justify-center mb-4 border border-orange-700/20">
                                                <span className="text-2xl font-bold text-orange-400">3</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-orange-400 mb-2">2nd Runner Up</h3>
                                            <p className="text-gray-400 text-sm">{event.prizes.thirdPlace}</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollAnimatedSection>
                        )}

                        {/* Speakers Section */}


                        {/* Sponsors Section */}
                        {event.sponsors && event.sponsors.length > 0 && (
                            <ScrollAnimatedSection>
                                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-sm">07</span>
                                    Our Sponsors
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {event.sponsors.map((sponsor, index) => (
                                        <div key={index} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all flex items-center justify-center aspect-video relative overflow-hidden hover:bg-white/10">
                                            {sponsor.website ? (
                                                <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={sponsor.image}
                                                        alt={sponsor.name}
                                                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                                    />
                                                </a>
                                            ) : (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img
                                                    src={sponsor.image}
                                                    alt={sponsor.name}
                                                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </ScrollAnimatedSection>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Prizes Widget */}
                        <div className="sticky top-24 space-y-8">


                            {/* Eligibility & Rules */}
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <h3 className="text-xl font-bold mb-6">Participant Deliverables</h3>
                                <ul className="space-y-4 mb-8">
                                    {(event.whatParticipantsWillReceive || []).map((item, i) => (
                                        <li key={i} className="flex gap-3 text-gray-400">
                                            <Gift className="w-5 h-5 text-pink-400 shrink-0" />
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="h-px bg-white/10 my-6" />

                                <h3 className="text-xl font-bold mb-6">Submission Checks</h3>
                                <ul className="space-y-4 mb-8">
                                    {(event.submissionRequirements || []).map((req, i) => (
                                        <li key={i} className="flex gap-3 text-gray-400">
                                            <ScrollText className="w-5 h-5 text-cyan-400 shrink-0" />
                                            <span className="text-sm">{req}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="h-px bg-white/10 my-6" />

                                <h3 className="text-xl font-bold mb-6">Rules & Guidelines</h3>
                                <ul className="space-y-4">
                                    {(event.rulesAndGuidelines || []).slice(0, 5).map((rule, i) => (
                                        <li key={`rule-${i}`} className="flex gap-3 text-gray-400">
                                            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
                                            <span className="text-sm">{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                                {event.rulesAndGuidelines && event.rulesAndGuidelines.length > 5 && (
                                    <div className="mt-4 pt-4 text-center border-t border-white/10">
                                        <span className="text-xs text-gray-500 italic">+ {event.rulesAndGuidelines.length - 5} more rules</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <Footer />
        </div >
    );
}
