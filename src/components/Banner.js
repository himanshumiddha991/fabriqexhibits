import React from "react";
import { Box, Heading, Text, VStack, Image } from "@chakra-ui/react";
import Ornament from "../images/ornament.png";
import FadeHeading from "./FadeHeading";
import defaultBannerBg from "../images/about-bg.png"; // Ensure this path is correct
const Banner = ({
  heading,
  subheading = "we bring dreams to life",
  caption = "Begin Your Perfect Event Journey",
  headingStyle = null,
  BannerBg = defaultBannerBg,
}) => {
  return (
    <Box
      position="relative"
      height={{ base: "60vh", md: "80vh" }}
      bgImage={`url(${BannerBg})`} // replace with your image
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      {/* Dark Overlay */}
      <Box position="absolute" inset={0} bg="blackAlpha.600" />

      {/* Content */}
      <VStack
        position="relative"
        zIndex={2}
        height="100%"
        justify="center"
        spacing={4}
        textAlign="center"
        px={4}
      >
        {/* Decorative Icon */}
        <Image
          src={Ornament} // optional decorative svg
          alt="ornament"
          maxW="120px"
          mb={2}
        />

        <Text
          color="whiteAlpha.900"
          fontSize={{ base: "sm", md: "md" }}
          letterSpacing="wide"
        >
          {subheading}
        </Text>

        <FadeHeading
          as="h1"
          color="white"
          fontSize={{ base: "3xl", md: "6xl" }}
          fontWeight="bold"
          textTransform={"uppercase"}
          sx={headingStyle}
        >
          {heading}
        </FadeHeading>

        <Text color="whiteAlpha.800" fontSize={{ base: "md", md: "xl" }}>
          {caption}
        </Text>
      </VStack>
    </Box>
  );
};

export default Banner;
