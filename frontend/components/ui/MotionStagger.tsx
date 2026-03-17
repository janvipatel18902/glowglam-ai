'use client';

import { motion } from 'framer-motion';

import { staggerContainer } from '@/lib/motion';

type MotionStaggerProps = {
    children: React.ReactNode;
    className?: string;
};

export function MotionStagger({
    children,
    className,
}: MotionStaggerProps) {
    return (
        <motion.div
            className={className}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            {children}
        </motion.div>
    );
}