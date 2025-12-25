'use client';

import { useSmoothScroll } from '../hooks/useSmoothScroll';

export default function SmoothScrollProvider({ children }) {
  useSmoothScroll();
  return <>{children}</>;
}

