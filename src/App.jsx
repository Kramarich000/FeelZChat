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


const Register = lazy(() => import("@pages/Register"));
const Login = lazy(() => import("@pages/Login"));
const Chat = lazy(() => import("@pages/Chat"));
const Privacy = lazy(() => import("@pages/Privacy"));
const Help = lazy(() => import("@pages/Help"));
const Home = lazy(() => import("@pages/Home"));
const Profile = lazy(() => import("@pages/Profile"));
const ForgotPassword = lazy(() => import("@pages/ForgotPassword"));


const Page = ({ component: Component, title }) => {
  const WrappedComponent = withTitle(Component, title);
  return <WrappedComponent />;
};

const routes = [
  {
    path: "/register",
    component: Register,
    title: "Регистрация",
    importFunc: () => import("@pages/Register"),
  },
  {
    path: "/login",
    component: Login,
    title: "Вход",
    importFunc: () => import("@pages/Login"),
  },
  {
    path: "/chat",
    component: Chat,
    title: "Чат",
    importFunc: () => import("@pages/Chat"),
  },
  {
    path: "/privacy",
    component: Privacy,
    title: "Политика конфиденциальности",
    importFunc: () => import("@pages/Privacy"),
  },
  {
    path: "/help",
    component: Help,
    title: "FAQ",
    importFunc: () => import("@pages/Help"),
  },
  {
    path: "/",
    component: Home,
    title: "Главная",
    importFunc: () => import("@pages/Home"),
  },
  {
    path: "/profile",
    component: Profile,
    title: "Профиль",
    private: true,
    importFunc: () => import("@pages/Profile"),
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    title: "Сброс пароля",
    importFunc: () => import("@pages/ForgotPassword"),
  },
  {
    path: "*",
    component: Error404,
    title: "Ошибка",
    importFunc: () => import("@errors/404"),
  },
];

const preloadPage = (importFunc) => {
  if (typeof importFunc === "function") {
    importFunc();
  }
};

function App() {
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
                              title={route.title}
                            />
                          </PrivateRoute>
                        ) : (
                          <Page
                            component={route.component}
                            title={route.title}
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
