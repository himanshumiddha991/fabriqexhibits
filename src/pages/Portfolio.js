import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import { useSelector } from "react-redux";
import { useMemo } from "react";
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
  const gallery = useSelector((s) => s.gallery.data);
  const [mediaTag, setMediaTag] = useState("international");

  const imageGallery = useMemo(() => {
    return gallery.filter(
      (item) => item?.media?.file_type === "image" && item?.tags === mediaTag,
    );
  }, [gallery, mediaTag]);
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
          {imageGallery.map((item) => (
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
