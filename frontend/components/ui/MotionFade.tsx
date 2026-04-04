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
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}