import React, { useState } from "react";
import BgGradient from "@components/BgGradient";
import CustomCalendar from "@components/CustomCalendar";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsQuestionSquareFill } from "react-icons/bs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  registerSchema,
  formatPhoneNumber,
  emailSchema,
  confirmationCodeSchema,
} from "@validate/registerSchema";
import GoogleAuth from "@components/GoogleAuth";
import AnimatedError from "@components/AnimatedError";
import {
  handleFirstStepSubmit,
  handleSecondStepSubmit,
  handleThirdStepSubmit,
} from "@services/registerHandlers";
import { useEffect } from "react";

export default function Register() {
  const [step, setStep] = useState(1);

  const initialValues = {
    name: "",
    surname: "",
    phone: "",
    password: "",
    confirmPassword: "",
    date: null,
    agreement: false,
  };

  const [registrationData, setRegistrationData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

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
          <h2 className="text-3xl pb-10">Регистрация</h2>

          {step === 1 && (
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={(values) =>
                handleFirstStepSubmit(values, setStep, setRegistrationData)
              }
            >
              {({ setFieldValue, values }) => (
                <Form className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <Field
                      name="name"
                      type="text"
                      placeholder="Имя"
                      className="input-styles "
                    />
                    <ErrorMessage name="name">
                      {(msg) => <AnimatedError msg={msg} centered />}
                    </ErrorMessage>
                  </div>

                  <div className="relative">
                    <Field
                      name="surname"
                      type="text"
                      placeholder="Фамилия"
                      className="input-styles "
                    />
                    <ErrorMessage name="surname">
                      {(msg) => <AnimatedError msg={msg} centered />}
                    </ErrorMessage>
                  </div>

                  <div className="relative">
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
                      {(msg) => <AnimatedError msg={msg} centered />}
                    </ErrorMessage>
                  </div>

                  <div className="relative">
                    <CustomCalendar
                      date={values.date}
                      setDate={(date) => setFieldValue("date", date)}
                    />
                    <ErrorMessage name="date">
                      {(msg) => <AnimatedError msg={msg} centered />}
                    </ErrorMessage>
                  </div>

                  <div className="relative">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Пароль"
                      className="input-styles "
                    />
                    <ErrorMessage name="password">
                      {(msg) => <AnimatedError msg={msg} centered />}
                    </ErrorMessage>
                  </div>

                  <div className="relative">
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Подтвердите пароль"
                      className="input-styles "
                    />
                    <ErrorMessage name="confirmPassword">
                      {(msg) => <AnimatedError msg={msg} centered />}
                    </ErrorMessage>
                  </div>

                  <div className="col-span-2 relative">
                    <label className="flex items-center space-x-2 justify-center cursor-pointer">
                      <Field
                        type="checkbox"
                        name="agreement"
                        className="hidden "
                      />
                      <span className="checkbox-custom"></span>
                      <span>
                        Я согласен с{" "}
                        <Link
                          to="/privacy"
                          className="text-cyan-700 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          политикой конфиденциальности
                        </Link>
                      </span>
                    </label>
                    <ErrorMessage name="agreement">
                      {(msg) => <AnimatedError msg={msg} centered />}
                    </ErrorMessage>
                  </div>

                  <button className="button-styles col-span-2" type="submit">
                    Зарегистрироваться
                  </button>
                  <GoogleAuth />
                  <Link
                    className="text-cyan-700 col-span-2 text-center hover:underline"
                    to="/login"
                  >
                    Уже есть аккаунт?
                  </Link>
                </Form>
              )}
            </Formik>
          )}

          {step === 2 && (
            <Formik
              initialValues={{ email: "" }}
              validationSchema={emailSchema}
              onSubmit={(values) => {
                handleSecondStepSubmit(values.email, registrationData, setStep);
              }}
            >
              {() => (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Form noValidate className="grid gap-6" autoComplete="email">
                    <label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        className="input-styles"
                        pattern=".*"
                      />
                      <ErrorMessage name="email">
                        {(msg) => (
                          <AnimatedError msg={msg} variant="forgotPassword" />
                        )}
                      </ErrorMessage>
                    </label>

                    <button className="button-styles col-span-1" type="submit">
                      Подтвердить
                    </button>
                  </Form>
                </motion.div>
              )}
            </Formik>
          )}

          {step === 3 && (
            <Formik
              initialValues={{ confirmationCode: "" }}
              onSubmit={(values) => handleThirdStepSubmit(values, setStep)}
              validationSchema={confirmationCodeSchema}
            >
              {() => (
                <Form
                  as={motion.form}
                  className="grid grid-cols-1 gap-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <Field
                      type="text"
                      name="confirmationCode"
                      placeholder="Код подтверждения"
                      className="input-styles"
                    />
                    <ErrorMessage name="confirmationCode">
                      {(msg) => <AnimatedError msg={msg} centered />}
                    </ErrorMessage>
                  </div>
                  <button className="button-styles mb-4" type="submit">
                    Завершить регистрацию
                  </button>
                </Form>
              )}
            </Formik>
          )}
          {step === 4 && (
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-cyan-700 rounded-full flex items-center justify-center text-white text-4xl">
                ✓
              </div>
              <p className="text-xl text-center">Вы успешно зарегистрированы</p>
            </motion.div>
          )}
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
