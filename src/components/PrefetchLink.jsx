import { Link } from 'react-router-dom';
import { routes } from '../App';
const preloadPage = (importFunc, path) => {
  if (typeof importFunc !== 'function') return;
  if (!window.preloadedPages) {
    window.preloadedPages = {};
  }
  if (!window.preloadedPages[path] && typeof path !== 'undefined') {
    importFunc();
    window.preloadedPages[path] = true;
  }
};
export default function PrefetchLink({ to, children, ...props }) {
  const route = routes.find((r) => r.path === to);
  const importFunc = route?.importFunc;

  const handlePrefetch = () => {
    if (importFunc) {
      setTimeout(() => {
        preloadPage(importFunc, to);
      }, 200);
    }
  };

  return (
    <Link
      to={to}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      onTouchStart={handlePrefetch}
      {...props}
    >
      {children}
    </Link>
  );
}
