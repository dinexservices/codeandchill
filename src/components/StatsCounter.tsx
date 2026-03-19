"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 5000, suffix: "+", label: "Registered Participants", color: "text-blue-400" },
  { value: 50,   suffix: "+", label: "Events Hosted",           color: "text-cyan-400" },
  { value: 120,  suffix: "+", label: "Partner Companies",       color: "text-purple-400" },
  { value: 30,   suffix: "+", label: "Cities Reached",          color: "text-emerald-400" },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const StatItem = ({
  value,
  suffix,
  label,
  color,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  color: string;
  start: boolean;
}) => {
  const count = useCountUp(value, 2, start);
  return (
    <div className="flex flex-col items-center text-center p-6">
      <span className={`text-5xl md:text-6xl font-black ${color} leading-none mb-2`}>
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-slate-400 text-sm font-medium uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
};

const StatsCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          {/* Decorative gradient line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
            {stats.map((stat, i) => (
              <StatItem key={stat.label} {...stat} start={inView} />
            ))}
          </div>

          {/* Decorative gradient line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500" />
        </motion.div>
      </div>
    </section>
  );
};

export default StatsCounter;
