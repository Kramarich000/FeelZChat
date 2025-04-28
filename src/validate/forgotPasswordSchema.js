import * as Yup from "yup";
import leoProfanity from "leo-profanity";

leoProfanity.loadDictionary("ru");

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Некорректный email")
    .required("Введите email")
    .test(
      "no-profanity",
      "Пожалуйста не ругайтесь",
      (value) => !leoProfanity.check(value),
    ),
});

const confirmationCodeSchema = Yup.object().shape({
  confirmationCode: Yup.string()
    .length(6, "Код должен состоять из 6 символов")
    .required("Введите код подтверждения")
    .test(
      "no-profanity",
      "Пожалуйста не ругайтесь",
      (value) => !leoProfanity.check(value),
    ),
});

export { forgotPasswordSchema, confirmationCodeSchema };
