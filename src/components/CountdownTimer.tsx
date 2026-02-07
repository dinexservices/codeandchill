"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
    targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<{ days?: number; hours?: number; minutes?: number; seconds?: number }>(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval as keyof typeof timeLeft] && timeLeft[interval as keyof typeof timeLeft] !== 0) {
            return null;
        }

        return (
            <div key={interval} className="flex flex-col items-center bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 min-w-[80px] sm:min-w-[100px]">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums">
                    {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider mt-1">
                    {interval}
                </span>
            </div>
        );
    });

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {timerComponents.length ? timerComponents : <span className="text-xl text-white">Event Started!</span>}
        </div>
    );
};

export default CountdownTimer;
