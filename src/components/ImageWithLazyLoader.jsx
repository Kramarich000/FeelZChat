import useComponentLoad from "@hooks/useComponentLoad";
import Loader from "@components/Skeleton";
import { BsEmojiDizzy } from "react-icons/bs";
import LazyLoad from "react-lazyload";
const ImageWithLazyLoader = ({ src, alt, skeletonType = "default" }) => {
  const { isLoading, handleLoad, handleError, hasError } = useComponentLoad();

  return (
    <Loader isLoading={isLoading} skeletonType={skeletonType}>
      {hasError ? (
        <>
          <div className="flex flex-col gap-y-5 sm:gap-y-10 items-center justify-center w-full h-full">
            <BsEmojiDizzy className="w-1/2 h-1/2 mx-auto text-gray-400" />
            <p className="text-lg sm:text-3xl">Ой! Что-то пошло не так!</p>
          </div>
        </>
      ) : (
        <LazyLoad height={400}>
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className="w-full h-full object-cover rounded-lg object-top"
          />
        </LazyLoad>
      )}
    </Loader>
  );
};

export default ImageWithLazyLoader;
