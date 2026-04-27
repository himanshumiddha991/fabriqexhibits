import React, { useEffect, useState, useCallback, useMemo } from "react";
import Banner from "../components/Banner";
import { useSelector } from "react-redux";
import api from "../utils/api";
import MediaModal from "../components/MediaModal";
import {
  Box,
  Text,
  SimpleGrid,
  HStack,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import BannerBg from "../images/banner/2.jpg";
const Portfolio = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedMedia, setSelectedMedia] = useState(null);
  const openMedia = (item) => {
    console.log("item", item);
    setSelectedMedia({
      type: item?.media?.file_type,
      url: `${process.env.REACT_APP_API_URL}/${item?.media?.file_path}`,
      title: item?.media?.title,
      description: item?.media?.description,
    });
    onOpen();
  };

  // image loading
  const [gallery, setGallery] = useState([]);
  const [mediaTag, setMediaTag] = useState("international");

  // ✅ internal pagination state
  const [visibleCount, setVisibleCount] = useState(8);

  const limit = 50;

  // ✅ merge + dedupe
  const mergeUniqueById = (oldData, newData) => {
    const map = new Map();

    oldData.forEach((item) => map.set(item.id, item));
    newData.forEach((item) => map.set(item.id, item));

    return Array.from(map.values());
  };

  // ✅ fetch all pages
  const getGallery = useCallback(async () => {
    try {
      let page = 1;
      let totalPages = 1;
      let allData = [];

      while (page <= totalPages) {
        const res = await api.get(
          `/api/gallary?page=${page}&limit=${limit}&tag=${mediaTag}`,
        );

        if (res.data.success) {
          allData = [...allData, ...res.data.data];
          totalPages = res.data.totalPages;
        }

        page++;
      }

      // ✅ merge
      setGallery((prev) => mergeUniqueById(prev, allData));
    } catch (error) {
      console.log(error);
    }
  }, [mediaTag]);

  useEffect(() => {
    getGallery();

    // ✅ reset visible count when tag changes
    setVisibleCount(8);
  }, [getGallery]);

  // ✅ filter
  const imageGallery = useMemo(() => {
    return gallery.filter(
      (item) =>
        item?.media?.file_type === "image" &&
        item?.tags?.toLowerCase().includes(mediaTag),
    );
  }, [gallery, mediaTag]);

  // ✅ slice for internal pagination
  const visibleImages = useMemo(() => {
    return imageGallery.slice(0, visibleCount);
  }, [imageGallery, visibleCount]);
  return (
    <>
      <Banner heading="Portfolio" BannerBg={BannerBg} />
      <Box py={20} px={8}>
        <HStack spacing={4} pb={10} justifyContent={"center"} wrap="wrap">
          <Button
            onClick={() => setMediaTag("international")}
            bg={mediaTag === "international" ? "black" : "transparent"}
            color={
              mediaTag === "international" ? "white" : "var(--color-text-faded)"
            }
            className={`hoverDark ${mediaTag === "international" ? "active" : ""}`}
          >
            International Work
          </Button>

          <Button
            onClick={() => setMediaTag("showcasing-stands")}
            bg={mediaTag === "showcasing-stands" ? "black" : "transparent"}
            color={
              mediaTag === "showcasing-stands"
                ? "white"
                : "var(--color-text-faded)"
            }
            className={`hoverDark ${mediaTag === "showcasing-stands" ? "active" : ""}`}
          >
            Showcasing Stands Across India
          </Button>
          <Button
            onClick={() => setMediaTag("awards")}
            bg={mediaTag === "awards" ? "black" : "transparent"}
            color={mediaTag === "awards" ? "white" : "var(--color-text-faded)"}
            className={`hoverDark ${mediaTag === "awards" ? "active" : ""}`}
          >
            Award Wining Stalls
          </Button>
          <Button
            onClick={() => setMediaTag("retail-interiors")}
            bg={mediaTag === "retail-interiors" ? "black" : "transparent"}
            color={
              mediaTag === "retail-interiors"
                ? "white"
                : "var(--color-text-faded)"
            }
            className={`hoverDark ${mediaTag === "retail-interiors" ? "active" : ""}`}
          >
            Retail/Office Interiors
          </Button>
          <Button
            onClick={() => setMediaTag("theme-events")}
            bg={mediaTag === "theme-events" ? "black" : "transparent"}
            color={
              mediaTag === "theme-events" ? "white" : "var(--color-text-faded)"
            }
            className={`hoverDark ${mediaTag === "theme-events" ? "active" : ""}`}
          >
            Graphic Designing
          </Button>
        </HStack>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {visibleImages.map((item) => (
            <Box
              key={item.id}
              h="280px"
              position="relative"
              overflow="hidden"
              role="group"
              cursor="pointer"
            >
              <Box
                bgGradient="linear(to-t, rgba(0,0,0,0.9), rgba(0,0,0,0))"
                height={"100%"}
                borderRadius={"10px"}
                width={"100%"}
                position={"absolute"}
              ></Box>
              {/* Image */}
              <Image
                src={`${process.env.REACT_APP_API_URL}/${item.media.file_path}`}
                w="100%"
                h="100%"
                borderRadius={"10px"}
                className="Fab_card"
                objectFit="cover"
                transition="0.6s"
                _groupHover={{ transform: "scale(1.1)" }}
                onClick={() => openMedia(item)}
              />
              <Text
                py={"10px"}
                position={"absolute"}
                bottom={"0"}
                padding={"10px"}
                color="white"
              >
                {item.media.title}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
        {/* Load More */}
        {visibleCount < imageGallery.length && (
          <Box display="flex" justifyContent={"center"} py={12}>
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              style={{
                color: "black",
                background: "var(--color-primary)",
                borderRadius: "8px", // ✅ radius
                padding: "10px 20px", // ✅ padding
                fontWeight: "600", // ✅ font weight
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Load More
            </button>
          </Box>
        )}
      </Box>
      <MediaModal
        isOpen={isOpen}
        onClose={onClose}
        media={selectedMedia}
        ShowTitle={true}
      />
    </>
  );
};

export default Portfolio;
