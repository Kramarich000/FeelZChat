import React from 'react';
import { useReducedMotion, motion } from 'framer-motion';

export const SafeMotion = ({
  children,
  initial,
  animate,
  exit,
  transition,
  as = 'div',
  ...rest
}) => {
  const shouldReduce = useReducedMotion();
  const Component = motion[as] || SafeMotion;

  return (
    <Component
      initial={shouldReduce ? false : initial}
      animate={animate}
      exit={shouldReduce ? undefined : exit}
      transition={shouldReduce ? { duration: 0 } : transition}
      {...rest}
    >
      {children}
    </Component>
  );
};
