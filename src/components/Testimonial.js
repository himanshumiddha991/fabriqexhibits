import React from "react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { Box, Image, VStack, HStack, Text } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import leftCut from "../images/left-cut.png";
import rightCut from "../images/right-cut.png";
const Testimonial = () => {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const next = () =>
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const testimonials = [
    {
      id: 1,
      name: "Abhishek Sain",
      text: "Dynamic, Innovative, Inspiring! We made history. I am so proud to have been a part of this amazing, ground moving event.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Riya Sharma",
      text: "An unforgettable experience. Everything was executed with precision and creativity.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "John Miller",
      text: "Professional, impactful, and extremely well-organized.",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      id: 4,
      name: "Sophia Lee",
      text: "A benchmark event that sets a new standard in the industry.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 5,
      name: "Riya Sharma",
      text: "An unforgettable experience. Everything was executed with precision and creativity.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];
  const scaleActive = useBreakpointValue({
    base: 1.05,
    sm: 1.1,
  });

  const scaleInactive = useBreakpointValue({
    base: 0.9,
    sm: 0.88,
    md: 0.85,
  });
  const gap = useBreakpointValue({
    base: 50, // mobile
    sm: 60, // tablet
    md: 100, // desktop
    lg: 80, // big screen
  });

  return (
    <Box py={16} pt={24} textAlign="center" position="relative">
      {/* Avatar Navigation */}

      {/* Masked Card */}
      <Box maxW="700px" mx="auto" className="testimonial-mask">
        <Box
          position="absolute"
          width={"100%"}
          height="120px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          transform="translate(-50%, -50%)"
          top="0"
          left="50%"
          z-index="1"
        >
          {testimonials.map((item, index) => {
            const total = testimonials.length;

            // circular offset
            let offset = index - active;

            // wrap logic
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            return (
              <Box
                key={item.id}
                position="absolute"
                transform={`
    translateX(${offset * gap}px)
    scale(${offset === 0 ? scaleActive : scaleInactive})
  `}
                transition="all .4s ease"
                zIndex={offset === 0 ? 10 : 1}
                cursor="pointer"
                onClick={() => setActive(index)}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  boxSize={{
                    base: "70px", // mobile
                    sm: "80px", // tablet
                    md: "96px", // desktop
                    lg: "96px", // large screen
                  }}
                  style={{
                    borderRadius: "50%",
                    border: offset === 0 ? "3px solid white" : "2px solid #eee",
                  }}
                  boxShadow={offset === 0 ? "0px 0px 10px #F7697F" : ""}
                />
              </Box>
            );
          })}
        </Box>
        <Image
          src={leftCut}
          alt="vector"
          position="absolute"
          top={["50%", "50%"]}
          left={["0px", "0px"]}
          transform="translate( 0%,-50%)"
          h={["65px", "65px"]}
        />
        <Image
          src={rightCut}
          alt="vector"
          position="absolute"
          top={["50%", "50%"]}
          right={["0px", "0px"]}
          transform="translate( 0%,-50%)"
          h={["65px", "65px"]}
        />
        <div className="hero-dot"></div>
        <Box
          className="hero-dot"
          right="0"
          left="auto"
          bg="rgb(0 138 255)"
          opacity={"0.3"}
        ></Box>
        <VStack spacing={4}>
          <Text fontWeight="700" fontFamily={"Montserrat"} fontSize={"20px"}>
            {testimonials[active].name}
          </Text>

          <Text
            fontSize="15px"
            fontWeight={"500"}
            maxW="520px"
            fontFamily={"Manrope"}
          >
            “{testimonials[active].text}”
          </Text>

          {/* Stars */}
          <HStack
            spacing={1}
            bg={"#fff"}
            px="10px"
            py="0px"
            borderRadius="10px"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Text key={i} color="red.400">
                ★
              </Text>
            ))}
          </HStack>
        </VStack>

        {/* Slider Controls */}
        <IconButton
          icon={<ChevronLeftIcon />}
          position="absolute"
          left="-20px"
          top="50%"
          color={"#fff"}
          transform="translateY(-50%)"
          onClick={prev}
          aria-label="Previous"
          className="chevron"
          zIndex={1}
          _hover={{
            bg: "transparent",
          }}
          _active={{
            bg: "transparent",
          }}
          _focus={{
            boxShadow: "none",
          }}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          position="absolute"
          right="-20px"
          top="50%"
          color={"#fff"}
          transform="translateY(-50%)"
          onClick={next}
          aria-label="Next"
          className="chevron"
          zIndex={1}
          _hover={{
            bg: "transparent",
          }}
          _active={{
            bg: "transparent",
          }}
          _focus={{
            boxShadow: "none",
          }}
        />
      </Box>
    </Box>
  );
};

export default Testimonial;
