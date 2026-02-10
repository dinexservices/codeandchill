// Migrating existing page content to EventDetailsClient due to rename failure
"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Trophy, Users, CheckCircle, ArrowRight, Target, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { fetchEventBySlug } from '@/store/slices/eventSlice';
// Removed metadata imports as this is now a client component

export default function EventDetailsClient() {
    const params = useParams();
    const slug = params.slug as string;
    const dispatch = useAppDispatch();
    const { event, loading, error } = useAppSelector((state) => state.event);

    useEffect(() => {
        if (slug) {
            dispatch(fetchEventBySlug(slug));
        }
    }, [dispatch, slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-8 backdrop-blur-sm">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                {new Date(event.startDate).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>

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
                    </div>
                </div>
            </div>

            {/* Event Details Grid */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <ScrollAnimatedSection className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                        <Clock className="w-10 h-10 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Duration</h3>
                        <p className="text-gray-400">{event.durationHours} Hours of non-stop innovation</p>
                    </ScrollAnimatedSection>

                    <ScrollAnimatedSection className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-colors" delay={0.2}>
                        <MapPin className="w-10 h-10 text-blue-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Location</h3>
                        <p className="text-gray-400">{event.location}</p>
                    </ScrollAnimatedSection>

                    <ScrollAnimatedSection className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-colors" delay={0.4}>
                        <Trophy className="w-10 h-10 text-yellow-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Prize Pool</h3>
                        <p className="text-gray-400">Total prizes worth significant value</p>
                    </ScrollAnimatedSection>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-8 space-y-20">
                        {/* About Section */}
                        <ScrollAnimatedSection>
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">01</span>
                                About the Event
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300">
                                <p className="text-lg leading-relaxed">{event.description}</p>
                            </div>
                        </ScrollAnimatedSection>

                        {/* Tracks/Domains */}
                        {/* Domains removed - implemented correctly in main content */}

                        {/* Hackathon Flow - Timeline */}
                        {event.hackathonFlow && event.hackathonFlow.length > 0 && (
                            <ScrollAnimatedSection>
                                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm">03</span>
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
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Prizes Widget */}
                        <div className="sticky top-24 space-y-8">
                            {/* Prizes Widget removed - implemented correctly in main content */}

                            {/* Eligibility & Rules */}
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <h3 className="text-xl font-bold mb-6">Eligibility & Rules</h3>
                                <ul className="space-y-4">
                                    {(event.submissionRequirements || []).map((req, i) => (
                                        <li key={i} className="flex gap-3 text-gray-400">
                                            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                    {(event.rulesAndGuidelines || []).map((rule, i) => (
                                        <li key={`rule-${i}`} className="flex gap-3 text-gray-400">
                                            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
