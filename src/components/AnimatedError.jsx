import { motion, AnimatePresence } from "framer-motion";

const AnimatedError = ({ msg, centered }) => {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25 }}
          className={`absolute ${centered ? "left-1/2 -translate-x-1/2" : "left-0"} mt-1 bg-red-100 text-red-700 text-sm w-[260px] px-3 py-2 rounded-lg shadow-md z-10`}
        >
          {msg}
          <div
            className={`absolute top-0 ${centered ? "left-[25%] -translate-x-1/2" : "left-4"} w-3 h-3 bg-red-100 rotate-45 -translate-y-1/2`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedError;
