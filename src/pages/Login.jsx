import BgGradient from "@components/BgGradient";
import GoogleAuth from "@components/GoogleAuth";
import { loginSchema } from "@validate/loginSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PrefetchLink from "@components/PrefetchLink";
import { formatPhoneNumber } from "@validate/registerSchema";
import AnimatedError from "@components/AnimatedError";
import { handleLoginSubmit } from "@services/loginHandlers";
import translate from "@utils/translate";
import HelpButton from "@components/HelpButton";
import useRecaptchaLanguage from "@hooks/useRecaptchaLanguage";
import { SafeMotion } from "@components/SafeMotion";
import useMediaQuery from "@hooks/useMediaQuery";
import { useLockBodyScroll } from "@hooks/useLockBodyScroll";
import CustomCheckbox from "@components/CustomCheckbox";
import handleCaptcha from "@services/captchaHandler";
import ReCAPTCHA from "react-google-recaptcha";
import LoginForm from "@components/login-components/LoginForm";

export default function Login() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  useRecaptchaLanguage();
  useLockBodyScroll(true);
  // const Input = ({ type, placeholder }) => (
  //   <input
  //     className="input-styles"
  //     type={type}
  //     placeholder={placeholder}
  //     required
  //   />
  // );
  return (
    <BgGradient>
      <SafeMotion
        initial={{ opacity: 0, transform: "translateX(50px)" }}
        animate={{ opacity: 1, transform: "translateX(0)" }}
        exit={{ opacity: 0, transform: "translateX(50px)" }}
        transition={{ duration: 0.5 }}
        className="container flex flex-col 2xl:flex-row gap-y-4 justify-between w-[95%] items-center"
      >
        <PrefetchLink
          to={"/"}
          className="flex items-center justify-center hover:scale-110 transition-all"
        >
          <h1 className="main-title flex text-4xl sm:text-7xl font-bold items-center justify-center text-shadow-[-1px_3px_6px]">
            {translate("key_app_name")}
          </h1>
        </PrefetchLink>
        <LoginForm />
        {isMobile && <HelpButton />}
      </SafeMotion>
      {!isMobile && <HelpButton />}
    </BgGradient>
  );
}
