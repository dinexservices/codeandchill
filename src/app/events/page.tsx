"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { events } from '@/data/events';
import CountdownTimer from '@/components/CountdownTimer';
import { Calendar, Clock, Sparkles } from 'lucide-react';

const EventsPage = () => {
    // Determine the next big event target date
    const targetEventDate = "2024-12-31T00:00:00";

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-900 selection:text-white">
            <Navbar />

            {/* Hero Section with Timer */}
            <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black z-0" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
                    {/* Abstract glow effects */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm text-cyan-400 text-sm font-medium mb-4 animate-fade-in-up">
                        <Clock className="w-4 h-4" />
                        <span>Next Event Starts In</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-sm animate-fade-in-up delay-100">
                        Upcoming Tech Events
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 animate-fade-in-up delay-200">
                        Join the community of innovators. Participate in hackathons, workshops, and tech talks.
                    </p>

                    <div className="animate-fade-in-up delay-300">
                        <CountdownTimer targetDate={targetEventDate} />
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-cyan-500" />
                        All Events
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EventsPage;

