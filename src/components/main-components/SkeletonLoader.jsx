import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({
  height,
  width = "100%",
  count = 1,
  borderRadius = 4,
  baseColor = "#000",
  highlightColor = "#0e7490",
  circle = false,
  className = "",
}) => {
  return (
    <Skeleton
      height={height}
      width={width}
      count={count}
      borderRadius={borderRadius}
      baseColor={baseColor}
      highlightColor={highlightColor}
      circle={circle}
      className={className}
    />
  );
};

export default SkeletonLoader;
