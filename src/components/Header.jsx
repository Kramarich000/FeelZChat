import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import translate from '@utils/translate';
import Logo from '../animations/logoAnimation';

export default function Header() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  return (
    <header
      className={`header container mx-auto bg-amber-50 min-w-[100%] p-5 transition-all min-h-[100px] ${
        isLoaded ? 'loaded' : ''
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <Link className="block" to="/">
          <Logo />
        </Link>
        <div className="">
          <Link className="hover:underline text-cyan-700" to="/login">
            {translate('key_login')}
          </Link>
          <Link className="hover:underline text-cyan-700" to="/register">
            {translate('key_register')}
          </Link>
        </div>
      </div>
    </header>
  );
}
