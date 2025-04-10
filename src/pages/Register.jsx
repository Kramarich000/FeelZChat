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
import { captcha } from "@services/captcha";
import { showToast } from "../utils/toast";
import ReCAPTCHA from "react-google-recaptcha";

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

  const [captchaVerified, setCaptchaVerified] = useState(false);

  const executeRecaptchaV3 = async () => {
    try {
      const token = await window.grecaptcha.execute(
        "6Le7Zw0rAAAAAHKsGR0i4ohPDQTK51JovR46dhnL",
        { action: "submit" }
      );
      return token;
    } catch (error) {
      console.error("Ошибка при вызове reCAPTCHA v3:", error);
      return null;
    }
  };

  const handleCaptcha = async (token) => {
    if (!token) {
      showToast.error("Ошибка: капча не пройдена");
      return;
    }

    try {
      const verificationResultV2 = await captcha(token, "v2");

      if (verificationResultV2.success && verificationResultV2.score >= 0.5) {
        console.log(verificationResultV2);
        setCaptchaVerified(true);
        showToast("Captcha пройдена по v2!", "success");
      } else {
        setCaptchaVerified(false);
        showToast("Captcha не пройдена по v2, пробуем v3.", "error");

        const tokenV3 = await executeRecaptchaV3();

        if (tokenV3) {
          const verificationResultV3 = await captcha(tokenV3, "v3");

          if (
            verificationResultV3.success &&
            verificationResultV3.score >= 0.5
          ) {
            setCaptchaVerified(true);
            showToast("Captcha пройдена по v3!", "success");
          } else {
            setCaptchaVerified(false);
            showToast("Captcha не пройдена по v3!", "error");
          }
        } else {
          showToast("Ошибка: не удалось получить токен для v3", "error");
        }
      }
    } catch (error) {
      showToast("Ошибка при верификации капчи!", "error");
      console.error("Captcha verification error:", error);
    }
  };

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
          <h1 className="main-title flex text-7xl font-bold items-center justify-center text-shadow-[-1px_3px_6px]">
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
                      autoComplete="given-name"
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
                      autoComplete="family-name"
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
                      autoComplete="tel"
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
                      autoComplete="new-password"
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
                      autoComplete="new-password"
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

                  <button
                    className="button-styles col-span-2 disabled:bg-cyan-700 disabled:opacity-40 transition-all disabled:pointer-events-none"
                    type="submit"
                    disabled={!captchaVerified}
                  >
                    Зарегистрироваться
                  </button>
                  <GoogleAuth />
                  <Link
                    className="text-cyan-700 col-span-2 text-center hover:underline"
                    to="/login"
                  >
                    Уже есть аккаунт?
                  </Link>
                  <div className="flex justify-center items-center mt-4 origin-top col-span-2">
                    <ReCAPTCHA
                      sitekey="6Lc7Xw0rAAAAAB3xa6ZFw2EjErWwzr7qxZbdiO_3"
                      onChange={handleCaptcha}
                    />
                  </div>
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
                        autoComplete="email"
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
