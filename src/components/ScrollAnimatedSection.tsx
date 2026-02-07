"use client";

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const ScrollAnimatedSection = ({
    children,
    className = "",
    delay = 0,
    direction = 'up'
}: ScrollAnimatedSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
            x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
            scale: direction === 'none' ? 0.95 : 1
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeInOut",
                delay: delay
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimatedSection;
