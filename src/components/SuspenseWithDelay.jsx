import { Loader } from '@components/Loader';
import { Suspense, useState, useEffect } from 'react';
const SuspenseWithDelay = ({ children, delay = 500, fallback }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Suspense fallback={showLoader ? fallback : null}>{children}</Suspense>
  );
};

export default SuspenseWithDelay;
