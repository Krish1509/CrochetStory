'use client';

import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useTextReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const text = new SplitType(ref.current, { types: 'words,chars' });
    const chars = text.chars;

    if (!chars) return;

    gsap.set(chars, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: options.stagger || 0.02,
    });

    return () => {
      if (text) text.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

