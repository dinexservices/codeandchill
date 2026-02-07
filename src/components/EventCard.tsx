import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Event } from '@/data/events';

const EventCard = ({ event }: { event: Event }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
            <div className={`h-48 bg-gradient-to-br ${event.image} p-6 flex items-end relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-2xl font-bold text-white relative z-10">{event.title}</h3>
            </div>
            <div className="p-6">
                <p className="text-slate-600 mb-6 line-clamp-2">{event.description}</p>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        <Calendar className="w-4 h-4 text-cyan-600" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        <MapPin className="w-4 h-4 text-cyan-600" />
                        <span>{event.location}</span>
                    </div>
                </div>

                <Link
                    href={event.link}
                    className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:gap-3 transition-all"
                >
                    View Details <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
