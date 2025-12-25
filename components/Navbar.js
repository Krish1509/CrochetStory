'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              CrochetStory
            </Link>
          </motion.div>
          <div className="flex space-x-8">
            {['Home', 'Products'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              >
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-pink-600 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
