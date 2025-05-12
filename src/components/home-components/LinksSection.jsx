import { SafeMotion } from "@components/SafeMotion";
import translate from "@utils/translate";
import PrefetchLink from "@components/PrefetchLink";
export default function LinksSection() {
  return (
    <section className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full pt-4 sm:pt-12 px-4 text-center bg-gray-900 text-white">
      <SafeMotion
        initial={{ opacity: 0, transform: "translateY(10px)" }}
        whileInView={{ opacity: 1, transform: "translateY(0)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <PrefetchLink
          to="/login"
          className="text-2xl hover:underline text-primary font-bold"
        >
          {translate("key_sign_in")}
        </PrefetchLink>
      </SafeMotion>
      <p className="text-2xl">{translate("key_or")}</p>
      <SafeMotion
        initial={{ opacity: 0, transform: "translateY(10px)" }}
        whileInView={{ opacity: 1, transform: "translateY(0)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <PrefetchLink
          to="/register"
          className="text-2xl hover:underline text-primary font-bold"
        >
          {translate("key_sign_up")}
        </PrefetchLink>
      </SafeMotion>
    </section>
  );
}
