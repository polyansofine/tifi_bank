import { Box } from "@mui/material";
import React from "react";
import { motion } from "framer-motion/dist/framer-motion";
const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};
const imageVariants = {
  exit: { y: "10%", opacity: 0, transition },
  enter: {
    y: "0%",
    opacity: 1,
    transition,
  },
};
const ItemDetail = ({ children }) => {
  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <motion.div variants={imageVariants}>
        <Box
          sx={{
            p: 4,
            width: "100%",
            borderRadius: 4,
            border: "1px solid #445760",
            background: "#0E051E",
          }}
        >
          {children}
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default ItemDetail;
