import { SafeMotion } from "@components/SafeMotion";
import translate from "@utils/translate";

export default function RegisterFormFouthStep() {
  return (
    <SafeMotion
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, transform: "transate: 50px" }}
      animate={{ opacity: 1, transform: "translateX(0)" }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-4xl">
        ✓
      </div>
      <p className="text-xl text-center">
        {translate("key_success_registration")}
      </p>
    </SafeMotion>
  );
}
