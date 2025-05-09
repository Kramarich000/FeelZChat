import { useReducedMotion, motion } from "framer-motion";
import useMediaQuery from "@hooks/useMediaQuery";

export const SafeMotion = ({
  children,
  initial,
  animate,
  exit,
  transition,
  whileInView,
  as = "div",
  ...rest
}) => {
  const shouldReduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 639px)");
  const Component = motion[as] || motion.div;

  // Фильтруем пропсы, чтобы не передавать whileInView в DOM элементы
  const filteredProps = { ...rest };
  if (whileInView) {
    filteredProps.whileInView = whileInView;
  }

  if (shouldReduce || isMobile) {
    const Fallback = as;
    return <Fallback {...filteredProps}>{children}</Fallback>;
  }

  return (
    <Component
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...filteredProps}
    >
      {children}
    </Component>
  );
};
