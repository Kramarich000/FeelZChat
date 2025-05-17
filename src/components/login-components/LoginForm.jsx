import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomCheckbox from "@components/CustomCheckbox";
import AnimatedError from "@components/AnimatedError";
import translate from "@utils/translate";
import { loginSchema } from "@validate/loginSchema";
import GoogleAuth from "@components/GoogleAuth";
import PrefetchLink from "@components/PrefetchLink";
import ReCAPTCHA from "react-google-recaptcha";
import handleCaptcha from "@services/captchaHandler";
import { formatPhoneNumber } from "@validate/loginSchema";
import { handleLoginSubmit } from "@services/loginHandlers";
import { useOnlineStatus } from "@hooks/useOnlineStatus";
import useCaptchaHandler from "@services/captchaHandler";

export default function LoginForm() {
  const isOnline = useOnlineStatus();
  const { handleError, captchaVerified } = useCaptchaHandler();

  return (
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
        <PrefetchLink className="text-primary hover:underline" to="/register">
          {translate("key_no_account")}
        </PrefetchLink>
      </div>
      <div className="captcha-wrapper flex justify-center items-center mt-4 origin-top col-span-2 min-h-[78px]">
        {isOnline ? (
          <ReCAPTCHA
            sitekey="6Lc7Xw0rAAAAAB3xa6ZFw2EjErWwzr7qxZbdiO_3"
            onChange={handleCaptcha}
            onErrored={handleError}
          />
        ) : (
          <p>
            Не удалось установить соединение с сервисом ReCAPTCHA. Пожалуйста,
            проверьте подключение к интернету и попробуйте снова позже.
          </p>
        )}
      </div>
    </section>
  );
}
