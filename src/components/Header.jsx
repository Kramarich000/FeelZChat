import { Link } from 'react-router-dom';
import { SafeMotion } from '@components/SafeMotion';
import translate from '@utils/translate';
import Logo from '../animations/logoAnimation';
import { motion } from 'framer-motion';
import { useState } from 'react';
export default function Header() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <header
      className="w-full max-w-[1280px] px-4 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
          <Link className="block order-0" to="/" aria-label="Go to main page">
            <Logo />
          </Link>
          <div className="order-2 flex gap-1 mr-2">
            <motion.div transition={{ type: 'tween' }}>
              <Link
                className="hover:underline hover:text-shadow-[0px_0px_1px_#0E7490] text-primary"
                to="/login"
              >
                {translate('key_login')}
              </Link>
            </motion.div>
            <span className="text-primary">/</span>
            <motion.div transition={{ type: 'tween' }}>
              <Link
                className="hover:underline hover:text-shadow-[0px_0px_1px_#0E7490] text-primary"
                to="/register"
              >
                {translate('key_register')}
              </Link>
            </motion.div>
          </div>
        </div>
      </SafeMotion>
    </header>
  );
}
