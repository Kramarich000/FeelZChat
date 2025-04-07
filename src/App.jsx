import "./App.css";
import { lazy, Suspense } from "react"; 
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Privacy = lazy(() => import("@pages/Privacy"));
const Register = lazy(() => import("@pages/Register"));
const Login = lazy(() => import("@pages/Login"));
const Help = lazy(() => import("@pages/Help"));
const Profile = lazy(() => import("@pages/Profile"));
const Home = lazy(() => 
  Promise.all([
    import("@pages/Home"),
    new Promise(resolve => setTimeout(resolve, 10000)) // 1 секунда задержки
  ]).then(([module]) => module)
);
const Chat = lazy(() => import("@pages/Chat"));
const ForgotPassword = lazy(() => import("@pages/ForgotPassword"));
const Error404 = lazy(() => import("@errors/404"));

import FallbackComponent from "@components/FallbackComponent";
import PrivateRoute from "@components/PrivateRoute";
import withTitle from "@components/Title";
import withTranslate from "@components/Translate";
import MusicComponent from "@components/MusicComponent";
import { Loader } from "@components/Loader"; 

import useEffecti18n from "@hooks/useEffecti18n";


const Page = ({ component: Component, title }) => {
  const Translated = withTranslate(Component);
  const Wrapped = withTitle(Translated, title);
  return <Wrapped />;
};
console.log("Язык- ", navigator.language);

const routes = [
  { path: "/register", component: Register, title: "Регистрация" },
  { path: "/login", component: Login, title: "Вход" },
  { path: "/chat", component: Chat, title: "Чат" },
  { path: "/privacy", component: Privacy, title: "Политика конфиденциальности" },
  { path: "/help", component: Help, title: "FAQ" },
  { path: "/", component: Home, title: "Главная" },
  { 
    path: "/profile", 
    component: Profile, 
    title: "Профиль",
    private: true 
  },
  { path: "/forgot-password", component: ForgotPassword, title: "Сброс пароля" },
  { path: "*", component: Error404, title: "Ошибка" }
];

function App() {
  useEffecti18n();
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
                      route.private ? (
                        <PrivateRoute>
                          <Page component={route.component} title={route.title} />
                        </PrivateRoute>
                      ) : (
                        <Page component={route.component} title={route.title} />
                      )
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