import axios from "axios";
import { showToast } from "@utils/toast";

const formatDate = (d) => {
  if (!d) {
    return "";
  }
  if (typeof d === "string") {
    return d;
  }
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

export const handleFirstStepSubmit = (values, setStep, setRegistrationData) => {
  const partialData = {
    phone: values.phone.replace(/\D/g, ""),
    password: values.password,
    password_confirmation: values.confirmPassword,
    nickname: `${values.surname} ${values.name}`,
    birthdate: formatDate(values.date),
  };
  console.log("partialData", partialData);

  setRegistrationData(partialData);
  setStep(2);
};

export const handleSecondStepSubmit = async (
  email,
  registrationData,
  setStep,
) => {
  const payload = {
    user: {
      ...registrationData,
      email,
    },
  };

  console.log("payload", payload);

  try {
    const response = await axios.post(
      "https://signalforge.onrender.com/api/v1/auth/sign_up",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200 || response.status === 201) {
      showToast("На почту отправлен код подтверждения", "info");
      setStep(4);
    } else {
      showToast("Ошибка при регистрации", "error");
      console.log("Ошибка регистрации", response.data);
    }
  } catch (error) {
    console.error("Ошибка запроса", error);
    showToast("Ошибка сервера, попробуйте позже.", "error");
  }
};

export const handleThirdStepSubmit = async (values, setStep) => {
  try {
    showToast("Код подтверждения верен");
    setStep(4);
    const response = await axios.post("https://api/ivan", values);
    if (response.status === 200) {
      console.log("все ок!");
      // window.location.href = "/profile";
    } else {
      console.log("ошибка!", response.data);
      showToast("Код подтверждения неверен. \n Повторите попытку", "error");
    }
  } catch (error) {
    console.log("иван error", error);
    showToast("Ошибка сервера, попробуйте позже.", "error");
  }
};
