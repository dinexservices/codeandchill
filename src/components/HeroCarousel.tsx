"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchAllEvents } from '@/store/slices/eventSlice';

const HeroCarousel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { events, loading } = useSelector((state: RootState) => state.event);

    useEffect(() => {
        dispatch(fetchAllEvents());
    }, [dispatch]);

    // Determine baseline timestamp bounded strictly to the start of today
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    // Use fetched events for the carousel
    // Filter out past events, then take first 5
    const activeEvents = events
        .filter(evt => new Date(evt.startDate).getTime() >= todayStart)
        .slice(0, 5)
        .map(evt => ({
            ...evt,
            image: evt.imageUrl || '/images/default-event.jpg', // Fallback image
            shortDescription: evt.description ? evt.description.slice(0, 150) + '...' : 'Join us for this amazing event!',
        link: evt.slug ? `/events/${evt.slug}` : `/events/${evt.id}`,
        location: evt.venue,
        color: ['cyan', 'blue', 'purple', 'emerald', 'amber'][Math.floor(Math.random() * 5)] // Random color for theme
    }));

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % activeEvents.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + activeEvents.length) % activeEvents.length);
    };

    useEffect(() => {
        if (activeEvents.length <= 1) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [activeEvents.length]);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Skeleton Loading State
    if (!mounted || loading) {
        return (
            <div className="relative h-screen w-full overflow-hidden bg-black">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-pulse" />
                <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl mx-auto space-y-8 w-full">
                        <div className="h-8 w-32 bg-white/10 rounded-full mx-auto animate-pulse" />
                        <div className="h-24 w-3/4 bg-white/10 rounded-lg mx-auto animate-pulse" />
                        <div className="h-20 w-1/2 bg-white/10 rounded-lg mx-auto animate-pulse" />
                        <div className="flex justify-center gap-4 pt-8">
                            <div className="h-14 w-48 bg-white/10 rounded-full animate-pulse" />
                            <div className="h-14 w-48 bg-white/10 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Empty State
    if (!loading && activeEvents.length === 0) {
        return (
            <div className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Something Amazing is Coming Soon</h1>
                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">We're crafting new experiences for you. Stay tuned for upcoming events tailored just for you.</p>
                    <Link href="/events" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/20">
                        View All Events
                    </Link>
                </div>
            </div>
        );
    }

    const event = activeEvents[currentIndex];

    return (
        <div className="relative h-screen w-full overflow-hidden bg-transparent">
            {/* Background Image / Gradient */}
            <div className="absolute inset-0">
                {event.image.startsWith('http') || event.image.startsWith('/') ? (
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.image} z-0`} />
                )}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
                <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay for text readability */}
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center justify-center text-center px-10 sm:px-12 lg:px-8">
                <div className="max-w-5xl mx-auto space-y-4 sm:space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className={`inline-block px-4 py-1.5 bg-${event.color}-500/20 border border-${event.color}-400/30 text-${event.color}-300 rounded-full text-xs sm:text-sm font-semibold`}>
                            {event.date}
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {event.title}
                    </motion.h1>

                    <motion.p
                        className="text-sm sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed line-clamp-3 sm:line-clamp-none"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {event.shortDescription}
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Link
                            href={event.link}
                            className={`px-6 sm:px-8 py-3 sm:py-4 bg-${event.color}-500 text-white font-bold rounded-full hover:bg-${event.color}-400 transition-colors shadow-lg shadow-${event.color}-500/25 w-full sm:min-w-[200px] sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base`}
                        >
                            Register Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                        <Link
                            href={event.link}
                            className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-colors w-full sm:min-w-[200px] sm:w-auto text-sm sm:text-base"
                        >
                            Learn More
                        </Link>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 pt-2 sm:pt-8 text-slate-400 text-xs sm:text-base"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                            <span>{event.date}</span>
                        </div>
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-600" />
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                            <span className="truncate max-w-[160px] sm:max-w-none">{event.location}</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Navigation Controls (Only if > 1 event) */}
            {activeEvents.length > 1 && (
                <>
                    {/* On mobile: arrows at bottom corners; on sm+: vertically centered */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                        {activeEvents.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? `bg-${event.color}-500 w-6 sm:w-8`
                                        : 'w-2 sm:w-3 bg-white/30 hover:bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default HeroCarousel;
