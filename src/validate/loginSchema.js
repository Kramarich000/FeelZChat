import * as Yup from "yup";
import leoProfanity from "leo-profanity";

leoProfanity.loadDictionary("ru");

const formatPhoneNumber = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  value = value.replace(/\D/g, "");
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  let formattedValue = "+7";
  if (value.length > 1) {
    formattedValue += ` (${value.slice(1, 4)}`;
  }
  if (value.length > 4) {
    formattedValue += `) ${value.slice(4, 7)}`;
  }
  if (value.length > 7) {
    formattedValue += `-${value.slice(7, 9)}`;
  }
  if (value.length > 9) {
    formattedValue += `-${value.slice(9, 11)}`;
  }
  return formattedValue;
};

const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Ввведите номер телефона")
    .test(
      "is-correct-phone",
      "Введите корректный номер телефона в формате +7 (012) 345-67-89",
      (value) => {
        if (!value) {
          return false;
        }
        const formattedPhone = formatPhoneNumber(value);
        return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formattedPhone);
      },
    ),
  password: Yup.string()
    .required("Введите пароль")
    .test(
      "no-profanity",
      "Пароль не должен содержать нецензурных слов",
      (value) => !leoProfanity.check(value),
    ),
});

export { loginSchema, formatPhoneNumber };
