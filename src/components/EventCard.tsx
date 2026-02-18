"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    rating = 4.8,
    link,
}) => {
    return (
        <div className="relative group w-full aspect-3/4 rounded-4xl overflow-hidden isolate shadow-2xl transition-all duration-500 hover:shadow-blue-900/20">

            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10 transition-transform duration-500">

                {/* Title & Description */}
                <div className="mb-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-2 drop-shadow-md">
                        {title}
                    </h3>
                    <p className="text-gray-200 text-sm font-light leading-relaxed line-clamp-3 drop-shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                        {description}
                    </p>
                </div>

                {/* Badges Row */}
                <div className="flex items-center gap-3 mb-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {/* Date Badge */}
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium shadow-lg">
                        {date}
                    </div>

                    {/* Time Badge */}
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium shadow-lg">
                        {time}
                    </div>
                </div>

                {/* Action Button */}
                <Link href={link || `/events/${id}`} className="block w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <button className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-100 active:scale-[0.98] transition-all shadow-xl hover:shadow-white/20 text-sm">
                        Reserve now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
