import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => t * (2 - t),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1,
      inertia: 0.01,
    });

    lenisRef.current = lenis;

    let rafId;

    const handleRaf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(handleRaf);
    };

    rafId = requestAnimationFrame(handleRaf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
    };
  }, []);

  return <div>{children}</div>;
};

export default SmoothScroll;
