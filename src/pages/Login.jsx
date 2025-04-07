import React from "react";
import BgGradient from "@components/BgGradient";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsQuestionSquareFill } from "react-icons/bs";
import GoogleAuth from "@components/GoogleAuth";
import { loginSchema } from "@validate/loginSchema";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import { formatPhoneNumber } from "@validate/registerSchema";
import AnimatedError from "@components/AnimatedError";

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
        className="container flex flex-row gap justify-between w-[75%] items-center"
      >
        <Link
          to={"/"}
          className="flex items-center justify-center hover:scale-110 transition-all"
        >
          <h1 className="flex text-7xl font-bold items-center justify-center text-shadow-[-1px_3px_6px]">
            FeelZChat
          </h1>
        </Link>
        <section className="max-w-[650px] container bg-white p-16 rounded-2xl border-b-cyan-700 border-b-8 z-999">
          <h2 className="text-3xl pb-10">Вход</h2>
          <Formik
            initialValues={{ phone: "", password: "", remember: false }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              console.log("Login data:", values);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form className="grid gap-6">
                <label className="col-span-2">
                  <Field
                    name="phone"
                    type="tel"
                    placeholder="Телефон"
                    className="input-styles"
                    onChange={(e) => {
                      const phoneValue = e.target.value;
                      const formattedPhone = formatPhoneNumber(phoneValue);
                      setFieldValue("phone", formattedPhone);
                    }}
                    value={values.phone}
                  />
                  <ErrorMessage name="phone">
                    {(msg) => <AnimatedError msg={msg} variant="login" />}
                  </ErrorMessage>
                </label>

                <label className="col-span-2">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    className="input-styles "
                  />
                  <ErrorMessage name="password">
                    {(msg) => <AnimatedError msg={msg} variant="login" />}
                  </ErrorMessage>
                </label>
                <label className="flex items-center space-x-2 justify-center col-span-2">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="form-checkbox hidden"
                  />
                  <span className="checkbox-custom"></span>
                  <span>
                    Запомнить меня{" "}
                    <Link
                      to="/privacy"
                      className="text-cyan-700 hover:underline text-center"
                    ></Link>
                  </span>
                </label>

                <button
                  className="button-styles col-span-2 w-full"
                  type="submit"
                >
                  Войти
                </button>

                <GoogleAuth />

                <div className="flex justify-evenly col-span-2">
                  <Link
                    className="text-cyan-700 hover:underline"
                    to="/forgot-password"
                  >
                    Забыли пароль?
                  </Link>
                  <Link
                    className="text-cyan-700 hover:underline"
                    to="/register"
                  >
                    Нет аккаунта?
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
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
