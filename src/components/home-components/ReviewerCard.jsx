import LazyLoad from "react-lazyload";
import SkeletonLoader from "@components/main-components/SkeletonLoader";
import { SafeMotion } from "@components/SafeMotion";
import translate from "@utils/translate";
import { useState, useEffect } from "react";

export default function ReviewCard({ avatar, name, joined, rating, comment }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-600"}
      >
        ★
      </span>
    ));

  // console.log('Avatar URL:', avatar);
  // console.log('isLoaded:', isLoaded);
  // console.log('shouldRenderImage:', shouldRenderImage);

  const handleImageLoad = () => {
    console.log("Image loaded");
    setIsLoaded(true);
  };

  const handleImageError = () => {
    console.warn("Image failed to load:", avatar);
    setIsLoaded(true);
  };

  return (
    <SafeMotion
      className="!bg-gray-800 border-2 border-primary h-[300px] shadow-md p-4 text-white"
      initial={{ opacity: 0, transform: "translateY(100px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0)" }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <LazyLoad height={300} offset={100} once>
        <div className="relative w-full h-full text-center">
          {!isLoaded && (
            <SkeletonLoader
              height="290px"
              width="100%"
              borderRadius={8}
              className="absolute top-0 left-0 z-10 bg-gray-600"
            />
          )}

          <img
            src={avatar}
            alt={name}
            loading="lazy"
            className={`rounded-full mx-auto mb-2.5 object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>

        {isLoaded && (
          <>
            <h4 className="font-semibold text-lg mt-2">{name}</h4>
            <p className="text-sm text-gray-400 mb-2">
              {translate("key_reviewer_date_registration")} {joined}
            </p>
            <div className="flex justify-center mb-2">{renderStars()}</div>
            <p className="text-gray-300 text-[12px] xs:text-sm">{comment}</p>
          </>
        )}
      </LazyLoad>
    </SafeMotion>
  );
}
