import React, { useEffect, useState, useRef } from "react";
import { Box, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import logo1 from "../images/logoipsum-348.png";
import logo2 from "../images/logoipsum-377.png";
import logo3 from "../images/logoipsum-408.png";
import logo4 from "../images/logoipsum-418.png";
import logo5 from "../images/logoipsum-419.png";
import logo6 from "../images/logoipsum-420.png";
import api from "../utils/api";
// ✅ shuffle helper
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
const LogoRow = ({ reverse = false, images = [] }) => {
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(45);

  useEffect(() => {
    if (trackRef.current) {
      const width = trackRef.current.scrollWidth;
      const SPEED = 50; // px per second (adjust this 👈)
      const calculatedDuration = width / SPEED;
      setDuration(calculatedDuration);
    }
  }, [images]);

  return (
    <Box className="logo-slider">
      <Box
        ref={trackRef}
        className={`logo-track ${reverse ? "reverse" : ""}`}
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        {images.map((logo, index) => (
          <Box key={index} className="scrollContainer">
            <Image src={logo} maxH="50px" objectFit="contain" />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LogoRow;
