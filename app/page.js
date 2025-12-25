'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/MagneticButton';
import FloatingShape from '../components/FloatingShape';
import AnimatedSection from '../components/AnimatedSection';
import { useTextReveal } from '../hooks/useTextReveal';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const titleRef = useTextReveal({ stagger: 0.03 });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    gsap.to(hero, {
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 100,
      scale: 1.1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-grow">
        <motion.section
          ref={heroRef}
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative h-screen flex items-center justify-center overflow-hidden grain"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 animate-gradient" />
          
          <FloatingShape delay={0} className="top-20 left-10" />
          <FloatingShape delay={1} className="top-40 right-20" />
          <FloatingShape delay={2} className="bottom-20 left-1/4" />
          <FloatingShape delay={1.5} className="bottom-40 right-1/3" />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.h1
              ref={titleRef}
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-gray-800"
            >
              Crafted with Passion
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-4xl text-gray-600 mb-8"
            >
              Timeless Crochet Art
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl space-x-4"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                ❤️
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                ✨
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                🧶
              </motion.span>
            </motion.div>
          </div>
        </motion.section>

        <AnimatedSection className="py-32 bg-white" delay={0.2}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-20"
            >
              Why Choose Our Crochet?
            </motion.h2>

            <div className="space-y-32">
              {[
                {
                  emoji: '❤️',
                  title: 'Made with Love',
                  text: 'Each piece is crafted with care and attention to every detail',
                },
                {
                  emoji: '✨',
                  title: 'Premium Quality',
                  text: 'Using only the finest yarns and materials for lasting beauty',
                },
                {
                  emoji: '🎨',
                  title: 'Custom Orders',
                  text: 'Personalized creations tailored to your specific needs',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-8xl"
                  >
                    {item.emoji}
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3
                      className="text-4xl font-semibold text-gray-800 mb-4 relative inline-block"
                    >
                      {item.title}
                      <motion.span
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-600 to-purple-600"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      />
                    </motion.h3>
                    <p className="text-xl text-gray-600 leading-relaxed mt-6">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-32 bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 relative overflow-hidden" delay={0.4}>
          <div className="absolute inset-0 grain" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight"
            >
              Ready to Add Some<br />Handmade Magic to Your Life?
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mt-12"
            >
              <MagneticButton
                as={Link}
                href="/products"
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                Browse Products
              </MagneticButton>
            </motion.div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
}
