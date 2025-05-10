const Skeleton = () => {
  return (
    <div className="space-y-4">
      <div className="w-full h-48 bg-gray-300 animate-pulse rounded"></div>
      <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded"></div>
      <div className="w-5/6 h-6 bg-gray-300 animate-pulse rounded"></div>
    </div>
  );
};
const Loader = ({
  children,
  isLoading,
  skeletonType = "default",
  ...props
}) => {
  return (
    <div {...props} className="relative w-full h-full">
      {isLoading &&
        (skeletonType === "shimmer" ? (
          <div className="absolute inset-0 shimmer-loader rounded z-10" />
        ) : (
          <div className="absolute inset-0 z-10">
            <Skeleton />
          </div>
        ))}
      <div className={isLoading ? "invisible" : "visible"}>{children}</div>
    </div>
  );
};

export default Loader;
