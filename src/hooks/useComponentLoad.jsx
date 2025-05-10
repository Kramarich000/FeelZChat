import { useState } from "react";

const useComponentLoad = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    console.error("Image failed to load");
  };

  return {
    isLoading,
    handleLoad,
    handleError,
  };
};

export default useComponentLoad;
