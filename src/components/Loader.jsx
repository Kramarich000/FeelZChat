import { PulseLoader } from "react-spinners";
import { SafeMotion } from "@components/SafeMotion";
import { AnimatePresence } from "framer-motion";

const LoaderContainer = ({ children }) => (
  <AnimatePresence>
    <SafeMotion
      className="flex items-center justify-center min-h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </SafeMotion>
  </AnimatePresence>
);

const Loader = ({ color = "rgb(14 116 144)" }) => {
  return (
    <LoaderContainer>
      <PulseLoader speedMultiplier={0.7} size={50} color={color} />
    </LoaderContainer>
  );
};

export default Loader;
