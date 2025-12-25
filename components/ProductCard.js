'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      <div className="relative h-80 bg-gray-50 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            </AnimatePresence>

            {product.images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 glass rounded-full p-3 transition-all duration-300 z-10 shadow-lg"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 glass rounded-full p-3 transition-all duration-300 z-10 shadow-lg"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white w-6 shadow-lg' : 'bg-white/60 w-2'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.3 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-50">
            <div className="text-center">
              <div className="text-4xl mb-2">🧶</div>
              <p className="text-sm">No image</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-white">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">{product.name}</h3>
        <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            ₹{product.price}
          </span>
          <Link
            href={`/products?product=${product._id}`}
            className="relative overflow-hidden group/btn bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50 hover:scale-105"
          >
            <span className="relative z-10">Explore Now</span>
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
