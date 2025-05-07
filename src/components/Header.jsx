import { SafeMotion } from "@components/SafeMotion";
import translate from "@utils/translate";
import Logo from "../animations/logoAnimation";
import PrefetchLink from "@components/PrefetchLink";

export default function Header() {
  return (
    <header className="w-full mt-6 sm:py-0 max-w-[1280px] px-4 mx-auto">
      <SafeMotion
        initial={{ transform: "translateY(-150%)" }}
        animate={{ transform: "translateY(0)" }}
        viewport={{ once: true }}
        className="
          max-w-[1280px]
          relative
          border-b-8 border-primary
          sm:shadow-[0px_6px_24px_rgba(0,0,0,0.5)]
          m-4 mt-4 container mx-auto z-9998
          bg-white overflow-hidden
          rounded-4xl p-5 min-h-[100px]
          transition-all 
          group
        "
      >
        <div className="mx-auto flex justify-between items-center relative overflow-hidden">
          <PrefetchLink
            className="block order-0"
            to="/"
            aria-label="Go to main page"
          >
            <Logo />
          </PrefetchLink>
          <div className="order-2 flex gap-1 mr-2">
            <SafeMotion transition={{ type: "tween" }}>
              <PrefetchLink
                className="hover:underline text-[14px] sm:text-[16px] hover:text-shadow-[0px_0px_1px_#0E7490] text-primary"
                to="/login"
              >
                {translate("key_login")}
              </PrefetchLink>
            </SafeMotion>
            <span className="text-primary">/</span>
            <SafeMotion transition={{ type: "tween" }}>
              <PrefetchLink
                className="hover:underline text-[14px] sm:text-[16px] hover:text-shadow-[0px_0px_1px_#0E7490] text-primary"
                to="/register"
              >
                {translate("key_register")}
              </PrefetchLink>
            </SafeMotion>
          </div>
        </div>
      </SafeMotion>
    </header>
  );
}
