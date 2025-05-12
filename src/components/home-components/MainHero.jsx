import { SafeMotion } from "@components/SafeMotion";
import PrefetchLink from "@components/PrefetchLink";
import translate from "@utils/translate";
export default function MainHero() {
  return (
    <div className="main-section min-h-screen flex items-center justify-center text-center bg-opacity-40 p-4">
      <SafeMotion
        className="main-description max-w-3xl sm:shadow-[0px_6px_24px_rgba(0,0,0,0.5)] bg-white border-b-8 border-primary mx-auto p-10 rounded-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">
          {translate("key_welcome_to_feelzchat")}
        </h1>
        <p className="text-sm sm:text-lg mb-8">
          {translate("key_discover_a_new")}
        </p>
        <PrefetchLink
          to="/register"
          className="bg-primary hover:bg-black transition-all px-6 py-3 rounded-lg text-white"
        >
          {translate("key_start_chatting")}
        </PrefetchLink>
      </SafeMotion>
    </div>
  );
}
