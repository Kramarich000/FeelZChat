import axios from "axios";
import { showToast } from "@utils/toast";  

export const handleFirstStepSubmit = async (values, setStep) => {
  try {
    showToast("На ваш адрес электронной почты отправлен код подтверждения", "success");
    const response = await axios.post("https://api/ivan", values);
    if (response.status === 200) {
      console.log("все ок!");
      setStep(2);
      showToast("На ваш адрес электронной почты отправлен код подтверждения", "success");
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
    const response = await axios.post("https://api/ivan", values);
    if (response.status === 200) {
      console.log("все ок!");
      setStep(3);
    } else {
      console.log("ошибка!", response.data);
    }
  } catch (error) {
    console.log("иван error", error);
  }
};

export const handleThirdStepSubmit = async (values) => {
  try {
    const response = await axios.post("https://api/ivan", values);
    if (response.status === 200) {
      console.log("все ок!");
      window.location.href = "/profile";
    } else {
      console.log("ошибка!", response.data);
    }
  } catch (error) {
    console.log("иван error", error);
  }
};
