import * as Yup from "yup";
import { subYears } from "date-fns/subYears";
import leoProfanity from "leo-profanity";

leoProfanity.loadDictionary("ru");

const formatPhoneNumber = (value) => {
  if (typeof value !== "string") return "";
  value = value.replace(/\D/g, "");
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  let formattedValue = "+7";
  if (value.length > 1) {
    formattedValue += " (" + value.slice(1, 4);
  }
  if (value.length > 4) {
    formattedValue += ") " + value.slice(4, 7);
  }
  if (value.length > 7) {
    formattedValue += "-" + value.slice(7, 9);
  }
  if (value.length > 9) {
    formattedValue += "-" + value.slice(9, 11);
  }
  return formattedValue;
};

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Имя обязательно")
    .min(2, "Минимум 2 буквы")
    .max(30, "Максимум 30 букв")
    .matches(/^[А-ЯЁ][а-яё]+$/, "Имя должно быть на русском и с заглавной буквы")
    .test("no-profanity", "Имя не должно содержать нецензурных слов", (value) => !leoProfanity.check(value)),
  surname: Yup.string()
    .required("Фамилия обязательна")
    .min(2, "Минимум 2 буквы")
    .matches(/^[А-ЯЁ][а-яё]+$/, "Фамилия должна быть на русском и с заглавной буквы")
    .test("no-profanity", "Фамилия не должна содержать нецензурных слов", (value) => !leoProfanity.check(value)),
  phone: Yup.string()
    .required("Телефон обязателен")
    .test(
      "is-correct-phone",
      "Введите корректный номер телефона в формате +7 (900) 473-59-01",
      (value) => {
        if (!value) return false;
        const formattedPhone = formatPhoneNumber(value);
        return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formattedPhone);
      }
    ),
  date: Yup.date()
    .required("Дата рождения обязательна")
    .max(subYears(new Date(), 16), "Вам должно быть не менее 16 лет"),
  password: Yup.string()
    .required("Пароль обязателен")
    .min(8, "Пароль должен содержать минимум 8 символов")
    .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
    .matches(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
    .matches(/[\W_]/, "Пароль должен содержать хотя бы один специальный символ (например, !, @, #)")
    .test("no-profanity", "Пароль не должен содержать нецензурных слов", (value) => !leoProfanity.check(value)),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли должны совпадать")
    .required("Подтвердите пароль")
    .test("no-profanity", "Пароль не должен содержать нецензурных слов", (value) => !leoProfanity.check(value)),
  agreement: Yup.boolean().oneOf([true], "Необходимо принять политику"),
});

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Некорректный email")
    .required("Введите email")
    .test("no-profanity", "Пожалуйста не ругайтесь", (value) => !leoProfanity.check(value)),
});

const confirmationCodeSchema = Yup.object().shape({
  confirmationCode: Yup.string()
    .length(6, "Код должен состоять из 6 символов")
    .required("Введите код подтверждения")
    .test("no-profanity", "Пожалуйста не ругайтесь", (value) => !leoProfanity.check(value)),
});

export {
  registerSchema,
  emailSchema,
  confirmationCodeSchema,
  formatPhoneNumber,
};
