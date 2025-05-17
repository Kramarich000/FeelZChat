import { Formik, Form, Field, ErrorMessage } from "formik";
import { confirmationCodeSchema } from "@validate/registerSchema";
import { SafeMotion } from "@components/SafeMotion";
import translate from "@utils/translate";
import { handleThirdStepSubmit } from "@services/registerHandlers";
import useRegisterStore from "@store/registerStore";
import AnimatedError from "@components/AnimatedError";
export default function RegisterFormThirdStep() {
  const { setStep } = useRegisterStore();

  return (
    <Formik
      initialValues={{ confirmationCode: "" }}
      validationSchema={confirmationCodeSchema}
      onSubmit={(values) => {
        handleThirdStepSubmit(values.confirmationCode, setStep);
      }}
    >
      {() => (
        <Form
          as={SafeMotion}
          className="grid grid-cols-1 gap-6"
          initial={{ opacity: 0, transform: "translate: 50px" }}
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
            <ErrorMessage
              name="confirmationCode"
              component={AnimatedError}
              centered
            />
          </div>

          <button className="button-styles mb-4" type="submit">
            {translate("key_end_registration")}
          </button>
        </Form>
      )}
    </Formik>
  );
}
