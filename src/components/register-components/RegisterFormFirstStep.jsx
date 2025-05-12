import { Formik, Form, Field, ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha";

import { registerSchema } from "@validate/registerSchema";
import { formatPhoneNumber } from "@validate/registerSchema";

import translate from "@utils/translate";

import handleCaptcha from "@services/captchaHandler";

import GoogleAuth from "@components/GoogleAuth";
import CustomCalendar from "@components/CustomCalendar";
import PrefetchLink from "@components/PrefetchLink";
import CustomCheckbox from "@components/CustomCheckbox";
import AnimatedError from "@components/AnimatedError";

import useRegisterStore from "@store/registerStore";
import { handleFirstStepSubmit } from "@services/registerHandlers";

export default function RegisterFormFirstStep() {
  const { setStep, setRegistrationData, step } = useRegisterStore();

  const initialValues = {
    name: "",
    surname: "",
    phone: "",
    password: "",
    confirmPassword: "",
    date: new Date(),
    agreement: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleFirstStepSubmit}
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
            <label className="flex items-center justify-center">
              <Field name="agreement">
                {({ field, form }) => (
                  <CustomCheckbox
                    checkedCookie={field.value}
                    onChange={(e) => form.setFieldValue("agreement", e.checked)}
                  />
                )}
              </Field>
              <span className="ml-3 mt-1 text-[10px] xs:text-[12px] sm:text-[14px]">
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
            className="text-primary col-span-2 mb-4 text-center hover:underline"
            to="/login"
          >
            {translate("key_already_have_account")}
          </PrefetchLink>
          <div className="flex justify-center items-center mt-4 origin-top col-span-2 min-h-[78px]">
            <ReCAPTCHA
              sitekey="6Lc7Xw0rAAAAAB3xa6ZFw2EjErWwzr7qxZbdiO_3"
              onChange={handleCaptcha}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
