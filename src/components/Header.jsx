import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import translate from '@utils/translate';
import Logo from '../animations/logoAnimation';
import BgGradient from '@components/BgGradient';
import { motion } from 'framer-motion';
export default function Header() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full max-w-[1280px] px-4 mx-auto">
      <motion.header
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        viewport={{ once: true }}
        className="header max-w-[1280px] border-b-8 border-primary shadow-[0px_6px_24px_rgba(0,0,0,0.5)] m-4 mt-4 container mx-auto relative z-9998 bg-neutral-50 rounded-4xl p-5 transition-all min-h-[100px] "
      >
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <Link className="block" to="/">
            <Logo />
          </Link>
          <div className="">
            <Link className="hover:underline text-primary" to="/login">
              {translate('key_login')}
            </Link>
            <Link className="hover:underline text-primary" to="/register">
              {translate('key_register')}
            </Link>
          </div>
        </div>
      </motion.header>
    </div>
  );
}
