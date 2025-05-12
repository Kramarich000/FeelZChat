import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { generateFakeComments } from "@utils/faker";
import { Scrollbar, Autoplay } from "swiper/modules";
import ImageWithLazyLoader from "@components/ImageWithLazyLoader";
import translate from "@utils/translate";
export default function ScrollbarSlider() {
  const comments = generateFakeComments(10);

  return (
    <div className="mx-2 p-2">
      <Swiper
        scrollbar={{ hide: false }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Scrollbar, Autoplay]}
        className="scrollbar-slider max-w-[1080px] rounded-2xl"
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          1040: {
            slidesPerView: 2,
          },
        }}
      >
        {comments.map((comment, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl shadow-md p-4 h-[400px] flex flex-col">
              <div className="items-center gap-2 sm:gap-4 mb-4">
                <ImageWithLazyLoader
                  className="mx-auto"
                  src={comment.avatar}
                  alt="Reviewer Avatar"
                  skeletonType="shimmer"
                />

                <h4 className="mt-4 font-semibold text-sm sm:text-lg text-gray-800">
                  {comment.name}
                </h4>

                <div className="text-[14px]">
                  {translate("key_comment_date_text")}: {comment.date}
                </div>

                <div className="text-yellow-500 text-lg">
                  {"★".repeat(comment.rating)}
                  {"☆".repeat(5 - comment.rating)}
                </div>
                <p className="text-gray-600 col-span-3 text-sm sm:text-base">
                  {comment.text}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
