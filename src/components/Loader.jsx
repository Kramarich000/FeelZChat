import { motion } from "framer-motion";
import {
  PulseLoader,
} from "react-spinners";

const LoaderContainer = ({ children }) => (
  <motion.div
    className="flex items-center justify-center h-full w-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

export const Loader = ({ color = "rgb(14 116 144)" }) => {
  return (
    <LoaderContainer>
      <PulseLoader
        speedMultiplier={0.7}
        size={50}
        color={color}
        ariaLabel="bars-loading"
      />
    </LoaderContainer>
  );
};
