import React, { useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import BannerBg from "../images/banner/1.jpg";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  List,
  Button,
  ListItem,
  Text,
  Stack,
  HStack,
  SimpleGrid,
  VStack,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { ReactComponent as vector_4 } from "../images/svg/Vector_4.svg";
import MediaMosaic from "../components/MediaMosaic";
import ExpandableCardsGroup from "../components/ExpandableCardsGroup";
import Banner from "../components/Banner";
import eventImg from "../images/event.png";
import project_1 from "../images/projects/project_1.jpeg";
import project_2 from "../images/projects/project_2.jpeg";
import project_5 from "../images/projects/project_5.jpeg";
import teams from "../images/teams.png";
import Testimonial from "../components/Testimonial";
import MediaModal from "../components/MediaModal";
import FadeHeading from "../components/FadeHeading";
const About = () => {
  const mediaItems = useSelector((s) => s.gallery.data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const mentors = new Array(8).fill({
    name: "Zoya sheikh",
    role: "FOUNDER CHAIRMAN",
    image: teams, // replace with your image path
  });
  const global_reco = [
    {
      id: 1,
      title: "Unforgettable Moments at Eventive 2025",
      desc: "Memorable Experience",
      image: "https://picsum.photos/seed/people2/1920/1080",
    },
    {
      id: 2,
      title: "Development",
      desc: "React & Backend",
      image: "https://picsum.photos/seed/crowd4/1920/1080",
    },
    {
      id: 3,
      title: "Marketing",
      desc: "SEO & Growth",
      image:
        "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: 4,
      title: "Development",
      desc: "React & Backend",
      image: "https://picsum.photos/seed/crowd4/1920/1080",
    },
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
  const values = [
    {
      title: "Client First Approach",
      icon: "🤝",
      desc: "We position your vision at the heart of our operations. Every endeavor is fueled by a profound immersion into your objectives, ensuring we engineer bespoke solutions that transcend traditional benchmarks and cultivate enduring institutional value.",
    },
    {
      title: "Integrity & Transparency",
      icon: "🛡️",
      desc: "We champion an ethos of unyielding honesty and ethical accountability. From preliminary discourse to definitive realization, we uphold absolute clarity, fortifying professional alliances through every verified commitment and transparent interaction.",
    },
    {
      title: "Meticulous Precision and Diligence",
      icon: "🔍",
      desc: "We treat every nuance with fastidious attention. Our unwavering dedication to rigor guarantees impeccable implementation, superior aesthetic outcomes, and absolute consistency throughout the entire lifecycle of conceptual design and structural realization.",
    },
    {
      title: "Excellence in Execution",
      icon: "🚀",
      desc: "We synthesize avant-garde design with technical mastery and disciplined protocols. We strive to deliver immersive environments that provoke inspiration while maintaining peak functional performance. ",
    },
  ];
  const gallery = useSelector((s) => s.gallery.data);
  const imageGallery = useMemo(() => {
    return gallery.filter(
      (item) =>
        item?.media?.file_type === "image" && item?.tags === "portfolio",
    );
  }, [gallery]);
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
    <div>
      <Banner
        heading="About Us"
        subheading="Driving Global Impact"
        caption="We Don’t Just Build Stalls — We Create Success Stories"
        BannerBg={BannerBg}
      />
      <Box py={{ base: 12, md: 20 }} bg="gray.50">
        <Container maxW="5xl">
          {/* Heading */}
          {/* <Heading
            textAlign="center"
            mb={{ base: 10, md: 16 }}
            fontSize={{ base: "2xl", md: "4xl" }}
            fontFamily={"Montserrat"}
          >
            About the event
          </Heading> */}

          {/* Content */}
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={8}
            alignItems="center"
          >
            {/* Image */}
            <GridItem>
              <Image
                src={project_5}
                alt="Event"
                borderRadius="lg"
                w="100%"
                objectFit="cover"
                h={{ base: "220px", sm: "280px", md: "360px", lg: "420px" }}
              />
            </GridItem>

            {/* Card */}
            <GridItem>
              <Box
                bg="white"
                p={{ base: 6, md: 8 }}
                borderRadius="lg"
                boxShadow="rgba(0, 0, 0, 0.25) 0px 5px 15px"
                ml={{ md: "-195px" }} // overlap effect
              >
                <Stack spacing={3}>
                  <Text fontSize="md" color="black">
                    FabricExhibits is a design-driven exhibition and interior
                    solutions company. We have 15 + years of industry
                    experience. We specialize in creating an impactful brand
                    environment through innovative design, precision
                    fabrication, and seamless execution.
                  </Text>

                  <Text fontSize={"25px"} fontWeight="800">
                    Why Choose{" "}
                    <Text as="span" color="var(--color-primary)">
                      Us
                    </Text>{" "}
                    :
                  </Text>

                  <List fontSize="md" spacing={2} color="black" lineHeight="1">
                    <ListItem>• 15+ Years of Industry Experience</ListItem>
                    <ListItem>• Global Project Execution</ListItem>
                    <ListItem>• Trusted for Quality & Reliability</ListItem>
                    <ListItem>• Creative & Custom Solutions</ListItem>
                    <ListItem>
                      • State-of-the-art Manufacturing Facilities
                    </ListItem>
                    <ListItem>
                      • Multi-Location Operations (India & Dubai)
                    </ListItem>
                    <ListItem>• End-to-End Project Management</ListItem>
                  </List>
                </Stack>
              </Box>
            </GridItem>
          </Grid>
          <Text textAlign={"center"} pt={12} fontSize={"15px"}>
            Welcome to FabriqExhibits, where we transform ideas into immersive
            brand experiences. We have successfully delivered 7000+ exhibition
            stalls and creative spaces across global markets. From developing a
            concept to delivering the output, we apply strong design thinking
            with flawless on-ground execution to create an impactful environment
            that elevates your brand. We foster a client-first approach and
            exceed their expectations through reliable timelines, fostering
            long-term relationships. At FabriqExhibits, we craft experiences
            that engage, inspire, and deliver real results.
          </Text>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={8}
            alignItems="center"
            mt={20}
          >
            {/* Image (comes first on mobile, right on desktop) */}
            <GridItem order={{ base: 1, md: 2 }}>
              <Image
                src={project_2}
                alt="Event"
                borderRadius="lg"
                w="100%"
                objectFit="cover"
                h={{ base: "220px", sm: "280px", md: "360px", lg: "420px" }}
              />
            </GridItem>

            {/* Content */}
            <GridItem order={{ base: 2, md: 1 }}>
              <Box
                zIndex={1}
                position={"relative"}
                bg="white"
                p={{ base: 6, md: 8 }}
                borderRadius="lg"
                boxShadow="rgba(0, 0, 0, 0.25) 0px 5px 15px"
                mr={{ md: "-195px" }} // overlap from left side
              >
                <Stack spacing={3}>
                  <Text fontSize="md" color="black">
                    We offer a wide range of thoughtfully crafted solutions that
                    outpace the modern competitive vanguard and transcend the
                    standard benchmarks. In today’s competitive landscape, we
                    believe in delivering the best services, ensuring client
                    satisfaction, and building long-term partnerships.
                  </Text>

                  <Text fontSize={"25px"} fontWeight="800">
                    Why Clients Entrust{" "}
                    <Text as="span" color="var(--color-primary)">
                      Their Vision to Us:
                    </Text>{" "}
                    :
                  </Text>
                  <List fontSize="md" spacing={2} color="black" lineHeight="1">
                    <ListItem>
                      • Architectural Design & Precision Execution
                    </ListItem>
                    <ListItem>
                      • Proven international expertise and fluency
                    </ListItem>
                    <ListItem>
                      • Rigorous adherence to uncompromising timelines
                    </ListItem>
                    <ListItem>
                      • Deeply personalized, client-centric strategies
                    </ListItem>
                    <ListItem>• Proactive, seamless crisis management</ListItem>
                    <ListItem>
                      • Meticulous focus on microscopic details
                    </ListItem>
                    <ListItem>
                      • Engineer immersive, emotionally resonant atmospheres
                    </ListItem>
                  </List>
                </Stack>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Box py={12}>
        <Container maxW="5xl">
          <FadeHeading textAlign={"center"} letterSpacing="1px">
            Our{" "}
            <Text as="span" color="var(--color-primary)">
              Premium
            </Text>{" "}
            Stands
          </FadeHeading>

          {/* Right Content */}
          <Text
            fontSize="md"
            textAlign={"center"}
            py={5}
            m={"auto"}
            width={{ base: "100%", md: "60%" }}
          >
            Bold ideas, flawless execution!! We create immersive brand spaces
            that captivate audiences, elevate presence, and leave a lasting
            impression globally.
          </Text>

          <MediaMosaic items={mediaItems} ShowTitle={true} tag="exhibition" />
          <Box display="flex" justifyContent={"center"} py={12}>
            <Button
              sx={{
                background: "var(--color-primary)",
              }}
              as={Link}
              to="/gallery"
              color="black"
              className=""
            >
              View All Gallery
            </Button>
          </Box>
        </Container>
      </Box>
      <Box bg="#f4f1ed" py={{ base: 10, md: 16 }}>
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* OUR MISSION */}
            <Box
              bg="#dcd6cf"
              borderRadius="16px"
              p={{ base: 6, md: 8 }}
              boxShadow="md"
              bgGradient="linear(63deg, rgba(220,214,207,1) 35%, rgba(187,153,46,1) 100%)"
            >
              <Heading
                textAlign="center"
                fontSize={{ base: "22px", md: "28px" }}
                mb={6}
                letterSpacing="1px"
              >
                OUR MISSION
              </Heading>

              <Box bg="white" borderRadius="12px" p={5} boxShadow="sm">
                <Text fontSize="md" color="black" lineHeight="1.8">
                  We believe that an exhibition stall is more than just a
                  structure — it’s your brand’s moment to shine. That’s why our
                  mission is to turn your ideas into experiences that people
                  actually remember. We are committed to serving you with
                  dedication, upholding integrity, and executing every project
                  with diligence and excellence - from the first concept to the
                  final setup, so your brand doesn’t just show up, it truly
                  stands out.{" "}
                </Text>
              </Box>
            </Box>

            {/* OUR VISION */}
            <Box
              bg="#dcd6cf"
              borderRadius="16px"
              p={{ base: 6, md: 8 }}
              boxShadow="md"
              bgGradient="linear(63deg, rgba(220,214,207,1) 35%, rgba(187,153,46,1) 100%)"
            >
              <Heading
                textAlign="center"
                fontSize={{ base: "22px", md: "28px" }}
                mb={6}
                letterSpacing="1px"
              >
                OUR VISION
              </Heading>

              <Box bg="white" borderRadius="12px" p={5} boxShadow="sm">
                <Text fontSize="md" color="black" lineHeight="1.8">
                  Our vision is to define the global benchmark for exhibition
                  excellence through unmatched creativity and precision. We
                  strive to create significant, immersive environments that do
                  more than just showcase a brand. They resonate with audiences
                  and leave a lasting emotional impact through innovative,
                  personalized storytelling.
                </Text>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Box py={{ base: 10, md: 16 }} bg="#f7f7f7">
        <Container maxW="1200px">
          <FadeHeading textAlign={"center"} mb={14} letterSpacing="1px">
            Our{" "}
            <Text as="span" color="var(--color-primary)">
              Core
            </Text>{" "}
            Values
          </FadeHeading>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }} // mobile block, desktop flex grid
            spacing={6}
          >
            {values.map((item, index) => (
              <Box
                key={index}
                bg="white"
                p={6}
                borderRadius="16px"
                boxShadow="sm"
                transition="all 0.3s ease"
                position="relative"
                overflow="hidden"
                _hover={{
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "lg",
                }}
              >
                {/* Top Gradient Line Animation */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  w="0%"
                  h="3px"
                  bg="linear-gradient(90deg, #6E3AFF, #9F7AEA)"
                  transition="0.4s"
                  _groupHover={{ w: "100%" }}
                />

                <VStack align="flex-start" spacing={3}>
                  <Text fontSize="24px">{item.icon}</Text>

                  <Text fontWeight="700" fontSize="lg">
                    {item.title}
                  </Text>

                  <Text fontSize="md" color="black" lineHeight="1.7">
                    {item.desc}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Box py={20} overflow="hidden">
        <Container maxW="7xl">
          <FadeHeading textAlign={"center"} mb={14} letterSpacing="1px">
            The{" "}
            <Text as="span" color="var(--color-primary)">
              Highlights
            </Text>{" "}
            of Our Work
          </FadeHeading>
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
      </Box>
      <Box display={"none"} bg="black" py={20} position="relative">
        <Container maxW="7xl">
          {/* Header */}
          <HStack justify="space-between" mb={14} align="center">
            <Text
              position="absolute"
              left="6%"
              top="56%"
              transform="translate(-50%, -50%) rotate(-90deg)"
              color="rgba(255,255,255,0.18)"
              fontSize="148px"
              fontFamily={"Kara"}
            >
              Mentors
            </Text>
            <Heading
              color="white"
              fontSize={["28px", "36px", "42px"]}
              fontWeight="600"
              fontFamily={"Montserrat"}
            >
              Meet the top <br />
              <Text>
                incredible{" "}
                <Text display={"inline-block"} position={"relative"}>
                  Mentors
                  <Box
                    h="2px"
                    w="93%"
                    bg="#FEBF00"
                    position="relative"
                    left="-7px"
                    top="-8px"
                  ></Box>
                  <Box
                    as={vector_4}
                    boxSize="40px"
                    stroke="#7A38FC"
                    position="absolute"
                    top={"-17px"}
                    right={"-33px"}
                    sx={{
                      "& path": {
                        stroke: "#7A38FC",
                      },
                    }}
                  />
                </Text>
              </Text>
            </Heading>

            <Button
              bg="#F5C35B"
              color="black"
              _hover={{ bg: "#e0b24f" }}
              borderRadius="8px"
              px={6}
              py={5}
            >
              View All Mentors
            </Button>
          </HStack>

          {/* Grid */}
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
            {mentors.map((mentor, index) => (
              <VStack key={index} spacing={4}>
                <Box
                  bg="gray.200"
                  borderRadius="16px 16px 0px 0px"
                  overflow="hidden"
                  w="100%"
                >
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    w="100%"
                    h="250px"
                    objectFit="cover"
                  />
                </Box>

                <VStack spacing={1}>
                  <Text color="white" fontWeight="500" fontSize="16px">
                    {mentor.name}
                  </Text>
                  <Text color="gray.400" fontSize="12px" letterSpacing="1px">
                    {mentor.role}
                  </Text>
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Box display={"none"} py={12} bg="var(--color-secondary)">
        <Container maxW="4xl">
          <Grid
            pb={10}
            templateColumns={{ base: "1fr", md: "80% 20%" }}
            gap={{ base: 6, md: 0 }}
            alignItems="start"
          >
            {/* Left Title */}
            <Heading
              as="h2"
              fontSize={{ base: "28px", md: "36px" }}
              fontWeight="700"
              lineHeight="1.2"
            >
              Proven Success Global Recognition
            </Heading>

            {/* Right Content */}
            <Box
              display="flex"
              justifyContent={{ base: "center", md: "flex-end" }}
            >
              <Button
                as={Link}
                to="/about"
                w="fit-content"
                variant="outlineDark"
                color="black"
              >
                Follow on instagram
              </Button>
            </Box>
          </Grid>

          <ExpandableCardsGroup
            cards={global_reco}
            expandable={false}
            css={{ height: "400px" }}
          />
        </Container>
      </Box>
      <Testimonial />
      <MediaModal isOpen={isOpen} onClose={onClose} media={selectedMedia} />
    </div>
  );
};

export default About;
