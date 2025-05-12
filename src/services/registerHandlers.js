import axios from "axios";
import { showToast } from "@utils/toast";
import useRegisterStore from "@store/registerStore";

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

export function handleFirstStepSubmit(values) {
  const { setStep, setRegistrationData, step } = useRegisterStore.getState();
  if (step !== 1) return;

  setRegistrationData({
    phone: values.phone.replace(/\D/g, ""),
    password: values.password,
    password_confirmation: values.confirmPassword,
    nickname: `${values.surname} ${values.name}`,
    birthdate: formatDate(values.date),
  });
  setStep(2);
}

export async function handleSecondStepSubmit(email) {
  const { registrationData, setStep } = useRegisterStore.getState();
  const payload = { user: { ...registrationData, email } };
  console.log(payload);

  try {
    const res = await axios.post(
      "https://signalforge.onrender.com/api/v1/auth/sign_up",
      payload,
      { headers: { "Content-Type": "application/json" } },
    );
    if (res.status === 200 || res.status === 201) {
      showToast("На почту отправлен код подтверждения", "info");
      setStep(3);
    } else {
      showToast("Ошибка при регистрации", "error");
    }
  } catch {
    setStep(3);
    showToast("Ошибка сервера, попробуйте позже.", "error");
  }
}
export async function handleThirdStepSubmit(values) {
  const { setStep } = useRegisterStore.getState();
  try {
    const response = await axios.post("https://api/ivan", values);
    if (response.status === 200) {
      showToast("Код подтверждения верен");
      console.log("все ок!");
      setStep(4);
    } else {
      setStep(4);
      console.log("ошибка!", response.data);
      showToast("Код подтверждения неверен. Повторите попытку", "error");
    }
  } catch (error) {
    setStep(4);
    console.log("Иван error", error);
    showToast("Ошибка сервера, попробуйте позже.", "error");
  }
}
