"use client";

import React from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { events } from '@/data/events';

const UpcomingEvents = () => {
    // displayed events (slice if you want to show only a few, or show all)
    const displayEvents = events;


    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10 w-full">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent inline-block">
                            Upcoming Events
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            Join us for exciting events that bring together innovators, developers, and tech enthusiasts.
                        </p>
                    </motion.div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                    {displayEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <EventCard
                                {...event}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
