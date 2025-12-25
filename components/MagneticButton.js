'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className = '', ...props }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const button = ref.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    const button = ref.current;
    if (!button) return;
    button.style.transform = 'translate(0px, 0px)';
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      <motion.span
        className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        initial={false}
      />
    </motion.button>
  );
}

