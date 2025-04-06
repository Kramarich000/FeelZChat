import React, { useState } from "react";
import BgGradient from "../components/BgGradient";
import CustomCalendar from "../components/CustomCalendar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsQuestionSquareFill } from "react-icons/bs";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema, formatPhoneNumber } from "../validate/registerSchema";
import GoogleAuth from '../components/GoogleAuth';

import AnimatedError from "../components/AnimatedError";

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

  const handleFirstStepSubmit = async (values) => {
    try {
      const response = await axios.post("https://api/ivan", values);
      if (response.status === 200) {
        console.log("все ок!");
        setStep(2);
      } else {
        console.log("ошибка!", response.data);
      }
    } catch (error) {
      console.log("иван error", error);
    }
  };
  const handleSecondStepSubmit = async (values) => {
    try {
      const response = await axios.post("https://api/ivan", values);
      if (response.status === 200) {
        console.log("все ок!");
        setStep(3);
      } else {
        console.log("ошибка!", response.data);
      }
    } catch (error) {
      console.log("иван error", error);
    }
  };
  const handleThirdStepSubmit = async (values) => {
    try {
      const response = await axios.post("https://api/ivan", values);
      if (response.status === 200) {
        console.log("все ок!");
        window.location.href = "/profile";
      } else {
        console.log("ошибка!", response.data);
      }
    } catch (error) {
      console.log("иван error", error);
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
              onSubmit={handleFirstStepSubmit}
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

                  <button
                    className="button-styles col-span-2 mb-4"
                    type="submit"
                  >
                    Зарегистрироваться
                  </button>
                </Form>
              )}
            </Formik>
            
          )}
          <GoogleAuth /> 

          {step === 2 && (
            <motion.form
              className="grid grid-cols-1 gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSecondStepSubmit}
            >
              <label>
                <input
                  type="email"
                  placeholder="Введите Email"
                  className="input-styles"
                />
              </label>
              <button className="button-styles mb-4" type="submit">
                Отправить
              </button>
            </motion.form>
          )}

          {step === 3 && (
            <motion.form
              className="grid grid-cols-1 gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleThirdStepSubmit}
            >
              <label>
                <input
                  type="text"
                  placeholder="Код подтверждения"
                  className="input-styles"
                />
              </label>
              <button className="button-styles mb-4" type="submit">
                Завершить регистрацию
              </button>
            </motion.form>
          )}
        </section>
      </motion.div>
      <Link to={"/help"}>
        <div className="fixed bottom-10 left-10 flex items-center justify-center gap-5 bg-amber-50 p-3 rounded-4xl">
          <p className="">Есть вопросы?</p>
          <BsQuestionSquareFill size={50} color="rgb(14, 116, 144)" />
        </div>
      </Link>
    </BgGradient>
  );
}
