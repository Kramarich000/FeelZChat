import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { lazy, Suspense } from "react";
import { Scrollbar, Autoplay } from "swiper/modules";
import { SafeMotion } from "@components/SafeMotion";
import Loader from "@components/Loader";
const ReviewCard = lazy(
  () => import("@components/home-components/ReviewerCard"),
);
import reviews from "@data/reviewers";
import translate from "@utils/translate";
export default function MainSlider() {
  return (
    <div className="flex flex-col bg-gray-900 mx-auto p-4 items-center justify-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white">
        {translate("key_slider_section_title")}
      </h2>
      <SafeMotion
        as="p"
        initial={{ opacity: 0, transform: "translateY(75px) " }}
        whileInView={{ opacity: 1, transform: "translateY(0) " }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-6 text-[15px] sm:text-lg 
         text-white max-w-[1240px] bg-gray-800 p-4 rounded-lg"
      >
        Обратная связь от наших пользователей — главный источник вдохновения и
        развития. Каждый отзыв отражает реальные впечатления и помогает
        убедиться, что наш мессенджер сочетает в себе удобство, безопасность и
        современные возможности для эффективного общения.
      </SafeMotion>
      <Swiper
        scrollbar={{
          hide: false,
        }}
        autoplay={{ delay: 5000 }}
        spaceBetween={20}
        // loop={true}
        // centeredSlides={true}
        modules={[Scrollbar, Autoplay]}
        slidesPerView={1}
        breakpoints={{
          1040: {
            slidesPerView: 3,
          },

          700: {
            slidesPerView: 2,
          },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide className="h-[500px] !bg-gray-800" key={review.id}>
            <Suspense fallback={<Loader />}>
              <ReviewCard {...review} />
            </Suspense>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
