import {
  Box,
  Text,
  Image,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
// import { FaPlay } from "react-icons/fa";
import play from "../images/play.png";
import { useState } from "react";
import MediaModal from "./MediaModal";

function MediaMasonry({ items, tag, ShowTitle = true }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const heights = [220, 220, 220, 220, 220, 220];

  const openMedia = (item) => {
    setSelectedMedia({
      type: item?.media?.file_type,
      url: `${process.env.REACT_APP_API_URL}/${item?.media?.file_path}`,
      title: item?.media?.title,
      description: item?.media?.description,
    });
    onOpen();
  };
  let media = [];
  if (tag) {
    media = items.filter((e) => e.tags === tag);
  } else {
    media = items;
  }
  const visibleItems = useBreakpointValue({
    base: media.slice(0, 4), // 📱 show only 4 items
    md: media, // 🖥 show all items
  });

  return (
    <>
      {/* Masonry container */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            base: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: "24px",
        }}
      >
        {visibleItems.map((item, index) => (
          <Box
            key={item.id}
            mb="24px"
            className="Fab_card"
            breakInside="avoid"
            borderRadius="16px"
            overflow="hidden"
            cursor="pointer"
            position="relative"
            onClick={() => openMedia(item)}
            // h={item.height}
            h={heights[index % heights.length]}
          >
            {/* Image / Thumbnail */}

            <Box
              as="img"
              src={`${process.env.REACT_APP_API_URL}/${item?.media?.thumbnail_path || item?.media?.file_path}`}
              alt="project"
              loading="lazy"
              width="100%"
              height="220px"
              style={{
                objectFit: "cover",
              }}
            />

            {/* Play icon for videos */}
            {item?.media?.file_type === "video" && (
              <Box
                position="absolute"
                inset="0"
                bg="rgba(0,0,0,0.35)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box className="process-card-wrapper">
                  <img
                    src={play}
                    width="48"
                    height="48"
                    loading="lazy"
                    alt="play icon"
                    className="process-card-image"
                    style={{ pointerEvents: "none" }}
                  />
                </Box>
              </Box>
            )}
            {ShowTitle && (item?.media?.title || item?.media?.description) && (
              <Box position="absolute" bottom="0" w="100%" h="200px">
                <Box
                  bgGradient="linear(to-t, rgba(0,0,0,0.9), rgba(0,0,0,0))"
                  height="100%"
                  width="100%"
                  position="absolute"
                />

                {/* Title */}
                {item?.media?.title && (
                  <Text
                    position="absolute"
                    bottom={item?.media?.description ? "30px" : "0"} // 👈 dynamic
                    m="10px"
                    color="white"
                    noOfLines={1}
                  >
                    {item?.media.title}
                  </Text>
                )}

                {/* Description */}
                {item?.media?.description && (
                  <Text
                    position="absolute"
                    bottom="0"
                    m="10px"
                    color="white"
                    noOfLines={1}
                  >
                    {item?.media.description}
                  </Text>
                )}
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Video Modal */}

      <MediaModal
        isOpen={isOpen}
        onClose={onClose}
        media={selectedMedia}
        ShowTitle={ShowTitle}
      />
    </>
  );
}

export default MediaMasonry;
