import React, { useEffect, useState } from "react";
import BgGradient from "@components/BgGradient";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsQuestionSquareFill } from "react-icons/bs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  forgotPasswordSchema,
  confirmationCodeSchema,
} from "@validate/forgotPasswordSchema";

import {
  handleFirstStepForgotSubmit,
  handleSecondStepForgotSubmit,
} from "@services/forgotPasswordsHandlers";

import AnimatedError from "@components/AnimatedError";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 3) {
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
          <h2 className="text-3xl pb-10">Сброс пароля</h2>
          {step === 1 && (
            <Formik
              initialValues={{ email: "" }}
              validationSchema={forgotPasswordSchema}
              onSubmit={(values) => {
                handleFirstStepForgotSubmit(values, setStep);
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
                      Сбросить
                    </button>
                  </Form>
                </motion.div>
              )}
            </Formik>
          )}

          {step === 2 && (
            <Formik
              initialValues={{ confirmationCode: "" }}
              onSubmit={(values) =>
                handleSecondStepForgotSubmit(values, setStep)
              }
              validationSchema={confirmationCodeSchema}
            >
              {() => (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Form as={motion.form} className="grid grid-cols-1 gap-6">
                    <label>
                      <Field
                        type="text"
                        name="confirmationCode"
                        placeholder="Код подтверждения"
                        className="input-styles"
                      />
                      <ErrorMessage name="confirmationCode">
                        {(msg) => (
                          <AnimatedError msg={msg} variant="forgotPassword" />
                        )}
                      </ErrorMessage>
                    </label>
                    <button className="button-styles mb-4" type="submit">
                      Завершить регистрацию
                    </button>
                  </Form>
                </motion.div>
              )}
            </Formik>
          )}

          {step === 3 && (
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
              <p className="text-xl text-center">
                Пароль успешно сброшен. Сейчас вы будете перенаправлены на
                страницу входа...
              </p>
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
