import "./App.css";
import Privacy from "@pages/Privacy";
import Register from "@pages/Register";
import Login from "@pages/Login";
import Help from "@pages/Help";
import Profile from "@pages/Profile";
import Home from "@pages/Home";
import Chat from "@pages/Chat";
import ForgotPassword from "@pages/ForgotPassword";

import Error404 from "@errors/404";

import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import React from "react";

import FallbackComponent from "@components/FallbackComponent";
import PrivateRoute from "@components/PrivateRoute";
import withTitle from "@components/Title";
import MusicComponent from "@components/MusicComponent";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <main className="container mx-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/register"
                element={React.createElement(
                  withTitle(Register, "Регистрация")
                )}
              />
              <Route
                path="/login"
                element={React.createElement(withTitle(Login, "Вход"))}
              />
              <Route
                path="/chat"
                element={React.createElement(withTitle(Chat, "Чат"))}
              />
              <Route
                path="/privacy"
                element={React.createElement(
                  withTitle(Privacy, "Политика конфиденциальности")
                )}
              />
              <Route
                path="/help"
                element={React.createElement(withTitle(Help, "FAQ"))}
              />
              <Route
                path="/"
                element={React.createElement(withTitle(Home, "Главная"))}
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    {React.createElement(withTitle(Profile, "Профиль"))}
                  </PrivateRoute>
                }
              />
              <Route
                path="*"
                element={React.createElement(withTitle(Error404, "Ошибка"))}
              />
              <Route
                path="/forgot-password"
                element={React.createElement(withTitle(ForgotPassword, "Сброс пароля"))}
              />
            </Routes>
          </AnimatePresence>
        </main>
        <MusicComponent />
      </ErrorBoundary>
      <ToastContainer newestOnTop limit={10} />
    </Router>
  );
}

export default App;
