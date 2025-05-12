import Skeleton from "@components/Skeleton";

const ImageElementLoader = ({
  children,
  isLoading,
  skeletonType = "default",
  className = "",
  ...props
}) => {
  return (
    <div {...props} className={`${className} w-full flex`}>
      {isLoading &&
        (skeletonType === "shimmer" ? (
          <div className="absolute inset-0 shimmer-loader rounded z-10" />
        ) : (
          <div className="absolute inset-0 z-10">
            <Skeleton />
          </div>
        ))}
      <div
        className={isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}
      >
        {children}
      </div>
    </div>
  );
};

export default ImageElementLoader;
