"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAllEvents } from '@/store/slices/eventSlice';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';

const UpcomingEvents = () => {
    const dispatch = useAppDispatch();
    const { events, loading, error } = useAppSelector((state) => state.event);

    React.useEffect(() => {
        dispatch(fetchAllEvents());
    }, [dispatch]);

    // displayed events (filter for future events if needed, or just show all)
    // For now, let's just show all fetched events
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
                    {loading && (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="w-full">
                                <EventCardSkeleton />
                            </div>
                        ))
                    )}

                    {error && (
                        <div className="col-span-full text-center text-red-400 py-10">
                            Failed to load events. Please try again later.
                        </div>
                    )}

                    {!loading && !error && displayEvents.length === 0 && (
                        <div className="col-span-full text-center text-slate-500 py-10">
                            No upcoming events at the moment.
                        </div>
                    )}

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
                                image={event.imageUrl} // Ensure correct prop mapping
                                time={new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                location={event.venue}
                                link={event.slug ? `/events/${event.slug}` : `/events/${event.id}`}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
