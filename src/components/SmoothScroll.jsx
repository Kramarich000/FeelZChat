import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
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

    lenisRef.current = lenis;

    const raf = (time) => {
      if (lenisRef.current?.isStopped) return;
      try {
        lenisRef.current.raf(time);
      } catch (e) {
        console.error('Lenis error', e);
      }
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    const handleIframeMouseEnter = () => {
      lenis.stop();
    };

    const handleIframeMouseLeave = () => {
      lenis.start();
    };

    const observeIframes = () => {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        iframe.addEventListener('mouseenter', handleIframeMouseEnter);
        iframe.addEventListener('mouseleave', handleIframeMouseLeave);
      });
      return iframes;
    };

    let iframes = observeIframes();

    const observer = new MutationObserver(() => {
      iframes = observeIframes();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      iframes.forEach((iframe) => {
        iframe.removeEventListener('mouseenter', handleIframeMouseEnter);
        iframe.removeEventListener('mouseleave', handleIframeMouseLeave);
      });
      lenisRef.current = null;
    };
  }, []);

  return <div>{children}</div>;
};

export default SmoothScroll;
