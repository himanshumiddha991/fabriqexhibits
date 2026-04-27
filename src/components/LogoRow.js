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
const LogoRow = ({ reverse = false }) => {
  // ✅ local state for fresh data
  const [localGallery, setLocalGallery] = useState([]);
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(45);

  const reduxGallery = useSelector((s) => s.gallery.data);

  // ✅ persistent merged images
  const [mergedImages, setMergedImages] = useState([]);

  // ✅ fetch all pages
  const fetchAllGallery = async () => {
    try {
      let page = 1;
      let allData = [];
      let totalPages = 1;

      while (page <= totalPages) {
        const res = await api.get(`/api/gallary?tag=countries&page=${page}`);

        const { data, totalPages: tp } = res.data;

        allData = [...allData, ...data];
        totalPages = tp;
        page++;
      }

      // ✅ convert to image URLs
      const newImages = allData
        .filter(
          (item) =>
            item?.media?.file_type === "image" &&
            item?.tags?.toLowerCase().includes("countries"),
        )
        .map(
          (img) => `${process.env.REACT_APP_API_URL}/${img?.media?.file_path}`,
        );

      // ✅ merge with existing (no duplicates)
      setMergedImages((prev) => {
        const existingSet = new Set(prev);

        const filteredNew = newImages.filter((img) => !existingSet.has(img));

        // 👉 shuffle only new ones
        const shuffledNew = shuffleArray(filteredNew);

        return [...prev, ...shuffledNew];
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ initial load (use redux first)
  useEffect(() => {
    if (reduxGallery?.length && !mergedImages.length) {
      const initialImages = reduxGallery
        .filter(
          (item) =>
            item?.media?.file_type === "image" &&
            item?.tags?.toLowerCase().includes("countries"),
        )
        .map(
          (img) => `${process.env.REACT_APP_API_URL}/${img?.media?.file_path}`,
        );

      setMergedImages(shuffleArray(initialImages));
    }

    fetchAllGallery();
  }, []);

  // ✅ scrolling list (duplicate for infinite loop)
  const scrollingLogos = useMemo(() => {
    return [...mergedImages, ...mergedImages];
  }, [mergedImages]);

  useEffect(() => {
    if (trackRef.current) {
      const width = trackRef.current.scrollWidth;
      const SPEED = 100; // px per second (adjust this 👈)
      const calculatedDuration = width / SPEED;
      setDuration(calculatedDuration);
    }
  }, [scrollingLogos]);
  return (
    <Box className="logo-slider">
      <Box
        ref={trackRef}
        className={`logo-track ${reverse ? "reverse" : ""}`}
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        {scrollingLogos.map((logo, index) => (
          <Box key={index} className="scrollContainer">
            <Image src={logo} maxH="50px" objectFit="contain" opacity={0.8} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LogoRow;
