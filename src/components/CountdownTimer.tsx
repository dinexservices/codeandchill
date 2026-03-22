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
            <div key={interval} className="flex flex-col items-center bg-black/50 backdrop-blur-sm border border-blue-900/50 rounded-xl p-2.5 sm:p-4">
                <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums">
                    {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-sm text-slate-400 uppercase tracking-wider mt-1">
                    {interval}
                </span>
            </div>
        );
    });

    return (
        <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xs sm:max-w-sm mx-auto">
            {timerComponents.length ? timerComponents : <span className="col-span-4 text-xl text-white text-center">Event Started!</span>}
        </div>
    );
};

export default CountdownTimer;
