"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
// import { events } from '@/data/events'; // Removed mock data
import CountdownTimer from '@/components/CountdownTimer';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchAllEvents } from '@/store/slices/eventSlice';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Events",
    description: "Browse upcoming coding events, hackathons, and workshops. Register now to participate.",
};

const EventsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { events, loading, error } = useSelector((state: RootState) => state.event);

    useEffect(() => {
        dispatch(fetchAllEvents());
    }, [dispatch]);

    // Determine the next big event target date
    const targetEventDate = "2024-12-31T00:00:00";
    // You could also dynamically set this from the fetched events if needed

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white">
            <Navbar />

            <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-linear-to-b from-blue-900/20 via-black to-black z-0" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
                    {/* Abstract glow effects */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-800/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 backdrop-blur-sm text-blue-300 text-sm font-medium mb-4 animate-fade-in-up">
                        <Clock className="w-4 h-4" />
                        <span>Next Event Starts In</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 drop-shadow-sm animate-fade-in-up delay-100">
                        Upcoming Tech Events
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in-up delay-200">
                        Join the community of innovators. Participate in hackathons, workshops, and tech talks.
                    </p>

                    <div className="animate-fade-in-up delay-300">
                        <CountdownTimer targetDate={targetEventDate} />
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-blue-500" />
                        All Events
                    </h2>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 py-10">
                        Failed to load events: {error}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                {...event}
                                image={event.imageUrl} // Map imageUrl to image prop expected by EventCard
                                time={new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                location={event.venue}
                                link={event.slug ? `/events/${event.slug}` : `/events/${event.id}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div >
    );
};

export default EventsPage;

