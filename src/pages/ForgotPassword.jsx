import { useEffect, useState } from "react";
import BgGradient from "@components/BgGradient";
import { useNavigate } from "react-router-dom";
import { motion, transform } from "framer-motion";
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
import translate from "@utils/translate";
import HelpButton from "@components/HelpButton";
import { SafeMotion } from "@components/SafeMotion";
import PrefetchLink from "@components/PrefetchLink";
import { useResponsive } from "@hooks/useResponsive";
import { useLockBodyScroll } from "@hooks/useLockBodyScroll";

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
  // useLockBodyScroll(true);
  const { isMobile, hasMounted } = useResponsive();
  if (!hasMounted) return null;

  return (
    <BgGradient>
      <SafeMotion
        initial={{ opacity: 0, transform: "translateX(50px)" }}
        animate={{ opacity: 1, transform: "translateX(0)" }}
        transition={{ duration: 0.5 }}
        className="container flex flex-col 2xl:flex-row gap-y-4 justify-between w-[95%] sm:w-[75%] items-center"
      >
        <PrefetchLink
          to={"/"}
          className="flex items-center justify-center hover:scale-110 transition-all"
        >
          <h1 className="main-title flex text-5xl sm:text-7xl font-bold items-center justify-center text-shadow-[-1px_3px_6px] cursor-pointer">
            {translate("key_app_name")}
          </h1>
        </PrefetchLink>
        <section className="form-section text-sm sm:text-[16px] max-w-[650px] container bg-white p-8 sm:p-16 rounded-2xl border-b-primary border-b-8 z-50">
          <h2 className="text-2xl sm:text-3xl pb-2 sm:pb-10">
            {translate("key_password_reset")}
          </h2>
          {step === 1 && (
            <Formik
              initialValues={{ email: "" }}
              validationSchema={forgotPasswordSchema}
              onSubmit={(values) => {
                handleFirstStepForgotSubmit(values, setStep);
              }}
            >
              {() => (
                <div>
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
                      {translate("key_reset")}
                    </button>
                  </Form>
                </div>
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
                <SafeMotion
                  initial={{ opacity: 0, transform: "translateX(50px)" }}
                  animate={{ opacity: 1, transform: "translateX(0)" }}
                  transition={{ duration: 0.5 }}
                >
                  <Form as={motion.form} className="grid grid-cols-1 gap-6">
                    <label>
                      <Field
                        type="text"
                        name="confirmationCode"
                        placeholder={translate("key_confirm_code")}
                        className="input-styles"
                      />
                      <ErrorMessage name="confirmationCode">
                        {(msg) => (
                          <AnimatedError msg={msg} variant="forgotPassword" />
                        )}
                      </ErrorMessage>
                    </label>
                    <button className="button-styles mb-4" type="submit">
                      {translate("key_end_registration")}
                    </button>
                  </Form>
                </SafeMotion>
              )}
            </Formik>
          )}

          {step === 3 && (
            <SafeMotion
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, transform: "translateX(50px)" }}
              animate={{ opacity: 1, transform: "translateX(0)" }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-4xl">
                ✓
              </div>
              <p className="text-xl text-center">
                {translate("key_reset_success")}
              </p>
            </SafeMotion>
          )}
        </section>
        {isMobile && <HelpButton />}
      </SafeMotion>
      {!isMobile && <HelpButton />}
    </BgGradient>
  );
}
