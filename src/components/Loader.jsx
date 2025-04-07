import { motion } from "framer-motion";
import {
    BarLoader,
    CircleLoader,
    PropagateLoader,PulseLoader
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

export const Loader = ({ color = "#00bfff" }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <LoaderContainer><BarLoader height="10" width="200" color={color} ariaLabel="bars-loading" /></LoaderContainer>
      <LoaderContainer><CircleLoader height="80" width="80" color={color} ariaLabel="bars-loading" /></LoaderContainer>
      <LoaderContainer><PropagateLoader height="80" width="80" color={color} ariaLabel="bars-loading" /></LoaderContainer>
      <LoaderContainer><PulseLoader speedMultiplier={0.7} height="80" width="80" color={color} ariaLabel="bars-loading" /></LoaderContainer>
      <LoaderContainer className="w-5 h-5 loading loading-spinner loading-xs"></LoaderContainer>
    </div>
  );
};
