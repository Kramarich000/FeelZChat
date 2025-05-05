import translate from "@utils/translate";
import { SafeMotion } from "@components/SafeMotion";
import { BsQuestionSquareFill } from "react-icons/bs";
import PrefetchLink from "@components/PrefetchLink";
export default function HelpButton() {
  return (
    <SafeMotion
      initial={{ opacity: 0, transform: "translateY(50px)" }}
      animate={{ opacity: 1, transform: "translateY(0)" }}
      transition={{ duration: 0.5 }}
      className="help-btn-container !p-0 sm:absolute bottom-[10px] left-[12px] sm:bottom-[40px] sm:left-[40px] hover:border-black transition-colors bg-amber-50 border-primary border-b-8 rounded-4xl"
    >
      <PrefetchLink
        className="flex items-center justify-center gap-5 p-3"
        to={"/help"}
      >
        <p>{translate("key_have_questions")}</p>
        <BsQuestionSquareFill
          className="help-btn-icon"
          size={50}
          color="rgb(14, 116, 144)"
        />
      </PrefetchLink>
    </SafeMotion>
  );
}
