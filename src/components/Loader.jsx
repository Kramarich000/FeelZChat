import { motion } from "framer-motion";

export const Loader = ({ fullScreen = true }) => (
  <motion.div
    className={`flex items-center justify-center ${
      fullScreen ? "h-screen w-full" : "h-full w-full"
    }`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="w-12 h-12 border-4 border-cyan-700 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  </motion.div>
);