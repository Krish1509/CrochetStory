'use client';

import { motion } from 'framer-motion';

export default function FloatingShape({ delay = 0, className = '' }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-20">
        <path
          d="M50 10 Q90 30 80 70 Q70 90 30 85 Q10 70 20 30 Q30 10 50 10"
          fill="currentColor"
          className="text-pink-500"
        />
      </svg>
    </motion.div>
  );
}

