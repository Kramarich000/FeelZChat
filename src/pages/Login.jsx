import React from "react";
import BgGradient from "../components/BgGradient";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsQuestionSquareFill } from "react-icons/bs";

export default function Login() {
  const Input = ({ type, placeholder }) => (
    <input
      className="input-styles"
      type={type}
      placeholder={placeholder}
      required
    />
  );
  return (
    <BgGradient>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className="container flex flex-row gap justify-between w-[75%]"
      >
        <Link to={"/"}>
          <h1 className="flex text-7xl font-bold items-center justify-center text-shadow-[-1px_3px_6px]">
            FeelZChat
          </h1>
        </Link>
        <section className="max-w-[650px] container bg-white p-16 rounded-2xl border-b-cyan-700 border-b-8 z-999">
          <h2 className="text-3xl pb-10">Вход</h2>
          <form className="grid gap-6" action="">
            <label>
              <Input type="tel" placeholder="Телефон" autoComplete="tel" />
            </label>
            <label>
              <Input
                type="password"
                placeholder="Пароль"
                autoComplete="new-password"
              />
            </label>
            <label className="flex items-center space-x-2 justify-center">
              <input
                type="checkbox"
                required
                className="form-checkbox hidden"
              />
              <span className="checkbox-custom"></span>
              <span>
                Запомнить меня
                <Link
                  to="/privacy"
                  className="text-cyan-700 hover:underline text-center"
                ></Link>
              </span>
            </label>
            <button className="button-styles col-span-1" type="submit">
              Войти
            </button>
            <div className="flex justify-evenly">
              <Link
                className="text-cyan-700 hover:underline"
                to="/forgot-password"
              >
                Забыли пароль?
              </Link>
              <Link className="text-cyan-700 hover:underline" to="/register">
                Нет аккаунта?
              </Link>
            </div>
          </form>
        </section>
      </motion.div>
      <Link to={"/help"}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="fixed bottom-10 left-10 flex items-center justify-center gap-5 bg-amber-50 p-3 rounded-4xl"
        >
          <p>Есть вопросы?</p>
          <BsQuestionSquareFill size={50} color="rgb(14, 116, 144)" />
        </motion.div>
      </Link>
    </BgGradient>
  );
}
