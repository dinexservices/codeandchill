"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Calendar, MapPin } from 'lucide-react';
import { events } from '@/data/events';

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        }, 5000); // Auto-advance every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto mt-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {events.map((event) => (
                    <div key={event.id} className="w-full flex-shrink-0 grid md:grid-cols-2">
                        <div className={`h-64 md:h-96 bg-gradient-to-br ${event.image} p-8 md:p-12 flex flex-col justify-end text-white relative overflow-hidden`}>
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3 border border-white/20">
                                    Featured Event
                                </span>
                                <h2 className="text-3xl md:text-5xl font-bold mb-2">{event.title}</h2>
                            </div>
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{event.title}</h3>
                            <p className="text-slate-600 mb-8 text-lg leading-relaxed">{event.description}</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-${event.color}-50 text-${event.color}-600`}>
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm">
                                        <div className="text-slate-500">Date</div>
                                        <div className="font-semibold text-slate-900">{event.date}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-${event.color}-50 text-${event.color}-600`}>
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm">
                                        <div className="text-slate-500">Time</div>
                                        <div className="font-semibold text-slate-900">{event.time}</div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/events/code-and-chill"
                                className={`inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-${event.color}-500/20`}
                            >
                                Register Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-lg backdrop-blur-sm transition-all hover:scale-110"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-lg backdrop-blur-sm transition-all hover:scale-110"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {events.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-slate-900' : 'bg-slate-300 hover:bg-slate-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
