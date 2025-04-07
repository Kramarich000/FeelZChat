import axios from "axios";
import { showToast } from "@utils/toast";  

export const handleFirstStepSubmit = async (values, setStep) => {
  setStep(2);
  try {
    showToast("На ваш адрес электронной почты отправлен код подтверждения", "info");

    const updatedValues = { ...values, message: "ПРИВЕТ НИКИТКА ААААААААААА!" };

    const response = await axios.post("https:///api/v1/auth/sign_up", updatedValues);
    if (response.status === 200) {
      console.log("все ок!");
      setStep(2);
      showToast("На ваш адрес электронной почты отправлен код подтверждения", "info");
    } else {
      console.log("ошибка!", response.data);
      showToast("Ошибка при регистрации, попробуйте снова.", "error");
    }
  } catch (error) {
    console.log("иван error", error);
    showToast("Ошибка сервера, попробуйте позже.", "error");
  }
};


export const handleSecondStepSubmit = async (values, setStep) => {
  try {
    setStep(3);
    showToast("На ваш адрес электронной почты отправлен код подтверждения", "info");
    const response = await axios.post("https://api/ivan", values);
    if (response.status === 200) {
      console.log("все ок!");
      showToast("На ваш адрес электронной почты отправлен код подтверждения", "info");
      setStep(3);
    } else {
      showToast("Код подтверждения неверен. \n Повторите попытку", "error")
      console.log("ошибка!", response.data);
    }
  } catch (error) {
    console.log("иван error", error);
    showToast("Ошибка сервера, попробуйте позже.", "error");

  }
};

export const handleThirdStepSubmit = async (values, setStep) => {
  try {
    showToast("Код подтверждения верен")
    setStep(4)
    const response = await axios.post("https://api/ivan", values);
    if (response.status === 200) {
      console.log("все ок!");
      // window.location.href = "/profile";
    } else {
      console.log("ошибка!", response.data);
      showToast("Код подтверждения неверен. \n Повторите попытку", "error")
    }
  } catch (error) {
    console.log("иван error", error);
    showToast("Ошибка сервера, попробуйте позже.", "error");

  }
};
