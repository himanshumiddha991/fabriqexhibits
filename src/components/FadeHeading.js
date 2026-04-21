import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Heading } from "@chakra-ui/react";

// ✅ define once (important)
const MotionHeading = motion(Heading);

const FadeHeading = ({ children, ...props }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <MotionHeading
      ref={ref}
      {...props}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </MotionHeading>
  );
};

export default FadeHeading;
