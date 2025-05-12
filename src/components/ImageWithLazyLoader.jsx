import useComponentLoad from "@hooks/useComponentLoad";
import ImageElementLoader from "@components/ElementLoader";
import { BsEmojiDizzy } from "react-icons/bs";
import ImageLazyLoad from "react-lazyload";
const ImageWithLazyLoader = ({ src, alt, skeletonType = "default" }) => {
  const { isLoading, handleLoad, handleError, hasError } = useComponentLoad();

  return (
    <ImageElementLoader
      isLoading={isLoading}
      skeletonType={skeletonType}
      className="justify-center"
    >
      {hasError ? (
        <>
          <div className="flex flex-col sm:gap-2 items-center justify-center w-full">
            <BsEmojiDizzy className="w-1/2 h-1/2 mx-auto text-gray-400" />
            <p className="text-lg sm:text-3xl">Ой! Что-то пошло не так!</p>
          </div>
        </>
      ) : (
        <ImageLazyLoad height={400}>
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className="w-full h-full object-cover rounded-lg object-top"
          />
        </ImageLazyLoad>
      )}
    </ImageElementLoader>
  );
};

export default ImageWithLazyLoader;
