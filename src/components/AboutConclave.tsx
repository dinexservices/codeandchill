import React from 'react';
import { Mic2, Users, Zap, Sparkles, Video } from 'lucide-react';

const AboutConclave = () => {
    return (
        <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:border-amber-500/30 hover:scale-[1.02] h-full flex flex-col items-center text-center">

            {/* Logo */}
            <div className="h-24 w-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                    src="/conclave.png"
                    alt="Conclave TechMedia Group"
                    className="h-full w-auto object-contain relative z-10"
                />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
                <Sparkles className="w-3 h-3" />
                <span>Premium Events</span>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-white mb-3">
                Conclave TechMedia <span className="text-amber-400">Group</span>
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4">
                We specialize in organizing premium boardrooms and conferences, designed to elevate your business interactions. From conceptualization to flawless delivery, we transform corporate gatherings into remarkable experiences.
            </p>

            <button className="mt-auto px-6 py-2 bg-transparent border border-amber-500/50 text-amber-400 rounded-full text-sm font-semibold hover:bg-amber-500 hover:text-white transition-all duration-300">
                Learn More
            </button>
        </div>
    );
};

export default AboutConclave;
