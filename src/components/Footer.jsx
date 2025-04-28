import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import translate from "@utils/translate";

export default function Footer() {
  return (
    <footer className="w-full text-[24px] p-4 bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mt-6">
          <motion.a
            className="hover:text-cyan-700 transition-all"
            href="#"
            aria-label="Facebook"
            transition={{ type: "tween", stiffness: 300 }}
          >
            <i className="fab fa-facebook-f"></i>
          </motion.a>

          <motion.a
            className="hover:text-cyan-700 transition-all"
            href="#"
            aria-label="X (Twitter)"
            transition={{ type: "tween", stiffness: 300 }}
          >
            <i className="fab fa-twitter"></i>
          </motion.a>

          <motion.a
            className="hover:text-cyan-700 transition-all"
            href="#"
            aria-label="Instagram"
            transition={{ type: "tween", stiffness: 300 }}
          >
            <i className="fab fa-instagram"></i>
          </motion.a>

          <motion.a
            className="hover:text-cyan-700 transition-all"
            href="#"
            aria-label="YouTube"
            transition={{ type: "tween", stiffness: 300 }}
          >
            <i className="fab fa-youtube"></i>
          </motion.a>
        </div>

        <div className="mt-2">
          <motion.div transition={{ type: "spring", stiffness: 300 }}>
            <Link
              to="/privacy"
              target="_blank"
              className="text-[20px] underline hover:text-cyan-700 transition-all"
            >
              {translate("key_privacy_policy")}
            </Link>
          </motion.div>
        </div>
      </div>
      <p className="text-[14px] mt-4">
        {translate("key_copyright_2025_feelzchat")}
      </p>
    </footer>
  );
}
