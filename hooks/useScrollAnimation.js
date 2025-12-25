'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const {
      delay = 0,
      duration = 1,
      y = 50,
      opacity = 0,
      scale = 1,
      blur = 10,
    } = options;

    gsap.fromTo(
      element,
      {
        y,
        opacity,
        scale,
        filter: `blur(${blur}px)`,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return { ref, isInView };
}

