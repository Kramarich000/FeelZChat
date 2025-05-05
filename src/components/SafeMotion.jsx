import { useReducedMotion, motion } from "framer-motion";
import { useMediaQuery } from "@hooks/useMediaQuery";

export const SafeMotion = ({
  children,
  initial,
  animate,
  exit,
  transition,
  as = "div",
  ...rest
}) => {
  const shouldReduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 639px)");
  const Component = motion[as] || motion.div;

  // Если нужно отключить анимацию — рендерим обычный элемент
  if (shouldReduce || isMobile) {
    const Fallback = as;
    return <Fallback {...rest}>{children}</Fallback>;
  }

  return (
    <Component
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...rest}
    >
      {children}
    </Component>
  );
};
