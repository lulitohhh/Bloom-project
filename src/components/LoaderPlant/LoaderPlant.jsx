// src/components/common/LoaderPlant.jsx
import { motion } from "framer-motion";
import "./LoaderPlant.css";

const LoaderPlant = () => {
  return (
    <div className="loader-plant-container">
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="#EA67CB" strokeWidth="2">
          <path d="M50 80 V50" strokeLinecap="round" />
          <path d="M50 50 Q45 40 40 45" />
          <path d="M50 50 Q55 40 60 45" />
          <circle cx="50" cy="80" r="2" fill="#842883" />
        </g>
      </motion.svg>
      <p className="loader-text">Your garden is growing...</p>
    </div>
  );
};

export default LoaderPlant;
