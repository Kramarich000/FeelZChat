import './App.css';
import { lazy, Suspense, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import FallbackComponent from '@components/FallbackComponent';
import PrivateRoute from '@components/PrivateRoute';
import withTitle from '@components/Title';
// import MusicComponent from '@components/MusicComponent';
import { Loader } from '@components/Loader';

import translate from '@utils/translate';
import SpotifyPlayer from '@components/SpotifyPlayer';

// import { useSmoothScrollbar } from '@hooks/useSmoothScroll';
// const registerServiceWorker = () => {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then((registration) => {
//         console.log(
//           'Service Worker зарегистрирован с областью:',
//           registration.scope,
//         );
//       })
//       .catch((error) => {
//         console.log('Ошибка при регистрации Service Worker:', error);
//       });
//   }
// };

const Register = lazy(() => import('@pages/Register'));
const Login = lazy(() => import('@pages/Login'));
const Chat = lazy(() => import('@pages/Chat'));
const Privacy = lazy(() => import('@pages/Privacy'));
const Help = lazy(() => import('@pages/Help'));
const Home = lazy(() => import('@pages/Home'));
const Profile = lazy(() => import('@pages/Profile'));
const ForgotPassword = lazy(() => import('@pages/ForgotPassword'));
const Error404 = lazy(() => import('@errors/404'));

const Page = ({ component: Component, title }) => {
  const TranslatedComponent = useMemo(() => {
    return withTitle(Component, translate(title));
  }, [Component, title]);

  return <TranslatedComponent />;
};

// const requestPermissionForPushNotifications = () => {
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Разрешение на пуш-уведомления получено");

//       getToken(messaging, {
//         vapidKey: "BMwGXTe80IcVoOJ4b2WHJX9bIDezkBFgjzjB2c1m51NldzPmxwaEVO80TPcG1wqmwExIEjAHi7I9B2_-ysCNCRY",
//       })
//         .then((currentToken) => {
//           if (currentToken) {
//             console.log("FCM Token:", currentToken);
//           } else {
//             console.log("Не удалось получить токен");
//           }
//         })
//         .catch((err) => {
//           console.log("Ошибка при получении токена:", err);
//         });
//     } else {
//       console.log("Разрешение на уведомления отклонено");
//     }
//   });
// };

const routes = [
  {
    path: '/register',
    component: Register,
    titleKey: 'key_register_1',
    importFunc: () => import('@pages/Register'),
  },
  {
    path: '/login',
    component: Login,
    titleKey: 'key_login_1',
    importFunc: () => import('@pages/Login'),
  },
  {
    path: '/chat',
    component: Chat,
    titleKey: 'key_chat',
    importFunc: () => import('@pages/Chat'),
  },
  {
    path: '/privacy',
    component: Privacy,
    titleKey: 'key_privacy',
    importFunc: () => import('@pages/Privacy'),
  },
  {
    path: '/help',
    component: Help,
    titleKey: 'key_help',
    importFunc: () => import('@pages/Help'),
  },
  {
    path: '/',
    component: Home,
    titleKey: 'key_home',
    importFunc: () => import('@pages/Home'),
  },
  {
    path: '/profile',
    component: Profile,
    titleKey: 'key_profile_1',
    private: true,
    importFunc: () => import('@pages/Profile'),
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    titleKey: 'key_reset_password',
    importFunc: () => import('@pages/ForgotPassword'),
  },
  {
    path: '*',
    component: Error404,
    titleKey: 'key_error',
    importFunc: () => import('@errors/404'),
  },
];

const preloadPage = (importFunc, path) => {
  if (typeof importFunc === 'function' && !window.preloadedPages) {
    window.preloadedPages = {};
  }
  if (!window.preloadedPages[path]) {
    importFunc();
    window.preloadedPages[path] = true;
  }
};

function App() {
  // useEffect(() => {
  // registerServiceWorker();
  // requestPermissionForPushNotifications();
  // }, []);
  // useSmoothScrollbar({ smoothing: 0.1 });
  const metaTitle = translate('key_meta_title');
  const metaDesc = translate('key_meta_description');
  const baseUrl = 'https://messenger-app-movb.onrender.com';
  return (
    <HelmetProvider>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />

        <link rel="canonical" href={baseUrl} />
        <link rel="alternate" hrefLang="ru" href={`${baseUrl}/`} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/`} />

        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:image" content="/images/FZ.webp" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content="/images/FZ.webp" />

        <meta name="theme-color" content="#0E7490" />
      </Helmet>
      <Router>
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <Suspense fallback={<Loader fullScreen />}>
            <main className="container mx-auto">
              <AnimatePresence mode="wait">
                <Routes>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <div onMouseEnter={() => preloadPage(route.importFunc)}>
                          {route.private ? (
                            <PrivateRoute>
                              <Page
                                component={route.component}
                                title={route.titleKey}
                              />
                            </PrivateRoute>
                          ) : (
                            <Page
                              component={route.component}
                              title={route.titleKey}
                            />
                          )}
                        </div>
                      }
                    />
                  ))}
                </Routes>
              </AnimatePresence>
            </main>
            {/* <MusicComponent /> */}
            <SpotifyPlayer />
          </Suspense>
        </ErrorBoundary>
        <ToastContainer newestOnTop limit={10} />
      </Router>
    </HelmetProvider>
  );
}

export default App;
