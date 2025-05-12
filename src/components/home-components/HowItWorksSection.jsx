import emotionAnalysisJPG from "@assets/images/emotion-analysis.jpg";
import emotionAnalysisWEBP from "@assets/images/emotion-analysis.webp";
import ImageWithLazyLoader from "@components/ImageWithLazyLoader";
import translate from "@utils/translate";
import { SafeMotion } from "@components/SafeMotion";

export default function HowItWorksSection() {
  return (
    <section className="w-full py-4 sm:py-12 text-center p-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto gap-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          {translate("key_see_how_it_works")}
        </h2>
        <SafeMotion
          initial={{ opacity: 0, transform: "translateY(-20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.13 }}
          className="bg-gray-800 p-6 rounded-lg flex flex-col gap-4 sm:shadow-md text-center mx-auto max-w-[1000px] border-primary border-b-8"
        >
          <div className="relative w-full pt-[70%]">
            <picture className="absolute flex items-center justify-center inset-0 w-full h-full">
              <source srcSet={emotionAnalysisWEBP} type="image/webp" />
              <ImageWithLazyLoader
                src={emotionAnalysisJPG}
                alt="Emotion Analysis"
                className="rounded-2xl items-center justify-center h-full"
                skeletonType="shimmer"
              />
            </picture>
          </div>
        </SafeMotion>
      </div>
    </section>
  );
}
