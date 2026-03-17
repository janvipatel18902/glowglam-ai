'use client';

import { motion } from 'framer-motion';

import { fadeUp } from '@/lib/motion';

type MotionFadeProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
};

export function MotionFade({
    children,
    className,
    delay = 0,
}: MotionFadeProps) {
    return (
        <motion.div
            className={className}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{
                duration: 0.55,
                ease: 'easeOut',
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}