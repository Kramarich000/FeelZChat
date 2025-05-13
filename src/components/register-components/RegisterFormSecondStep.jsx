import { Formik, Form, Field, ErrorMessage } from "formik";
import { emailSchema } from "@validate/registerSchema";
import { SafeMotion } from "@components/SafeMotion";
import translate from "@utils/translate";
import AnimatedError from "@components/AnimatedError";
import { handleSecondStepSubmit } from "@services/registerHandlers";
import useRegisterStore from "@store/registerStore";

export default function RegisterFormSecondStep() {
  const { registrationData } = useRegisterStore();
  useLockBodyScroll(true);

  return (
    <Formik
      initialValues={{ email: registrationData.email || "" }}
      validationSchema={emailSchema}
      onSubmit={({ email }) => handleSecondStepSubmit(email)}
    >
      {() => (
        <SafeMotion
          initial={{ opacity: 0, transform: "translateX(-50px)" }}
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
              <ErrorMessage
                name="email"
                component={AnimatedError}
                variant="forgotPassword"
              />
            </label>

            <button className="button-styles col-span-1" type="submit">
              {translate("key_confirm")}
            </button>
          </Form>
        </SafeMotion>
      )}
    </Formik>
  );
}
