"use client";

import React from 'react';

interface MarqueeProps {
    items: string[];
    speed?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ items, speed = 30 }) => {
    return (
        <div className="w-full overflow-hidden bg-blue-950/20 backdrop-blur-sm py-4 border-y border-blue-800/50">
            <div className="flex gap-8">
                {/* Duplicate items for seamless loop */}
                <div
                    className="flex gap-8 animate-marquee whitespace-nowrap"
                    style={{
                        animation: `marquee ${speed}s linear infinite`
                    }}
                >
                    {[...items, ...items].map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 text-white font-bold text-lg"
                        >
                            <span className="text-2xl">✦</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Marquee;
