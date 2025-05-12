import { lazy, Suspense, useEffect } from "react";
import { Loader } from "@components/Loader";
import BgGradient from "@components/BgGradient";
import { useNavigate } from "react-router-dom";
import translate from "@utils/translate";
import PrefetchLink from "@components/PrefetchLink";
import HelpButton from "@components/HelpButton";
import useRecaptchaLanguage from "@hooks/useRecaptchaLanguage";
import { useResponsive } from "@hooks/useResponsive";
// import { useLockBodyScroll } from '@hooks/useLockBodyScroll';
import { SafeMotion } from "@components/SafeMotion";

import RegisterFormFirstStep from "@components/register-components/RegisterFormFirstStep";
const RegisterFormSecondStep = lazy(
  () => import("@components/register-components/RegisterFormSecondStep"),
);
const RegisterFormThirdStep = lazy(
  () => import("@components/register-components/RegiterFormThirdStep"),
);
const RegisterFormFourthStep = lazy(
  () => import("@components/register-components/RegisterFormFourthStep"),
);

import useRegisterStore from "@store/registerStore";

export default function Register() {
  const step = useRegisterStore((state) => state.step);

  const navigate = useNavigate();
  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);
  useRecaptchaLanguage();
  // useLockBodyScroll(true);

  const { isMobile, hasMounted } = useResponsive();
  if (!hasMounted) return null;

  return (
    <BgGradient>
      <SafeMotion
        initial={{ opacity: 0, transform: "translateX(50px)" }}
        animate={{ opacity: 1, transform: "translateX(0)" }}
        transition={{ duration: 0.5 }}
        className="container flex flex-col 2xl:flex-row gap-y-1 sm:gap-y-4 m-1 justify-between w-[95%] items-center"
      >
        <PrefetchLink
          to="/"
          className="flex items-center justify-center hover:scale-110 transition-all"
        >
          <h1 className="main-title py-2 sm:p-0 flex text-4xl sm:text-7xl font-bold items-center justify-center text-shadow-[-1px_3px_6px]">
            {translate("key_app_name")}
          </h1>
        </PrefetchLink>
        <section className="form-section text-[14px] sm:text-[16px] max-w-[650px] container bg-white p-4 sm:p-16 rounded-2xl border-b-primary border-b-8 z-50">
          <h2 className="text-2xl sm:text-3xl pb-2 sm:pb-10">
            {translate("key_register_1")}
          </h2>

          {step === 1 && <RegisterFormFirstStep />}
          <Suspense fallback={<Loader />}>
            {step === 2 && <RegisterFormSecondStep />}
            {step === 3 && <RegisterFormThirdStep />}
            {step === 4 && <RegisterFormFourthStep />}
          </Suspense>
        </section>
        {isMobile && <HelpButton />}
      </SafeMotion>
      {!isMobile && <HelpButton />}
    </BgGradient>
  );
}
