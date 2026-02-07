"use client";

import React from 'react';

const GrainOverlay = () => {
    return (
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-overlay select-none">
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    transform: 'translateZ(0)', // Force GPU acceleration
                }}
            />
        </div>
    );
};

export default GrainOverlay;
