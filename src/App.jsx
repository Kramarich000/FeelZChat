import "./App.css";
import { lazy, useMemo, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FallbackComponent from "@components/FallbackComponent";
import PrivateRoute from "@components/PrivateRoute";
import translate from "@utils/translate";
import SpotifyPlayer from "@components/SpotifyPlayer";
import withMetaTags from "@metadata/Meta";
import Header from "@components/Header";

const Register = lazy(() => import("@pages/Register"));
const Login = lazy(() => import("@pages/Login"));
const Chat = lazy(() => import("@pages/Chat"));
const Privacy = lazy(() => import("@pages/Privacy"));
const Help = lazy(() => import("@pages/Help"));
const Home = lazy(() => import("@pages/Home"));
const Profile = lazy(() => import("@pages/Profile"));
const ForgotPassword = lazy(() => import("@pages/ForgotPassword"));
const Error404 = lazy(() => import("@errors/404"));

const Page = ({ component: Component, title, description, url, locale }) => {
  const TranslatedComponent = useMemo(() => {
    return withMetaTags(Component, {
      title: translate(title),
      description: translate(description),
      url,
      locale: translate(locale),
    });
  }, [Component, title, description, url, locale]);

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
    path: "/register",
    component: Register,
    titleKey: "key_register_1",
    descriptionKey: "key_register_description",
    url: "https://messenger-app-movb.onrender.com/register",
    importFunc: () => import("@pages/Register"),
    locale: "key_page_locale",
  },
  {
    path: "/login",
    component: Login,
    titleKey: "key_login_1",
    descriptionKey: "key_login_description",
    url: "https://messenger-app-movb.onrender.com/login",
    importFunc: () => import("@pages/Login"),
    locale: "key_page_locale",
  },
  {
    path: "/chat",
    component: Chat,
    titleKey: "key_chat",
    descriptionKey: "key_chat_description",
    url: "https://messenger-app-movb.onrender.com/chat",
    importFunc: () => import("@pages/Chat"),
    locale: "key_page_locale",
  },
  {
    path: "/privacy",
    component: Privacy,
    titleKey: "key_privacy",
    descriptionKey: "key_privacy_description",
    url: "https://messenger-app-movb.onrender.com/privacy",
    importFunc: () => import("@pages/Privacy"),
    locale: "key_page_locale",
  },
  {
    path: "/help",
    component: Help,
    titleKey: "key_help",
    descriptionKey: "key_help_description",
    url: "https://messenger-app-movb.onrender.com/help",
    importFunc: () => import("@pages/Help"),
    locale: "key_page_locale",
  },
  {
    path: "/",
    component: Home,
    titleKey: "key_home",
    descriptionKey: "key_home_description",
    url: "https://messenger-app-movb.onrender.com",
    importFunc: () => import("@pages/Home"),
    locale: "key_page_locale",
  },
  {
    path: "/profile",
    component: Profile,
    titleKey: "key_profile_1",
    descriptionKey: "key_profile_description",
    url: "https://messenger-app-movb.onrender.com/profile",
    private: true,
    importFunc: () => import("@pages/Profile"),
    locale: "key_page_locale",
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    titleKey: "key_reset_password",
    descriptionKey: "key_reset-password_description",
    url: "https://messenger-app-movb.onrender.com/forgot-password",
    importFunc: () => import("@pages/ForgotPassword"),
    locale: "key_page_locale",
  },
  {
    path: "*",
    component: Error404,
    titleKey: "key_error",
    descriptionKey: "key_error_description",
    url: "https://messenger-app-movb.onrender.com/*",
    importFunc: () => import("@errors/404"),
    locale: "key_page_locale",
  },
];

function App() {
  useEffect(() => {
    // requestPermissionForPushNotifications();
  }, []);
  return (
    <Router>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.private ? (
                      <PrivateRoute>
                        <Page
                          component={route.component}
                          title={route.titleKey}
                          description={route.descriptionKey}
                          url={route.url}
                          locale={route.locale}
                        />
                      </PrivateRoute>
                    ) : (
                      <Page
                        component={route.component}
                        title={route.titleKey}
                        description={route.descriptionKey}
                        url={route.url}
                        locale={route.locale}
                      />
                    )
                  }
                />
              ))}
            </Routes>
          </AnimatePresence>
        </main>
        {/* <SpotifyPlayer /> */}
      </ErrorBoundary>
      <ToastContainer newestOnTop limit={10} />
    </Router>
  );
}

export default App;
export { routes };
