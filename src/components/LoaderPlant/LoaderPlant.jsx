import React from "react";
import { motion } from "framer-motion";
import "./LoaderPlant.css";

const plantVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 2, ease: "easeOut" },
  },
};

const leafVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (direction) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 1 + direction * 0.5, duration: 1 },
  }),
};

const LoaderPlant = () => {
  return (
    <div className="loader-plant-fullscreen">
      <div className="loader-plant-container">
        <motion.div
          className="plant"
          variants={plantVariants}
          initial="hidden"
          animate="visible"
          style={{ transformOrigin: "bottom center" }}
        >
          <div className="stem"></div>
          <motion.div
            className="leaf left"
            custom={0}
            variants={leafVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className="leaf right"
            custom={1}
            variants={leafVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.div>

        <div className="pot"></div>

        <p className="loader-text">Growing data...</p>
      </div>
    </div>
  );
};

export default LoaderPlant;
