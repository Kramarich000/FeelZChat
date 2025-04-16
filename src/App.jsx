import "./App.css";
import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FallbackComponent from "@components/FallbackComponent";
import PrivateRoute from "@components/PrivateRoute";
import withTitle from "@components/Title";
import MusicComponent from "@components/MusicComponent";
import { Loader } from "@components/Loader";
import Error404 from "@errors/404";

import translate from "@utils/translate";
import { useEffect } from "react";

import { getMessaging, getToken } from "firebase/messaging";
import { messaging } from "../public/firebase-config";

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker зарегистрирован с областью:", registration.scope);
      })
      .catch((error) => {
        console.log("Ошибка при регистрации Service Worker:", error);
      });
  }
};


const Register = lazy(() => import("@pages/Register"));
const Login = lazy(() => import("@pages/Login"));
const Chat = lazy(() => import("@pages/Chat"));
const Privacy = lazy(() => import("@pages/Privacy"));
const Help = lazy(() => import("@pages/Help"));
const Home = lazy(() => import("@pages/Home"));
const Profile = lazy(() => import("@pages/Profile"));
const ForgotPassword = lazy(() => import("@pages/ForgotPassword"));


const Page = ({ component: Component, title }) => {
  const translatedTitle = translate(title);

  const WrappedComponent = withTitle(Component, translatedTitle);
  return <WrappedComponent />;
};

const requestPermissionForPushNotifications = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Разрешение на пуш-уведомления получено");

      // Получаем токен для пуш-уведомлений
      getToken(messaging, {
        vapidKey: "BMwGXTe80IcVoOJ4b2WHJX9bIDezkBFgjzjB2c1m51NldzPmxwaEVO80TPcG1wqmwExIEjAHi7I9B2_-ysCNCRY", // Укажи свой VAPID ключ
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("FCM Token:", currentToken);
            // Здесь можешь отправить токен на сервер для дальнейшей отправки уведомлений
          } else {
            console.log("Не удалось получить токен");
          }
        })
        .catch((err) => {
          console.log("Ошибка при получении токена:", err);
        });
    } else {
      console.log("Разрешение на уведомления отклонено");
    }
  });
};

const routes = [
  {
    path: "/register",
    component: Register,
    titleKey: "key_register_1", 
    importFunc: () => import("@pages/Register"),
  },
  {
    path: "/login",
    component: Login,
    titleKey: "key_login_1", 
    importFunc: () => import("@pages/Login"),
  },
  {
    path: "/chat",
    component: Chat,
    titleKey: "key_chat", 
    importFunc: () => import("@pages/Chat"),
  },
  {
    path: "/privacy",
    component: Privacy,
    titleKey: "key_privacy", 
    importFunc: () => import("@pages/Privacy"),
  },
  {
    path: "/help",
    component: Help,
    titleKey: "key_help", 
    importFunc: () => import("@pages/Help"),
  },
  {
    path: "/",
    component: Home,
    titleKey: "key_home", 
    importFunc: () => import("@pages/Home"),
  },
  {
    path: "/profile",
    component: Profile,
    titleKey: "key_profile_1", 
    private: true,
    importFunc: () => import("@pages/Profile"),
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    titleKey: "key_reset_password", 
    importFunc: () => import("@pages/ForgotPassword"),
  },
  {
    path: "*",
    component: Error404,
    titleKey: "key_error", 
    importFunc: () => import("@errors/404"),
  },
];


const preloadPage = (importFunc) => {
  if (typeof importFunc === "function") {
    importFunc();
  }
};

function App() {
  useEffect(() => {
    registerServiceWorker();
    requestPermissionForPushNotifications();
  }, []);
  return (
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
                      <div
                        onMouseEnter={() => preloadPage(route.importFunc)}
                      >
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
          <MusicComponent />
        </Suspense>
      </ErrorBoundary>
      <ToastContainer newestOnTop limit={10} />
    </Router>
  );
}

export default App;
