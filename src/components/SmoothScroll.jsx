import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = () => {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`,
      );
    };
    setVh();
    window.addEventListener('resize', setVh);

    const lenis = new Lenis({
      duration: 1,
      easing: (t) => t * (2 - t),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1,
      inertia: 0.01,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('resize', setVh);
      lenis.destroy();
    };
  }, []);
};

export default SmoothScroll;
