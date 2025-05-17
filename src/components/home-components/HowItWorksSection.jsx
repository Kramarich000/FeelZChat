import { SafeMotion } from "@components/SafeMotion";
import translate from "@utils/translate";
import LazyLoad from "react-lazyload";
import emotionAnalysisJPG from "@assets/images/emotion-analysis.jpg";
import emotionAnalysisWEBP from "@assets/images/emotion-analysis.webp";
import SkeletonLoader from "@components/main-components/SkeletonLoader";
import React, { useState } from "react";
import { comparisonData } from "@data/comparisonData";
import { scale } from "framer-motion";

export default function HowItWorksSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="w-full py-4 sm:py-12 text-center p-4 bg-gray-900 text-white">
      <div className="max-w-[1080px] mx-auto gap-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          {translate("key_see_how_it_works")}
        </h2>
        <SafeMotion
          as="p"
          initial={{ opacity: 0, transform: "translateY(75px) " }}
          whileInView={{ opacity: 1, transform: "translateY(0) " }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 text-[15px] sm:text-lg bg-gray-800 p-4 rounded-lg"
        >
          Мы объединили искусственный интеллект и интерфейс чата, чтобы вы
          чувствовали настроение собеседника даже между строк.
        </SafeMotion>

        <SafeMotion
          initial={{ opacity: 0, transform: "translateY(-20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.13 }}
          className="bg-gray-800 p-6 rounded-lg flex flex-col gap-4 sm:shadow-md text-center mx-auto max-w-[1080px] border-primary border-b-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-2 w-full max-w-5xl mx-auto rounded-2xl border-primary text-left">
            <SafeMotion
              as="h3"
              initial={{
                opacity: 0,
                x: -50,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{ once: true }}
              className="hidden sm:block p-4 text-center border-b-2 border-r-2 sm:border-r-0 border-primary text-2xl font-bold rounded-2xl"
            >
              Вы
            </SafeMotion>
            <SafeMotion
              as="h3"
              initial={{
                opacity: 0,
                x: 50,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{ delay: 2.5 }}
              className="hidden sm:block p-4 text-center border-b-2 border-l-2 sm:border-l-0 border-primary text-2xl font-bold rounded-2xl"
            >
              FeelZChat
            </SafeMotion>
            {comparisonData.map((item, index) => (
              <React.Fragment key={item.id}>
                <SafeMotion
                  as="p"
                  initial={{
                    opacity: 0,
                    x: -50,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 * (index + 1) }}
                  className="p-4 flex items-center justify-center text-sm sm:text-[16px] text-center border-b-2 border-r-2 sm:border-r-0 border-primary rounded-2xl rounded-bl-[0px] rounded-tr-[0px] sm:rounded-bl-2xl sm:rounded-tr-2xl"
                >
                  {item.user}
                </SafeMotion>
                <SafeMotion
                  as="p"
                  initial={{
                    opacity: 0,
                    x: 50,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 * (index + 1) + 2.5 }}
                  className="p-4 flex items-center justify-center text-sm sm:text-[16px] text-center border-b-2 border-l-2 sm:border-l-0  border-primary rounded-2xl rounded-tl-[0px] rounded-br-[0px] sm:rounded-tl-2xl sm:rounded-br-2xl"
                >
                  {item.ai}
                </SafeMotion>
              </React.Fragment>
            ))}
          </div>

          <LazyLoad height={610} offset={100} once>
            <div className="relative">
              {!isLoaded && (
                <div className="relative w-full aspect-[16/9]">
                  <SkeletonLoader className="absolute top-0 left-0 w-full h-full" />
                </div>
              )}
              <picture className="aspect-w-16 aspect-h-1">
                <source srcSet={emotionAnalysisWEBP} type="image/webp" />
                <img
                  src={emotionAnalysisJPG}
                  alt="Emotion Analysis"
                  loading="lazy"
                  className={`w-full brightness-95 h-full object-cover rounded-lg transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
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
