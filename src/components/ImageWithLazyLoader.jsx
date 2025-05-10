import useComponentLoad from "@hooks/useComponentLoad";
import Loader from "@components/Skeleton";
import LazyLoad from "react-lazyload";
const ImageWithLazyLoader = ({ src, alt, skeletonType = "default" }) => {
  const { isLoading, handleLoad, handleError } = useComponentLoad();

  return (
    <Loader isLoading={isLoading} skeletonType={skeletonType}>
      <LazyLoad height={400}>
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full object-cover rounded-lg object-top"
        />
      </LazyLoad>
    </Loader>
  );
};

export default ImageWithLazyLoader;
