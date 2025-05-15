import { SafeMotion } from "@components/SafeMotion";
import translate from "@utils/translate";
import LazyLoad from "react-lazyload";
import emotionAnalysisJPG from "@assets/images/emotion-analysis.jpg";
import emotionAnalysisWEBP from "@assets/images/emotion-analysis.webp";
import SkeletonLoader from "@components/main-components/SkeletonLoader";
import { useState } from "react";

export default function HowItWorksSection() {
  const [isLoaded, setIsLoaded] = useState(false);

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
          <LazyLoad height={610} offset={100} once>
            <div className="relative">
              {!isLoaded && (
                <SkeletonLoader
                  height="610px"
                  width="100%"
                  borderRadius={8}
                  className="absolute top-0 left-0 w-full h-full"
                />
              )}
              <picture className="aspect-w-16 aspect-h-9">
                <source srcSet={emotionAnalysisWEBP} type="image/webp" />
                <img
                  src={emotionAnalysisJPG}
                  alt="Emotion Analysis"
                  loading="lazy"
                  className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setIsLoaded(true)}
                />
              </picture>
            </div>
          </LazyLoad>
        </SafeMotion>
      </div>
    </section>
  );
}
