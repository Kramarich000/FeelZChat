import { useState, useEffect } from "react";
import BgGradient from "@components/BgGradient";
import CustomCalendar from "@components/CustomCalendar";
import { useNavigate } from "react-router-dom";
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
import { SafeMotion } from "@components/SafeMotion";
import { captcha } from "@services/captcha";
import { showToast } from "../utils/toast";
import ReCAPTCHA from "react-google-recaptcha";
import translate from "@utils/translate";
import PrefetchLink from "@components/PrefetchLink";
import HelpButton from "@components/HelpButton";
import useRecaptchaLanguage from "@hooks/useRecaptchaLanguage";
import { useResponsive } from "@hooks/useResponsive";
import { useLockBodyScroll } from "@hooks/useLockBodyScroll";
import CustomCheckbox from "@components/CustomCheckbox";

export default function Register() {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({});
  const navigate = useNavigate();
  useRecaptchaLanguage();
  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  useLockBodyScroll(true);

  const [captchaVerified, setCaptchaVerified] = useState(false);

  const { isMobile, hasMounted } = useResponsive();
  if (!hasMounted) return null;
  const initialValues = {
    name: "",
    surname: "",
    phone: "",
    password: "",
    confirmPassword: "",
    date: null,
    agreement: false,
  };

  const executeRecaptchaV3 = async () => {
    try {
      const token = await window.grecaptcha.execute(
        "6Le7Zw0rAAAAAHKsGR0i4ohPDQTK51JovR46dhnL",
        { action: "submit" },
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
        // showToast("Captcha пройдена по v2!", "success");
      } else {
        setCaptchaVerified(false);
        // showToast("Captcha не пройдена по v2, пробуем v3.", "error");

        const tokenV3 = await executeRecaptchaV3();

        if (tokenV3) {
          const verificationResultV3 = await captcha(tokenV3, "v3");

          if (
            verificationResultV3.success &&
            verificationResultV3.score >= 0.5
          ) {
            setCaptchaVerified(true);
            // showToast("Captcha пройдена по v3!", "success");
          } else {
            setCaptchaVerified(false);
            // showToast("Captcha не пройдена по v3!", "error");
          }
        } else {
          // showToast("Ошибка: не удалось получить токен для v3", "error");
        }
      }
    } catch (error) {
      showToast("Ошибка при верификации капчи!", "error");
      console.error("Captcha verification error:", error);
    }
  };

  return (
    <BgGradient>
      <SafeMotion
        initial={{ opacity: 0, transform: "translateX(50px)" }}
        animate={{ opacity: 1, transform: "translateX(0)" }}
        transition={{ duration: 0.5 }}
        className="container flex flex-col 2xl:flex-row gap-y-1 sm:gap-y-4 m-1 justify-between w-[95%] items-center"
      >
        <PrefetchLink
          to={"/"}
          className="flex items-center justify-center hover:scale-110 transition-all"
        >
          <h1 className="main-title py-2 sm:p-0 flex text-4xl sm:text-7xl font-bold items-center justify-center text-shadow-[-1px_3px_6px]">
            {translate("key_app_name")}
          </h1>
        </PrefetchLink>
        <section className="form-section text-[14px] sm:text-[16px] max-w-[650px] container bg-white p-4 sm:p-16 rounded-2xl border-b-primary border-b-8 z-50">
          <h2 className="text-2xl sm:text-3xl pb-2 sm:pb-10">
            {translate("key_register_1")}
          </h2>

          {step === 1 && (
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={(values) =>
                handleFirstStepSubmit(values, setStep, setRegistrationData)
              }
            >
              {({ setFieldValue, values }) => (
                <Form className="grid grid-cols-2 gap-2 sm:gap-6">
                  <div className="relative">
                    <Field
                      name="name"
                      type="text"
                      placeholder={translate("key_name")}
                      className="input-styles"
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
                      placeholder={translate("key_surname")}
                      className="input-styles"
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
                      placeholder={translate("key_phone")}
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
                      date={values.date || new Date()} // Здесь важно установить дефолтное значение
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
                      placeholder={translate("key_password")}
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
                      placeholder={translate("key_confirm_password")}
                      className="input-styles "
                      autoComplete="new-password"
                    />
                    <ErrorMessage name="confirmPassword">
                      {(msg) => <AnimatedError msg={msg} centered />}
                    </ErrorMessage>
                  </div>

                  <div className="col-span-2 relative">
                    <label className="flex items-center space-x-2 justify-center">
                      <Field name="agreement">
                        {({ field, form }) => (
                          <CustomCheckbox
                            checkedCookie={field.value}
                            onChange={(e) =>
                              form.setFieldValue("agreement", e.checked)
                            }
                          />
                        )}
                      </Field>
                      <span>
                        {translate("key_i_confirm")}{" "}
                        <PrefetchLink
                          to="/privacy"
                          className="text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {translate("key_privacy_1")}
                        </PrefetchLink>
                      </span>
                    </label>

                    <ErrorMessage name="agreement">
                      {(msg) => <AnimatedError msg={msg} centered />}
                    </ErrorMessage>
                  </div>

                  <button
                    // className="button-styles col-span-2 disabled:bg-primary disabled:opacity-40 transition-all disabled:pointer-events-none"
                    className="button-styles col-span-2 disabled:bg-primary disabled:opacity-40 transition-all"
                    type="submit"
                    // disabled={!captchaVerified}
                  >
                    {translate("key_sign_up")}
                  </button>
                  <GoogleAuth />
                  <PrefetchLink
                    className="text-primary col-span-2 text-center hover:underline"
                    to="/login"
                  >
                    {translate("key_already_have_account")}
                  </PrefetchLink>
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
                <SafeMotion
                  initial={{ opacity: 0, transform: "transate: -50px" }}
                  animate={{ opacity: 1, transform: "translateX(0)" }}
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
                      {translate("key_confirm")}
                    </button>
                  </Form>
                </SafeMotion>
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
                  as={SafeMotion}
                  className="grid grid-cols-1 gap-6"
                  initial={{ opacity: 0, transform: "transate: 50px" }}
                  animate={{ opacity: 1, transform: "translateX(0)" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <Field
                      type="text"
                      name="confirmationCode"
                      placeholder="Код подтверждения"
                      maxLength={6}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                      className="input-styles letter-spacing"
                    />
                    {/* <div className="input-decoration">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div> */}
                    <ErrorMessage name="confirmationCode">
                      {(msg) => <AnimatedError msg={msg} centered />}
                    </ErrorMessage>
                  </div>
                  <button className="button-styles mb-4" type="submit">
                    {translate("key_end_registration")}
                  </button>
                </Form>
              )}
            </Formik>
          )}
          {step === 4 && (
            <SafeMotion
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, transform: "transate: 50px" }}
              animate={{ opacity: 1, transform: "translateX(0)" }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-4xl">
                ✓
              </div>
              <p className="text-xl text-center">
                {translate("key_success_registration")}
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
