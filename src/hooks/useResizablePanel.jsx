import { useState, useCallback, useEffect, useRef } from "react";

export const useResizablePanel = (
  initialWidth = 200,
  minWidth = 70,
  maxWidth = 400
) => {
  const [width, setWidth] = useState(initialWidth);
  const isResizing = useRef(false);
  const lastKnownWidth = useRef(width); 

  useEffect(() => {
    const handleResize = () => {
      const availableWidth = window.innerWidth - 5;
      if (width > availableWidth) {
        setWidth(Math.max(minWidth, Math.min(availableWidth, maxWidth)));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width, minWidth, maxWidth]);

  const onMouseDown = useCallback(
    (e) => {
      isResizing.current = true;
      const startX = e.clientX;
      const startWidth = width;

      document.body.style.userSelect = "none"; 

      const onMouseMove = (e) => {
        if (!isResizing.current) return;

        window.requestAnimationFrame(() => {
          const deltaX = e.clientX - startX;
          const newWidth = Math.min(
            maxWidth,
            Math.max(minWidth, startWidth + deltaX)
          );
          if (Math.abs(newWidth - lastKnownWidth.current) > 0.1) {
            setWidth(newWidth);
            lastKnownWidth.current = newWidth;
          }
        });
      };

      const onMouseUp = () => {
        isResizing.current = false;

        document.body.style.userSelect = "auto"; 

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [width, minWidth, maxWidth]
  );

  return { width, onMouseDown };
};
