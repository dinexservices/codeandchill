import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Event } from '@/data/events';

const EventCard = ({ event }: { event: Event }) => {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group">
            <div className={`h-48 bg-linear-to-br ${event.image} p-6 flex items-end relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-2xl font-bold text-white relative z-10">{event.title}</h3>
            </div>
            <div className="p-6">
                <p className="text-slate-300 mb-6 line-clamp-2">{event.description}</p>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span>{event.location}</span>
                    </div>
                </div>

                <Link
                    href={event.link}
                    className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:gap-3 transition-all hover:text-cyan-300"
                >
                    View Details <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
