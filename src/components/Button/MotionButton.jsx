import React from "react";
import { motion } from "framer-motion";

const MotionButton = ({ children }) => {
  return (
    <motion.div
      whileInView={{ width: "100%" }}
      whileHover={{
        scale: 1.1,
        transition: { type: "spring", stiffness: 400, damping: 10 },
        textShadow: "0px 0px 8px rgb(255,255,255)",
        width: "95%",
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionButton;
