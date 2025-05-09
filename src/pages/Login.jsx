import BgGradient from "@components/BgGradient";
import GoogleAuth from "@components/GoogleAuth";
import { loginSchema } from "@validate/loginSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PrefetchLink from "@components/PrefetchLink";
import { formatPhoneNumber } from "@validate/registerSchema";
import AnimatedError from "@components/AnimatedError";
import { handleLoginSubmit } from "@services/loginHandlers";
import translate from "@utils/translate";
import HelpButton from "@components/HelpButton";
import useRecaptchaLanguage from "@hooks/useRecaptchaLanguage";
import { SafeMotion } from "@components/SafeMotion";
import useMediaQuery from "@hooks/useMediaQuery";
import { useLockBodyScroll } from "@hooks/useLockBodyScroll";
import CustomCheckbox from "@components/CustomCheckbox";
import handleCaptcha from "@services/captchaHandler";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  useRecaptchaLanguage();
  useLockBodyScroll(true);
  // const Input = ({ type, placeholder }) => (
  //   <input
  //     className="input-styles"
  //     type={type}
  //     placeholder={placeholder}
  //     required
  //   />
  // );
  return (
    <BgGradient>
      <SafeMotion
        initial={{ opacity: 0, transform: "translateX(50px)" }}
        animate={{ opacity: 1, transform: "translateX(0)" }}
        exit={{ opacity: 0, transform: "translateX(50px)" }}
        transition={{ duration: 0.5 }}
        className="container flex flex-col 2xl:flex-row gap-y-4 justify-between w-[95%] items-center"
      >
        <PrefetchLink
          to={"/"}
          className="flex items-center justify-center hover:scale-110 transition-all"
        >
          <h1 className="main-title flex text-4xl sm:text-7xl font-bold items-center justify-center text-shadow-[-1px_3px_6px]">
            {translate("key_app_name")}
          </h1>
        </PrefetchLink>
        <section className="form-section text-sm sm:text-[16px] max-w-[650px] container bg-white p-8 sm:p-16 rounded-2xl border-b-primary border-b-8 z-50">
          <h2 className="text-2xl sm:text-3xl pb-2 sm:pb-10">
            {translate("key_login_title")}
          </h2>
          <Formik
            initialValues={{ phone: "", password: "", remember: false }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              handleLoginSubmit(values);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form className="grid gap-2 sm:gap-6">
                <label className="col-span-2">
                  <Field
                    name="phone"
                    type="tel"
                    placeholder={translate("key_phone")}
                    className="input-styles"
                    onChange={(e) => {
                      const phoneValue = e.target.value;
                      const formattedPhone = formatPhoneNumber(phoneValue);
                      setFieldValue("phone", formattedPhone);
                    }}
                    autoComplete="given-name"
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
                    autoComplete="current-password"
                    placeholder={translate("key_password")}
                    className="input-styles "
                  />
                  <ErrorMessage name="password">
                    {(msg) => <AnimatedError msg={msg} variant="login" />}
                  </ErrorMessage>
                </label>

                <label className="flex items-center space-x-2 justify-center col-span-2">
                  <span className="flex items-center gap-2">
                    <Field name="remember">
                      {({ field, form }) => (
                        <CustomCheckbox
                          checkedCookie={field.value}
                          onChange={(e) =>
                            form.setFieldValue("remember", e.checked)
                          }
                        />
                      )}
                    </Field>
                    {translate("key_remember_me")}{" "}
                    <PrefetchLink
                      to="/privacy"
                      className="text-primary hover:underline text-center"
                      onClick={(e) => e.stopPropagation()}
                    ></PrefetchLink>
                  </span>
                </label>

                <button
                  className="button-styles col-span-2 mb-4 w-full"
                  type="submit"
                >
                  {translate("key_enter")}
                </button>
              </Form>
            )}
          </Formik>
          <GoogleAuth />
          <div className="flex justify-evenly col-span-2 mt-4 gap-4 flex-wrap">
            <PrefetchLink
              className="text-primary hover:underline"
              to="/forgot-password"
            >
              {translate("key_forgot_password")}
            </PrefetchLink>
            <PrefetchLink
              className="text-primary hover:underline"
              to="/register"
            >
              {translate("key_no_account")}
            </PrefetchLink>
          </div>
          <div className="flex justify-center items-center mt-4 origin-top col-span-2">
            <ReCAPTCHA
              sitekey="6Lc7Xw0rAAAAAB3xa6ZFw2EjErWwzr7qxZbdiO_3"
              onChange={handleCaptcha}
            />
          </div>
        </section>
        {isMobile && <HelpButton />}
      </SafeMotion>
      {!isMobile && <HelpButton />}
    </BgGradient>
  );
}
