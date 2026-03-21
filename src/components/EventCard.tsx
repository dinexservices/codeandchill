"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventCardProps {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
    price?: string;
    rating?: number;
    link?: string;
}

const EventCard: React.FC<EventCardProps> = ({
    id,
    title,
    description,
    date,
    time,
    location,
    image,
    price,
    link,
}) => {
    return (
        <div className="group w-full rounded-2xl overflow-hidden bg-[#0a0f1e] border border-white/8 hover:border-blue-500/30 shadow-xl hover:shadow-blue-900/20 transition-all duration-500 flex flex-col">

            {/* ── 16:9 Poster ── */}
            <div className="relative w-full aspect-video overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/20 to-black flex items-center justify-center">
                        <span className="text-white/20 text-6xl font-black select-none">{title.charAt(0)}</span>
                    </div>
                )}
                {/* Subtle bottom fade into card body */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent opacity-60" />

                {/* Price chip */}
                {price && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {price === 'Free' ? 'Free' : `₹${price}`}
                    </div>
                )}
            </div>

            {/* ── Card Body ── */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {description}
                </p>

                {/* Meta info */}
                <div className="flex flex-col gap-1.5 mb-5 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{date}</span>
                        <span className="text-gray-700">·</span>
                        <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{time}</span>
                    </div>
                    {location && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span className="truncate">{location}</span>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <Link href={link || `/events/${id}`} className="block w-full">
                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl active:scale-[0.98] transition-all text-sm shadow-lg hover:shadow-blue-500/30">
                        View Event →
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
