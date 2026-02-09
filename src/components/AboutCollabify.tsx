import React from 'react';
import { Network, Handshake, Users } from 'lucide-react';
import { Rocket } from 'lucide-react';
import Link from 'next/link';

const AboutCollabify = () => {
    return (
        <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:border-purple-500/30 hover:scale-[1.02] h-full flex flex-col items-center text-center">

            {/* Logo */}
            <div className="h-24 w-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                    src="/collab3.png"
                    alt="Collabify"
                    className="h-full w-auto object-contain relative z-10"
                />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-4">
                <Rocket className="w-3 h-3" />
                <span>Innovation Platform</span>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-white mb-3">
                Collabify <span className="text-purple-400">Growth</span>
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4">
we create a collaborative innovation ecosystem that connects students, founders, professionals, and mentors. We aim to foster meaningful networking, skill development, and strategic collaborations. Through our platform, we empower individuals and communities to transform ideas into scalable ventures and impactful career opportunities.            </p>

            <Link href="https://collabify.sbs" className="mt-auto px-6 py-2 bg-transparent border border-purple-500/50 text-purple-400 rounded-full text-sm font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300">
                Explore Platform
            </Link>
        </div>
    );
};

export default AboutCollabify;
