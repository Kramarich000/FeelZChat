import { SafeMotion } from '@components/SafeMotion';
import translate from '@utils/translate';
import Logo from '../animations/logoAnimation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PrefetchLink from '@components/PrefetchLink';
import { useMediaQuery } from '@hooks/useMediaQuery';

export default function Header() {
  const isMobile = useMediaQuery('(max-width: 639px)');
  return (
    <header className="w-full max-w-[1280px] px-4 mx-auto">
      {isMobile ? (
        <div
          transition={{ duration: 0.3 }}
          className="w-full max-w-[1280px] px-0 sm:px-4 mx-auto m-4 mt-4 container z-9998"
        >
          <div className="rounded-4xl border-b-8 border-primary shadow-md bg-white p-5 min-h-[100px] flex justify-between items-center">
            <PrefetchLink to="/" aria-label="Go to main page">
              <Logo />
            </PrefetchLink>
            <div className="flex gap-1 mr-2 text-primary text-sm sm:text-base">
              <PrefetchLink className="hover:underline" to="/login">
                {translate('key_login')}
              </PrefetchLink>
              <span>/</span>
              <PrefetchLink className="hover:underline" to="/register">
                {translate('key_register')}
              </PrefetchLink>
            </div>
          </div>
        </div>
      ) : (
        <SafeMotion
          initial={{ transform: 'translateY(-150%)' }}
          animate={{ transform: 'translateY(0)' }}
          viewport={{ once: true }}
          className="
          max-w-[1280px]
          relative
          border-b-8 border-primary
          shadow-[0px_6px_24px_rgba(0,0,0,0.5)]
          m-4 mt-4 container mx-auto z-9998
          bg-white overflow-hidden
          rounded-4xl p-5 min-h-[100px]
          transition-all 
          group
        "
        >
          <div className="max-w-[1280px] mx-auto flex justify-between items-center relative overflow-hidden">
            <PrefetchLink
              className="block order-0"
              to="/"
              aria-label="Go to main page"
            >
              <Logo />
            </PrefetchLink>
            <div className="order-2 flex gap-1 mr-2">
              <SafeMotion transition={{ type: 'tween' }}>
                <PrefetchLink
                  className="hover:underline text-[14px] sm:text-[16px] hover:text-shadow-[0px_0px_1px_#0E7490] text-primary"
                  to="/login"
                >
                  {translate('key_login')}
                </PrefetchLink>
              </SafeMotion>
              <span className="text-primary">/</span>
              <SafeMotion transition={{ type: 'tween' }}>
                <PrefetchLink
                  className="hover:underline text-[14px] sm:text-[16px] hover:text-shadow-[0px_0px_1px_#0E7490] text-primary"
                  to="/register"
                >
                  {translate('key_register')}
                </PrefetchLink>
              </SafeMotion>
            </div>
          </div>
        </SafeMotion>
      )}
    </header>
  );
}
