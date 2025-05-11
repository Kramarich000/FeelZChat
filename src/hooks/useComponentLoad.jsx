import { useState } from "react";

const useComponentLoad = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error("Image failed to load");
  };

  return {
    isLoading,
    hasError,
    handleLoad,
    handleError,
  };
};

export default useComponentLoad;
