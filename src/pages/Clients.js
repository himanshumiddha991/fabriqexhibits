import React from "react";
import {
  Box,
  Container,
  Heading,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  GridItem,
  Text,
  Flex,
  VStack,
  Icon,
} from "@chakra-ui/react";
import fr from "../images/fr.webp";
import { CheckCircleIcon } from "@chakra-ui/icons";
import FadeHeading from "../components/FadeHeading";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import LogoRow from "../components/LogoRow";
import "../styles/clients.css";
import Banner from "../components/Banner";
import BannerBg from "../images/banner/4.jpg";
import model from "../images/projects/project_5.jpeg";
import MediaModal from "../components/MediaModal";
import model_2 from "../images/model_2.png";
import model_3 from "../images/model_3.png";
import vector_4 from "../images/svg/Vector_4.svg";
import vector_5 from "../images/svg/Vector_5.svg";
import vector_6 from "../images/svg/Vector_6.svg";
const Feature = ({ text }) => (
  <Flex align="start">
    <Icon
      as={CheckCircleIcon}
      color="var(--color-primary)"
      boxSize={5}
      mt="3px"
      mr={3}
    />
    <Text fontSize="md">{text}</Text>
  </Flex>
);
const Clients = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const heights = [320, 320]; // up / down pattern
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const openImage = (img) => {
    setSelectedImage(img);
    onOpen();
  };
  const gallery = useSelector((s) => s.gallery.data);
  const imageGallery = useMemo(() => {
    return gallery.filter(
      (item) =>
        item?.media?.file_type === "image" && item?.tags === "portfolio",
    );
  }, [gallery]);

  console.log("international gallery", imageGallery, gallery);

  const images = [
    model_2,
    model_3,
    "https://picsum.photos/seed/people2/1920/1080",
    "https://picsum.photos/seed/crowd4/1920/1080",
    "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=1920&q=80",
    model_3,
    "https://picsum.photos/seed/people2/1920/1080",
    model_3,
  ];
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
  const columnsCount = 4;

  // distribute images into columns
  const columns = Array.from({ length: columnsCount }, () => []);

  imageGallery.forEach((img, index) => {
    const colIndex = index % columnsCount;
    columns[colIndex].push(img);
  });

  // duplicate columns for infinite scroll
  const sliderColumns = [...columns, ...columns];
  return (
    <>
      <Banner heading="global Presence" BannerBg={BannerBg} />
      <Box bg="#f4f4f4" py={20}>
        <Container maxW="7xl">
          <Grid
            templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }}
            gap={12}
            alignItems="center"
          >
            {/* LEFT CONTENT */}
            <Box>
              {/* Heading */}
              <Flex align="center" mb={6}>
                <Box w="4px" h="40px" bg="var(--color-primary)" mr={4} />
                <FadeHeading textAlign={"center"} letterSpacing="1px">
                  Why Choose{" "}
                  <Text as="span" color="var(--color-primary)">
                    Us
                  </Text>
                </FadeHeading>
              </Flex>

              {/* Intro */}
              <Text fontSize="lg" mb={8}>
                <Text as="span" color="var(--color-primary)" fontWeight="bold">
                  Fabriq Exhibits
                </Text>{" "}
                Choose us for our unwavering reliability for seamless,
                world-class execution and total brand peace.
              </Text>

              {/* Features Card */}
              <Box
                bg="white"
                borderRadius="2xl"
                p={8}
                boxShadow="0 10px 30px rgba(0,0,0,0.05)"
              >
                <VStack align="start" spacing={5}>
                  <Feature text="Deliver Projects Globally" />
                  <Feature text="Possesses Strong Infrastructure " />
                  <Feature text="Follow a Design-Led Approach " />
                  <Feature text="Master in End-to-End Execution" />
                  <Feature text="Recognized across global platforms " />
                  <Feature text="Committed to delivering ONLY the best" />
                </VStack>
              </Box>
            </Box>

            {/* RIGHT IMAGE */}
            <Box position="relative">
              {/* Soft shadow bg */}
              <Box
                position="absolute"
                top="-20px"
                left="-20px"
                right="-20px"
                bottom="-20px"
                bg="#eadede"
                borderRadius="3xl"
                zIndex="0"
                transform={"rotate(-3deg)"}
              />

              <Image
                src={fr}
                borderRadius="3xl"
                position="relative"
                zIndex="1"
                objectFit="cover"
                w="100%"
                h={{ base: "300px", md: "400px" }}
              />
            </Box>
          </Grid>
        </Container>
      </Box>
      <Box py={{ base: 12, md: 20 }} display={"none"}>
        <Container maxW="5xl" position={"relative"}>
          <Box
            className="hero-dot"
            height={"200px"}
            width={"200px"}
            left={"-170px"}
            zIndex={"-1"}
            top={"-65px"}
          ></Box>
          <Image
            src={vector_6}
            alt="vector"
            position="absolute"
            top={["0px", "-36px"]}
            right={["-99px", "-160px"]}
            transform="translate(-50%, 0%)"
            h={["100px", "100px"]}
          />
          <Image
            src={vector_4}
            alt="vector"
            position="absolute"
            top={["10px", "10px"]}
            left={["-57px", "-57px"]}
            h={["53px", "53px"]}
            transform={"translate(-50%, 0%) scaleX(-1)"}
          />
          <Image
            src={vector_5}
            alt="vector"
            position="absolute"
            top={["-36px", "-36px"]}
            left={["-22px", "-22px"]}
            transform="rotate(45deg) translate(-50%, 0%)"
            h={["18px", "33px"]}
          />

          <Grid
            templateColumns={{ base: "1fr", md: "1.2fr 1fr" }}
            gap={{ base: 10, md: 16 }}
            alignItems="center"
          >
            {/* Left Content */}
            <GridItem>
              <Heading
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                mb={6}
              >
                Mrs. India Supranational
              </Heading>

              <Text fontSize="md" color="gray.700" mb={5} lineHeight="1.6">
                Mrs. India Supranational is a prestigious beauty pageant that
                transcends conventional notions of beauty. It is a platform that
                celebrates the multifaceted qualities of Indian women, from
                their grace and elegance to their intellect and social
                awareness. This pageant is not just about crowning a queen; it’s
                about empowering women and advocating for positive change.
              </Text>

              <Text fontSize="md" color="gray.700" lineHeight="1.6">
                Through this pageant, Indian women have the opportunity to
                inspire others, advocate for meaningful causes, and represent
                their nation on the global stage. Mrs. India Supranational is a
                celebration of beauty, grace, and empowerment, and it continues
                to inspire women across the country to reach for the stars.
              </Text>
            </GridItem>

            {/* Right Image */}
            <GridItem>
              <Image
                src={model}
                alt="Mrs India Supranational"
                borderRadius="xl"
                boxShadow="2xl"
                w="100%"
                objectFit="cover"
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Box position="relative" py={{ base: 16, md: 24 }} overflow="hidden">
        {/* Background Text */}

        <Heading
          fontSize={{ base: "70px", md: "180px" }}
          fontWeight="500"
          fontFamily={"Montserrat"}
          color="#0000002E"
          zIndex={0}
          userSelect="none"
          textAlign={"center"}
          mb={{ base: "-30px", md: "-50px" }}
        >
          Clients
        </Heading>

        <Container maxW="7xl" position="relative" zIndex={1}>
          <Box
            className="hero-dot"
            background={"#4399E2"}
            height={"300px"}
            width={"200px"}
            left={"-100px"}
            zIndex={"-1"}
            top={"-65px"}
          ></Box>
          <Box
            className="hero-dot"
            height={"300px"}
            width={"200px"}
            left={"25%"}
            zIndex={"-1"}
            top={"65%"}
          ></Box>
          <Box
            className="hero-dot"
            height={"300px"}
            width={"200px"}
            left={"50%"}
            zIndex={"-1"}
            top={"40%"}
          ></Box>
          <Box
            className="hero-dot"
            background={"#4399E2"}
            height={"300px"}
            width={"200px"}
            left={"auto"}
            zIndex={"-1"}
            top={"auto"}
            right={"0"}
            bottom={"0"}
          ></Box>
          {/* Mobile → Only 1 row */}
          <Box display={{ base: "block", md: "none" }}>
            <LogoRow />
          </Box>

          {/* Desktop → 5 rows */}
          <Box display={{ base: "none", md: "block" }}>
            <LogoRow />
            <LogoRow reverse />
            <LogoRow />
            <LogoRow reverse />
            <LogoRow />
          </Box>
        </Container>
      </Box>
      <Box py={20} overflow="hidden">
        <Container maxW="7xl">
          <Heading textAlign={"center"} mb={"40px"} letterSpacing="1px">
            Highlights of{" "}
            <Text as="span" color="var(--color-primary)">
              International Work
            </Text>
          </Heading>
        </Container>
        {/* Masonry Layout */}
        <Flex className="sliderTrack" gap="24px" py={5}>
          {sliderColumns.map((col, colIndex) => (
            <Box key={colIndex} className="slideColumn">
              {col.map((item, i) => (
                <Box
                  position={"relative"}
                  w={{ base: "125px", md: "400px" }}
                  mb="24px"
                  H="300px"
                  border="3px solid #deb129"
                  borderRadius="10px"
                  onClick={() => openMedia(item)}
                >
                  <Image
                    key={i}
                    src={`${process.env.REACT_APP_API_URL}/${item?.media?.file_path}`}
                    objectFit="cover"
                    h="300px"
                    borderRadius="10px"
                  />
                  {(item?.media?.title || item?.media?.description) && (
                    <Box position="absolute" bottom="0" w="100%" h="200px">
                      <Box
                        bgGradient="linear(to-t, rgba(0,0,0,0.9), rgba(0,0,0,0))"
                        height={{ base: "30%", md: "100%" }}
                        width="100%"
                        position="absolute"
                        bottom={0}
                        borderRadius="7px"
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
          ))}
        </Flex>
        {/* Zoom Modal */}

        <MediaModal isOpen={isOpen} onClose={onClose} media={selectedMedia} />
      </Box>
    </>
  );
};

export default Clients;
