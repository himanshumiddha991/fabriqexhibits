import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import ExpandableCardsGroup from "../components/ExpandableCardsGroup";
import ImageLayer from "../components/ImageLayer";
import { Link } from "react-router-dom";
import "../styles/hero.css";
import { Helmet } from "react-helmet-async";
import MediaMosaic from "../components/MediaMosaic";
import Testimonial from "../components/Testimonial";
import fr from "../images/fr.webp";
import "../styles/home.css";
import LogoRow from "../components/LogoRow";
import {
  Icon,
  Box,
  Flex,
  Image,
  Container,
  HStack,
  Stack,
  SimpleGrid,
  VStack,
  Button,
  Grid,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  GridItem,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

import home from "../images/home.png";
import home_2 from "../images/home_2.png";
import home_3 from "../images/home_3.png";
import { CheckCircleIcon } from "@chakra-ui/icons";

import vector_1 from "../images/svg/Vector_1.svg";
import vector_2 from "../images/svg/Vector_2.svg";
import vector_3 from "../images/svg/Vector_3.svg";
import vector_4 from "../images/svg/Vector_4.svg";
import vector_5 from "../images/svg/Vector_5.svg";
import vector_6 from "../images/svg/Vector_6.svg";
import vector_7 from "../images/svg/Vector_7.svg";
import vector_9 from "../images/svg/Vector_9.svg";
import vector_10 from "../images/svg/vector_10.svg";
import vector_11 from "../images/svg/Vector_11.svg";
import vector_8 from "../images/svg/Vector_8.svg";
import model_2 from "../images/model_2.png";
import model_3 from "../images/model_3.png";

import Logo_1 from "../images/logos/logo-1.png";
import Logo_2 from "../images/logos/logo-2.png";
import Logo_3 from "../images/logos/logo-3.png";
import Logo_4 from "../images/logos/logo-4.png";
import Logo_5 from "../images/logos/logo-5.png";
import Logo_6 from "../images/logos/logo-6.png";
import slide_1 from "../images/slides/slide_1.jpeg";
import slide_2 from "../images/slides/slide_2.jpeg";
import slide_3 from "../images/slides/slide_3.jpeg";
import m_slide_1 from "../images/slides/slide_1_small.jpeg";
import m_slide_2 from "../images/slides/slide_2_small.jpeg";
import m_slide_3 from "../images/slides/slide_3_small.jpeg";
import india from "../images/countries/1.webp";
import usa from "../images/countries/2.webp";
import germany from "../images/countries/3.webp";
import uae from "../images/countries/4.webp";
import singapore from "../images/countries/5.webp";
import australia from "../images/countries/6.webp";
import europe from "../images/countries/europe.png";
import hongKong from "../images/countries/hong-kong.png";
import indonesia from "../images/countries/indonesia.png";
import kazakhstan from "../images/countries/kazakhstan.png";
import kenya from "../images/countries/kenya.png";
import russia from "../images/countries/russia.png";
import saudi from "../images/countries/saudi.png";
import southAfrica from "../images/countries/south-africa.png";
import spain from "../images/countries/spain.png";
import thailand from "../images/countries/thailand.png";
import project_1 from "../images/projects/project_1.jpeg";
import project_2 from "../images/projects/project_2.jpeg";
import project_3 from "../images/projects/project_3.jpeg";
import project_4 from "../images/projects/project_4.jpeg";
import { useInView } from "react-intersection-observer";
import FadeHeading from "../components/FadeHeading";
import Avaada from "../images/partners/AVAADA - CGH Delhi - 2025.jpg";
import Demak from "../images/partners/DEMAK - Auto Expo 2024.jpeg";
import FlexFoods from "../images/partners/FLEX FOODS - FIHI 2025.jpg";
import Hyundai from "../images/partners/HYUNDAI - Convergence 2025.jpg";
import LiquiMoly from "../images/partners/LIQUI MOLY - Auto Expo - 2025.jpg";
import Metalman from "../images/partners/METALMAN- Auto Expo - 2025.jpg";
import RSFoils from "../images/partners/R.S. Foils Pvt Ltd - CPHI 2024.jpg";
import RMPBearing from "../images/partners/RMP BEARING - Automechanika 2024.jpg";
import Skyworth from "../images/partners/SHENZEN SKYWORTH DIGITAL - Convergence 2025.jpg";
const Home = () => {
  const [current, setCurrent] = useState(0);
  const desktopSlides = [slide_1, slide_2, slide_3];
  const mobileSlides = [m_slide_1, m_slide_2, m_slide_3];

  const slideImages = useBreakpointValue({
    base: mobileSlides, // mobile
    md: desktopSlides, // desktop
  });
  const isMobile = useBreakpointValue({ base: true, md: false });
  const countries = [
    { name: "India", flag: india },
    { name: "USA", flag: usa },
    { name: "Germany", flag: germany },
    { name: "Dubai", flag: uae },
    { name: "Singapore", flag: singapore },
    { name: "Australia", flag: australia },

    { name: "Europe", flag: europe },
    { name: "Hong Kong", flag: hongKong },
    { name: "Indonesia", flag: indonesia },
    { name: "Kazakhstan", flag: kazakhstan },
    { name: "Kenya", flag: kenya },
    { name: "Russia", flag: russia },
    { name: "Saudi Arabia", flag: saudi },
    { name: "South Africa", flag: southAfrica },
    { name: "Spain", flag: spain },
    { name: "Thailand", flag: thailand },
  ];
  const { ref, inView } = useInView({
    triggerOnce: true, // 👈 run only once
    threshold: 0.3, // 👈 trigger when 30% visible
  });
  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
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
  const mediaItems = useSelector((s) => s.gallery.data);
  const [mediaTag, setMediaTag] = useState("awards");
  const logos = [
    Logo_1,
    Logo_2,
    Logo_3,
    Logo_4,
    Logo_5,
    Logo_6,
    Logo_2,
    Logo_3,
    Logo_4,
  ];
  const cards = [
    {
      id: 1,
      title: "Designing exhibition spaces",
      desc: "Unforgettable Experiences",
      image: project_1,
    },
    {
      id: 2,
      title: "Exhibition stands built to attract.",
      desc: "Our Work",
      image: project_2,
    },
    {
      id: 3,
      title: "Booths that engage, and convert.",
      desc: "What We Create",
      image: project_3,
    },
  ];
  const global_reco = [
    {
      id: 1,
      title: "Avaada",
      desc: "CGH Delhi 2025",
      image: Avaada,
    },
    {
      id: 2,
      title: "Demak",
      desc: "Auto Expo 2024",
      image: Demak,
    },
    {
      id: 3,
      title: "Flex Foods",
      desc: "FIHI 2025",
      image: FlexFoods,
    },
    {
      id: 4,
      title: "Hyundai",
      desc: "Convergence 2025",
      image: Hyundai,
    },
    {
      id: 5,
      title: "Liqui Moly",
      desc: "Auto Expo 2025",
      image: LiquiMoly,
    },
    {
      id: 6,
      title: "Metalman",
      desc: "Auto Expo 2025",
      image: Metalman,
    },
    {
      id: 7,
      title: "R.S. Foils Pvt Ltd",
      desc: "CPHI 2024",
      image: RSFoils,
    },
    {
      id: 8,
      title: "RMP Bearing",
      desc: "Automechanika 2024",
      image: RMPBearing,
    },
    {
      id: 9,
      title: "Shenzen Skyworth Digital",
      desc: "Convergence 2025",
      image: Skyworth,
    },
  ];

  // const mediaItems = [
  //   {
  //     id: 1,
  //     type: "video",
  //     thumb: "https://images.unsplash.com/photo-1515169067865-5387ec356754",
  //     video: "https://www.w3schools.com/html/mov_bbb.mp4",
  //     height: 320,
  //   },
  //   {
  //     id: 2,
  //     type: "image",
  //     src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  //     height: "auto", // 👈 column 2 auto height
  //   },
  //   {
  //     id: 3,
  //     type: "image",
  //     src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
  //     height: 240,
  //   },
  //   {
  //     id: 4,
  //     type: "video",
  //     thumb: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
  //     video: "https://www.w3schools.com/html/movie.mp4",
  //     height: "auto", // 👈 column 4 auto height
  //   },
  //   {
  //     id: 1,
  //     type: "video",
  //     thumb: "https://images.unsplash.com/photo-1515169067865-5387ec356754",
  //     video: "https://www.w3schools.com/html/mov_bbb.mp4",
  //     height: 320,
  //   },
  //   {
  //     id: 2,
  //     type: "image",
  //     src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  //     height: "auto", // 👈 column 2 auto height
  //   },
  //   {
  //     id: 3,
  //     type: "image",
  //     src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
  //     height: 240,
  //   },
  //   {
  //     id: 4,
  //     type: "video",
  //     thumb: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
  //     video: "https://www.w3schools.com/html/movie.mp4",
  //     height: "auto", // 👈 column 4 auto height
  //   },
  //   {
  //     id: 1,
  //     type: "video",
  //     thumb: "https://images.unsplash.com/photo-1515169067865-5387ec356754",
  //     video: "https://www.w3schools.com/html/mov_bbb.mp4",
  //     height: 320,
  //   },
  //   {
  //     id: 2,
  //     type: "image",
  //     src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  //     height: "auto", // 👈 column 2 auto height
  //   },
  //   {
  //     id: 3,
  //     type: "image",
  //     src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
  //     height: 240,
  //   },
  //   {
  //     id: 4,
  //     type: "video",
  //     thumb: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
  //     video: "https://www.w3schools.com/html/movie.mp4",
  //     height: "auto", // 👈 column 4 auto height
  //   },
  // ];

  const stats = [
    { value: 7000, suffix: "+", label: "Projects Delivered" },
    { value: 15, suffix: "", label: "Years of Experience" },
    { value: 600, suffix: "+", label: "Happy Clients" },
    { value: 20, suffix: "+", label: "Countries" },
  ];
  const features = [
    {
      title: "Turnkey Exhibits",
      desc: "Tailor Anima’s Landing Page UI Kit to your unique brand and with customisable components, in no time!",
      bg: "#FFE1DC",
      icon: vector_9,
    },
    {
      title: "Immersive Environments",
      desc: "No need to worry about screen size. Anima’s Landing Page UI Kit adapts to any screen size, from desktop to mobile.",
      bg: "#DFF3EE",
      icon: vector_10,
    },
    {
      title: "Exhibit365",
      desc: "Zero coding skills required, Anima’s Landing Page UI Kit empowers you to create stunning landing pages with ease.",
      bg: "#FFECC7",
      icon: vector_11,
    },
  ];
  const workingProcessData = [
    {
      step: "01",
      label: "SCHEDULE A MEETING",
      title: "Think",
      description:
        "We dive deep into your brand, objectives, and audience to define a clear strategy to create an impactful exhibition experience!",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
    {
      step: "02",
      label: "SCHEDULE A MEETING",
      title: "Design",
      description:
        "We transform ideas into creative, functional designs that reflect your brand identity and maximize visual impact and engagement!",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    },
    {
      step: "03",
      label: "SCHEDULE A MEETING",
      title: "Build",
      description:
        "We execute precise fabrication using quality materials and advanced processes, ensuring durability, detailing, and flawless finish in every element!",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    },
    {
      step: "04",
      label: "SCHEDULE A MEETING",
      title: "Deliver",
      description:
        "We manage logistics, installation, and final setup, ensuring timely delivery and a seamless, stress-free exhibition experience across global locations!",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
    },
  ];
  const faqData = [
    {
      q: "What does FabriqExhibits do?",
      a: "FabriqExhibits is a design and build company specializing in custom stall designing and fabrication, retail and office interiors, and graphic design solutions.",
    },
    {
      q: "Do you provide end-to-end exhibition solutions?",
      a: "Yes, we offer complete turnkey exhibition solutions, including concept development, 3D design, fabrication, graphics, logistics, installation, and dismantling.",
    },
    {
      q: "Do you work on international projects?",
      a: "Yes, we have executed multiple projects globally and have the capability to manage exhibition and interior projects across India and International markets",
    },
    {
      q: "How long have you been in the industry?",
      a: "We have been in the industry for more than 15 years and have built a strong reputation through successful projects and long-term client relationships.",
    },
    {
      q: "Do you have manufacturing facilities?",
      a: "Yes, we have factories in multiple parts of India as well as Dubai, which helps us deliver quality execution and efficient project management.",
    },
    {
      q: "What types of businesses do you work with?",
      a: "We work with brands across a wide range of industries, including corporate, industrial, lifestyle, technology, retail, and manufacturing sectors.",
    },
    {
      q: "Can you handle both design and fabrication in-house?",
      a: "Yes, our team manages both design and fabrication, ensuring better quality control, consistency, and faster execution.",
    },
    {
      q: "Do you create custom-designed stalls?",
      a: "Yes, we specialize in custom stall design and fabrication tailored to each client’s brand, objectives, and event requirements.",
    },
    {
      q: "Do you also offer retail and office interior services?",
      a: "Yes, in addition to exhibitions, we also design and execute retail interiors and office spaces.",
    },
    {
      q: "Can you help with exhibition graphics and branding?",
      a: "Yes, our graphic design team supports exhibition branding, display graphics, marketing visuals, and other creative assets.",
    },
    {
      q: "How do you ensure project quality?",
      a: "We follow a structured process with detailed planning, design approvals, quality checks, material selection, and on-site supervision.",
    },
    {
      q: "Do you offer site installation support?",
      a: "Yes, we handle on-site installation and execution to ensure the project is delivered smoothly and on time.",
    },
    {
      q: "Can you work within strict deadlines?",
      a: "Yes, exhibition projects often involve tight timelines, and our team is experienced in delivering high-quality work within committed schedules.",
    },
    {
      q: "How can we get started with a project?",
      a: "You can contact us with your brief, Exhibition details, and requirements. Our team will review your needs and propose the right design and execution approach.",
    },
  ];
  const steps = [
    {
      title: "Understand & Consult",
      icon: "💡",
      desc: "We begin by understanding your brand, objectives, target audience, and exhibition requirements.",
    },
    {
      title: "Concept & Design",
      icon: "🎨",
      desc: "Our design team transforms your brief into creative concepts and 3D visualizations.",
    },
    {
      title: "Planning & Approval",
      icon: "📝",
      desc: "We finalize designs, technical drawings, and execution plans.",
    },
    {
      title: "Fabrication & Production",
      icon: "🏭",
      desc: "We ensure high-quality fabrication with in-house facilities across India and Dubai.",
    },
    {
      title: "Logistics & Installation",
      icon: "🌍",
      desc: "We manage end-to-end logistics and on-site installation globally.",
    },
    {
      title: "Handover & Support",
      icon: "🔍",
      desc: "We ensure everything is perfect before the show begins.",
    },
    {
      title: "Dismantling & Closure",
      icon: "♻️",
      desc: "Post-event, we handle safe dismantling and logistics.",
    },
  ];
  const mid = Math.ceil(faqData.length / 2);
  const leftFaq = faqData.slice(0, mid);
  const rightFaq = faqData.slice(mid);
  const excludedIndexes =
    useBreakpointValue({
      base: [0, 1, 2, 3, 4, 5, 6, 7],
      sm: [1, 3, 5, 6],
      md: [2, 5, 6],
      lg: [3, 6],
    }) || [];
  return (
    <>
      <Helmet>
        <title>Exhibition Stand Design Services | Fabrig Exhibits</title>

        <meta
          name="description"
          content="We design and build exhibition stands for your business. Fabrig Exhibits offers simple, creative, and complete booth solutions worldwide."
        />
      </Helmet>
      <Box
        mt={"100px"}
        py={20}
        pt={48}
        position="relative"
        width="100%"
        height="80vh"
        overflow="hidden"
      >
        {slideImages.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`slide-${index}`}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            objectFit="cover"
            transition="opacity 1s ease-in-out"
            opacity={index === current ? 1 : 0}
          />
        ))}
        <Box
          position="absolute"
          top="0"
          w="100%"
          h="80vh"
          bg="rgba(0, 0, 0, 0.6)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          pt="100px"
        >
          <Box
            position="relative"
            className="hero-content"
            display="flex"
            flexDirection="column"
            alignItems="center" // horizontal center
            justifyContent="start" // vertical center (if height is given)
            textAlign="center"
            padding={"0 10px"}
          >
            <FadeHeading
              color={"white"}
              fontWeight={"800"}
              fontSize={{ base: "20px", md: "30px" }}
            >
              Custom Exhibition Stand Builders & Fabricators
            </FadeHeading>
            <p className="hero-desc" fontSize={"16px"}>
              Welcome to FabriqExhibits — India’s acclaimed exhibition stall
              building and fabrication company, creating world-class brand
              environments across the globe.
            </p>

            <Stack
              direction={{ base: "column", md: "row" }} // 📱 column → 🖥 row
              spacing={4} // gap works everywhere
            >
              <Button as={Link} to="/portfolio" variant="primary" color="white">
                Explore Our Work
              </Button>
              <Button
                as={Link}
                to="/contact-us"
                variant="outline"
                color="white"
              >
                Get in Touch
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box display="none" py={20} pt={48} className="hero">
        <Container maxW="5xl">
          <div className="hero-container">
            {/* LEFT CONTENT */}
            <Box position="relative" className="hero-content">
              <span className="hero-date" fontSize={"18px"}>
                15–17 December National IT Hall
              </span>
              <p className="hero-desc" fontSize={"16px"}>
                Tech Innovation Event 2025: Unveiling breakthrough technologies
                and networking opportunities for industry pioneers.
              </p>

              <Stack
                direction={{ base: "column", md: "row" }} // 📱 column → 🖥 row
                spacing={4} // gap works everywhere
              >
                <Button as={Link} to="/" variant="primary" color="white">
                  Explore Recent Work
                </Button>
                <Button as={Link} to="/about" variant="outline" color="white">
                  Contact Us Today
                </Button>
              </Stack>
              <Image
                src={vector_1}
                alt="vector"
                position="absolute"
                top={["0", "auto"]} // mobile , desktop
                bottom={["0", "0"]}
                left={["30px", "30px"]}
                transform="translate(-50%, 0%)"
                h={["40px", "60px"]}
              />
            </Box>

            {/* RIGHT IMAGES */}
            <div className="hero-images">
              <Stack
                direction={{ base: "row", md: "row" }}
                justifyContent={{ base: "center" }}
                spacing={4} // gap works everywhere
              >
                <div className="hero-dot"></div>

                <Stack
                  direction={{ base: "column" }}
                  spacing={4}
                  justify="space-between"
                  zIndex={2}
                  position={"relative"}
                >
                  <div className="image-small top">
                    <Image
                      src={home_2}
                      alt=""
                      height={"100%"}
                      width={"100%"}
                      objectFit={"cover"}
                    />
                  </div>

                  <div className="image-small bottom">
                    <Image
                      src={home_3}
                      alt=""
                      height={"100%"}
                      width={"100%"}
                      objectFit={"cover"}
                    />
                  </div>
                  <Image
                    src={vector_3}
                    alt="vector"
                    position="absolute"
                    top={["0", "0"]}
                    right={["-46px", "-46px"]}
                    left={["auto", "auto"]}
                    transform="translate(-50%, 0%)"
                    h={["18px", "20px"]}
                  />
                </Stack>
                <Box position={"relative"} className="strechable">
                  <ImageLayer
                    image={home}
                    alt="Hero Image"
                    bottom={false}
                    gap={20}
                    layerHeight="360px"
                    layerWidth="260px"
                    imageHeight="340px"
                    imageWidth="243px"
                  />
                  <Image
                    src={vector_4}
                    alt="vector"
                    position="absolute"
                    top={["-43px", "-43px"]}
                    right={["-12px", "-12px"]}
                    transform="translate(-50%, 0%)"
                    h={["35px", "45px"]}
                  />
                  <Image
                    src={vector_5}
                    alt="vector"
                    position="absolute"
                    top={["-17px", "-17px"]}
                    right={["24px", "24px"]}
                    transform="translate(-50%, 0%)"
                    h={["25px", "37px"]}
                  />
                  <Image
                    src={vector_2}
                    alt="vector"
                    position="absolute"
                    top={["auto", "auto"]}
                    bottom={["-59px", "-59px"]}
                    right={["auto", "auto"]}
                    transform="translate(-50%, 0%)"
                    h={["35px", "48px"]}
                  />
                </Box>

                <Image
                  src={vector_5}
                  alt="vector"
                  position="absolute"
                  top={["-40px", "-40px"]}
                  left={["57px", "57px"]}
                  transform="translate(-50%, 0%)"
                  h={["22px", "33px"]}
                />
                <Image
                  src={vector_3}
                  alt="vector"
                  position="absolute"
                  top={["41%", "41%"]}
                  left={["-24px", "-24px"]}
                  transform="translate(-50%, 0%)"
                  h={["18px", "20px"]}
                />
              </Stack>
            </div>
          </div>
        </Container>
      </Box>
      {/* logo banner */}
      <Box bg="#FFE2A6" py={6} overflow="hidden">
        {/* <Box
          animation={{
            base: "scroll 5s linear infinite",
            md: "scroll 30s linear infinite",
          }}
          sx={{
            display: "-webkit-box",
            "@keyframes scroll": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <Box key={index} mx={8}>
              <Image
                src={logo}
                alt="brand logo"
                h="28px"
                opacity={0.6}
                filter="grayscale(100%)"
              />
            </Box>
          ))}
          
        </Box> */}
        <LogoRow />
      </Box>
      {/* award Winning */}
      <Box py={12}>
        <Container maxW="5xl">
          <FadeHeading textAlign={"center"} letterSpacing="1px">
            Award Winning{" "}
            <Text as="span" color="var(--color-primary)">
              Stands
            </Text>
          </FadeHeading>
          {/* Right Content */}
          <Text
            fontSize="md"
            textAlign={"center"}
            py={5}
            m={"auto"}
            width={{ base: "100%", md: "60%" }}
          >
            Discover how we redefine excellence with elite designs and flawless
            execution.
          </Text>
          {/* <HStack
            spacing={4}
            py={10}
            justifyContent={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <Button
              onClick={() => setMediaTag("exhibition")}
              bg={mediaTag === "exhibition" ? "black" : "transparent"}
              color={
                mediaTag === "exhibition" ? "white" : "var(--color-text-faded)"
              }
              className="hoverDark"
            >
              Exhibition
            </Button>

            <Button
              onClick={() => setMediaTag("retail-interiors")}
              bg={mediaTag === "retail-interiors" ? "black" : "transparent"}
              color={
                mediaTag === "retail-interiors"
                  ? "white"
                  : "var(--color-text-faded)"
              }
              className="hoverDark"
            >
              Retail / Office Interiors
            </Button>

  
          </HStack> */}
          <MediaMosaic items={mediaItems} ShowTitle={true} tag={mediaTag} />
          <Box display="flex" justifyContent={"center"} py={12}>
            <Button
              sx={{
                background: "var(--color-primary)",
              }}
              as={Link}
              to="/gallery"
              color="black"
              state={{ tag: "awards" }}
              className=""
            >
              View All Gallery
            </Button>
          </Box>
        </Container>
      </Box>
      {/* Expandable Cards Container */}
      <Box py={12} display="none">
        <Container maxW="5xl" position={"relative"}>
          <Image
            src={vector_6}
            alt="vector"
            position="absolute"
            top={["0px", "0px"]}
            right={["-99px", "-99px"]}
            transform="translate(-50%, 0%)"
            h={["100px", "100px"]}
          />
          <Image
            src={vector_7}
            alt="vector"
            position="absolute"
            top={["100px", "100px"]}
            left={["-22px", "-22px"]}
            transform="translate(-50%, 0%)"
            h={["18px", "33px"]}
          />
          <Image
            src={vector_8}
            alt="vector"
            position="absolute"
            top={["50px", "50px"]}
            left={["-57px", "-57px"]}
            transform="translate(-50%, 0%)"
            h={["53px", "53px"]}
          />
          <Grid
            py={10}
            templateColumns={{ base: "1fr", md: "40% 60%" }}
            gap={6}
            alignItems="start"
          >
            {/* Left Title */}
            <Heading
              as="h2"
              fontSize={{ base: "28px", md: "36px" }}
              fontWeight="600"
              lineHeight="1.2"
              fontFamily={"Montserrat"}
            >
              Designing <br /> Experiences
            </Heading>

            {/* Right Content */}
            <Text
              fontSize={"15px"}
              color="black"
              lineHeight="1.7"
              fontFamily={"Manrope"}
            >
              <Text as="span" color="blue.500" fontWeight="500">
                Tech Event 2025
              </Text>{" "}
              showcases groundbreaking innovations, featuring keynote talks,
              interactive workshops, and networking sessions for tech
              enthusiasts and industry leaders.
            </Text>
          </Grid>

          <ExpandableCardsGroup cards={cards} />
        </Container>
      </Box>

      {/* our team */}
      <Box display={"none"} bg="var(--color-primary-dark)">
        <Container maxW="5xl">
          {" "}
          <Flex
            direction={{ base: "column", sm: "row" }}
            wrap={{ base: "nowrap", sm: "wrap" }}
            gap={4}
            justifyContent={{ base: "center", sm: "normal" }}
            alignItems={{ base: "center", sm: "stretch" }}
          >
            {/* Section 1 */}
            <Box
              order={{ base: 1, sm: 1, md: 1 }}
              flex={{
                base: "1",
                sm: "0 0 calc(50% - 12px)",
                md: "0 0 calc(30% - 12px)",
                xl: "0 0 calc(30% - 12px)",
              }}
              display="flex"
              justifyContent={{
                base: "center",
                xl: "flex-start",
                md: "center",
              }}
            >
              <ImageLayer
                image={model_2}
                alt="Hero Image"
                bottom={false}
                gap={20}
                layerHeight="360px"
                layerWidth="260px"
                imageHeight="340px"
                imageWidth="243px"
                instanceCss={{
                  backgroundColor: "var(--color-light-2)",
                  borderRadius: "0px 0px 135px 135px",
                }}
                layerCss={{
                  borderRadius: "0px 0px 135px 135px",
                  height: 350,
                  width: 243,
                  top: 0,
                  transform: "translate(-50%, 0%)",
                }}
              />
            </Box>

            {/* Section 3 (same row as 1 on desktop) */}
            <Box
              order={{ base: 2, sm: 2, md: 2 }}
              flex={{
                base: "1",
                sm: "0 0 100%",
                md: "0 0 calc(40% - 12px)",
                xl: "0 0 calc(40% - 12px)",
              }}
            >
              <Box py={{ base: 16, md: 24 }} color="white">
                <Container maxW="1200px">
                  <VStack align="start" spacing={8}>
                    {/* Heading */}

                    <Heading
                      fontSize={{ base: "32px", md: "40px" }}
                      fontFamily={"Montserrat"}
                      fontWeight="500"
                      margin={{ base: "auto", md: "initial" }}
                      textAlign={{ base: "center", md: "start" }}
                    >
                      Our Team
                    </Heading>

                    {/* Description */}

                    <Text
                      maxW="620px"
                      color="whiteAlpha.700"
                      fontSize={{ base: "14px", md: "14px" }}
                      margin={{ base: "auto", md: "initial" }}
                      textAlign={{ base: "center", md: "start" }}
                      lineHeight="1.7"
                    >
                      The event features renowned influencers and innovators
                      shaping trends and driving creativity across various
                      industries.
                    </Text>

                    {/* Team Section */}

                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      spacing={{ base: 10, md: 20 }}
                      pt={8}
                      w="100%"
                    >
                      {/* Card 1 */}

                      <VStack
                        align="start"
                        alignItems={{ base: "center", md: "start" }}
                      >
                        <Text
                          fontSize="18px"
                          fontWeight="500"
                          position="relative"
                          display="inline-block"
                          _after={{
                            content: '""',
                            position: "absolute",
                            bottom: "-6px",
                            left: 0,
                            width: "100%",
                            height: "2px",
                            bg: "whiteAlpha.700",
                          }}
                        >
                          Sarah Johnson
                        </Text>

                        <Text fontSize="15px" pt={4}>
                          December 15, 2025
                        </Text>

                        <Text color="whiteAlpha.700" fontSize="15px">
                          10:00 AM - 11:30 AM
                        </Text>
                      </VStack>

                      {/* Card 2 */}

                      <VStack
                        align="start"
                        spacing={3}
                        alignItems={{ base: "center", md: "start" }}
                      >
                        <Text
                          fontSize="18px"
                          fontWeight="500"
                          position="relative"
                          display="inline-block"
                          _after={{
                            content: '""',
                            position: "absolute",
                            bottom: "-6px",
                            left: 0,
                            width: "100%",
                            height: "2px",
                            bg: "whiteAlpha.700",
                          }}
                        >
                          Christopher Wilson
                        </Text>

                        <Text fontSize="15px">December 17, 2025</Text>

                        <Text color="whiteAlpha.700" fontSize="15px">
                          12:00 PM - 2:00 PM
                        </Text>
                      </VStack>
                    </SimpleGrid>
                  </VStack>
                </Container>
              </Box>
            </Box>

            {/* Section 2 (next row on desktop) */}
            <Box
              order={{ base: 3, sm: 3, md: 3 }}
              flex={{
                base: "1",
                sm: "0 0 calc(50% - 12px)",
                md: "0 0 calc(30% - 12px)",
                xl: "0 0 calc(30% - 12px)",
              }}
              display={"flex"}
              justifyContent={{ base: "center", md: "flex-start" }}
              alignItems={"end"}
              ml={{ base: 0, sm: "auto" }}
            >
              <ImageLayer
                image={model_3}
                alt="Hero Image"
                bottom={false}
                gap={20}
                layerHeight="360px"
                layerWidth="260px"
                imageHeight="340px"
                imageWidth="243px"
                instanceCss={{
                  backgroundColor: "var(--color-light-2)",
                  borderRadius: "135px 135px 0px 0px ",
                }}
                layerCss={{
                  borderRadius: "135px 135px 0px 0px ",
                  height: 350,
                  width: 243,
                  top: "auto",
                  bottom: 0,
                  transform: "translate(-50%, 0%)",
                }}
              />
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box py={{ base: 12, md: 20 }} bg="gray.50">
        <Container maxW="5xl">
          {/* Heading */}

          <FadeHeading mb={14} textAlign={"center"} letterSpacing="1px">
            About Fabriq{" "}
            <Text as="span" color="var(--color-primary)">
              Exhibits
            </Text>
          </FadeHeading>

          {/* Content */}
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={8}
            alignItems="center"
          >
            {/* Image */}
            <GridItem>
              <Image
                src={project_1}
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
                    {
                      " FabriqExhibits is a design-driven exhibition and interior solutions company with 15+ years of industry experience. We specialize in custom stall design and fabrication, retail & office interiors, and graphic design — offering end-to-end solutions that ensure your brand commands attention. Our approach is simple yet powerful: Think -----> Design -----> Build -----> Deliver. By merging creativity with technical precision, we transform ambitious visions into high-impact physical landmarks. We are recognized as a leader in India with a global footprint and invite you to partner with us to create engaging spaces that elevate your brand and captivate audiences."
                    }
                  </Text>

                  <Text fontSize={"18px"} fontWeight="700">
                    Services & Capabilities Available With Us:
                  </Text>

                  <List fontSize="md" spacing={2} color="black" lineHeight="1">
                    <ListItem>• Custom Stall Designing & Fabrication </ListItem>
                    <ListItem>• Retail & Office Interiors </ListItem>
                    <ListItem>• Graphic Design</ListItem>
                  </List>
                </Stack>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Box py={12} bg="var(--color-secondary)">
        <Container maxW="5xl">
          <Grid pb={10} gap={{ base: 6, md: 0 }} alignItems="start">
            {/* Left Title */}

            <FadeHeading textAlign={"center"} letterSpacing="1px">
              Our Trusted{" "}
              <Text as="span" color="var(--color-primary)">
                Partners
              </Text>
            </FadeHeading>

            {/* Right Content */}
            {/* <Box
              display="none"
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
            </Box> */}
          </Grid>

          <ExpandableCardsGroup
            cards={global_reco}
            expandable={false}
            css={{ height: "220px" }}
            textReverse={true}
            showPopup={true}
            ShowTitle={true}
            ShowDesc={true}
          />
        </Container>
      </Box>
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
                  Choose us
                </Text>{" "}
                for our unwavering reliability for seamless, world-class
                execution and total brand peace.
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
      <Box bg="#f3f3f3" py={20}>
        <Container maxW="7xl" textAlign="center">
          {/* Heading */}

          <FadeHeading mb={14} textAlign={"center"} letterSpacing="1px">
            Our Worldwide{" "}
            <Text as="span" color="var(--color-primary)">
              Presence
            </Text>
          </FadeHeading>

          {/* Flags */}
          <Box overflow="hidden" w="100%">
            <Box
              display="flex"
              whiteSpace="nowrap"
              width="fit-content"
              animation="scroll 70s linear infinite"
              sx={{
                "@keyframes scroll": {
                  "0%": { transform: "translateX(0)" },
                  "100%": { transform: "translateX(-50%)" },
                },
              }}
            >
              {[...countries, ...countries].map((c, i) => (
                <VStack key={i} spacing={4} mx={6} minW="120px" align="center">
                  <Box
                    bg="white"
                    borderRadius="xl"
                    boxShadow="0 6px 20px rgba(0,0,0,0.08)"
                    w="110px"
                    h="70px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src={c.flag}
                      objectFit="cover"
                      borderRadius="md"
                      w="100%"
                      h="100%"
                    />
                  </Box>

                  <Text fontWeight="600" color="gray.700" textAlign="center">
                    {c.name}
                  </Text>
                </VStack>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      {/* services */}
      <Box py={12} display={"none"} bg="var(--color-secondary)">
        <Heading textAlign={"center"} letterSpacing="1px">
          Our Premium{" "}
          <Text as="span" color="var(--color-primary)">
            Services
          </Text>
        </Heading>
        <Box bg="#FFF4D8" py={{ base: 10, md: 16 }}>
          <SimpleGrid
            maxW="1200px"
            mx="auto"
            px={6}
            columns={{ base: 1, md: 3 }}
            spacing={8}
          >
            {features.map((item, index) => (
              <Box
                key={index}
                bg="white"
                borderRadius="20px"
                p={8}
                boxShadow="0 10px 30px rgba(0,0,0,0.08)"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-6px)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                }}
              >
                <VStack spacing={4} textAlign="center">
                  {/* Icon */}
                  <Box
                    bg={item.bg}
                    w="55px"
                    h="55px"
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="25px"
                  >
                    <Image
                      src={item.icon}
                      alt="brand logo"
                      className="process-card-image"
                    />
                  </Box>

                  {/* Title */}
                  <Text fontSize="xl" fontWeight="700">
                    {item.title}
                  </Text>

                  {/* Description */}
                  <Text fontSize="md" color="black">
                    {item.desc}
                  </Text>

                  {/* CTA */}
                  <Button
                    display={"none"}
                    as={Link}
                    fontSize="md"
                    fontWeight="600"
                    sx={{
                      background: "transparent",
                      height: "auto",
                      color: "var(--color-primary)",
                      _hover: {
                        textDecoration: "none",
                        ".arrow": {
                          transform: "translateX(6px)", // 👈 arrow expands
                        },
                      },
                    }}
                  >
                    Learn More{" "}
                    <span
                      className="arrow"
                      style={{
                        display: "inline-block",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      →
                    </span>
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
      {/* process */}
      <Box py={{ base: 12, md: 20 }} bg="var(--color-text-light)">
        <Container maxW="5xl" position={"relative"}>
          <Box
            className="hero-dot"
            height={"300"}
            width={"300"}
            left={"50px"}
            top={"0"}
          ></Box>
          {/* Heading Section */}
          <VStack spacing={3} mb={14} textAlign="center">
            <FadeHeading textAlign={"center"} letterSpacing="1px">
              From Idea to Impact —{" "}
              <Text as="span" color="var(--color-primary)">
                Seamlessly Delivered
              </Text>{" "}
            </FadeHeading>
            <Text maxW="520px" fontSize="md" color="black" fontWeight={"600"}>
              At FabriqExhibits, we follow a streamlined, transparent process to
              ensure every exhibition stall is designed and delivered with
              precision, creativity, and efficiency.
            </Text>
          </VStack>

          {/* Process Cards */}
          <SimpleGrid
            display={"none"}
            columns={{ base: 1, sm: 2, md: 4 }}
            spacing={8}
            maxW="1200px"
            mx="auto"
            px={6}
            position={"relative"}
            zIndex={2}
          >
            {workingProcessData.map((item, index) => (
              <Box key={index} position="relative">
                <div className="process-card">
                  <div className="process-card-bg">
                    <span className="vertical-label">{item.label}</span>
                  </div>
                  <div className="process-card-label">{item.step}</div>
                  <Image
                    src={item.image}
                    alt="brand logo"
                    className="process-card-image"
                  />
                </div>
                <Heading
                  as="h3"
                  pb={4}
                  pt={5}
                  fontSize={{ base: "16px", md: "18px" }}
                >
                  {item.title}
                </Heading>

                <Text fontSize="md" color="black">
                  {item.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
          <Box maxW="1200px" mx="auto" py={10}>
            <Flex wrap="wrap" justify="center" gap={10} position="relative">
              {steps.map((step, index) => {
                const isLastInRow = index === 3; // Step 04
                const isSecondRow = index >= 4;

                return (
                  <Box
                    key={index}
                    position="relative"
                    w="200px"
                    display="flex"
                    justifyContent="center"
                  >
                    {/* Horizontal Connector */}
                    {!excludedIndexes.includes(index) && (
                      <Box
                        position="absolute"
                        top="50%"
                        right="-50px"
                        width="55px"
                        height="2px"
                        bg="gray.300"
                      />
                    )}

                    {/* Circle */}
                    <Box
                      w="160px"
                      h="160px"
                      borderRadius="full"
                      border="2px solid #ddd"
                      position="relative"
                      overflow="hidden"
                      bg="white"
                    >
                      {/* Top Content */}
                      <Flex
                        h="50%"
                        align="center"
                        justify="center"
                        direction="column"
                        textAlign="center"
                      >
                        <Text fontSize="lg">{step.icon}</Text>
                        <Text fontSize="sm" fontWeight={"700"}>
                          {" "}
                          {step.title}
                        </Text>
                      </Flex>

                      {/* Bottom Gradient */}
                      <Flex
                        h="50%"
                        align="center"
                        justify="center"
                        bgGradient={
                          index % 4 === 0
                            ? "linear(to-r, cyan.400, teal.400)"
                            : index % 4 === 1
                              ? "linear(to-r, blue.400, blue.600)"
                              : index % 4 === 2
                                ? "linear(to-r, purple.400, purple.600)"
                                : "linear(to-r, pink.400, pink.600)"
                        }
                      >
                        <Text color="white" fontWeight="bold">
                          Step {index + 1}
                        </Text>
                      </Flex>
                    </Box>
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Container>
      </Box>
      <Box bg="#f4f4f4" py={20}>
        <Container maxW="7xl">
          {/* Heading */}
          <Box mb={10}>
            <Box w="60px" h="4px" bg="var(--color-primary)" mb={4} />
            <FadeHeading textAlign={"left"} letterSpacing="1px">
              Frequently Asked{" "}
              <Text as="span" color="var(--color-primary)">
                Questions
              </Text>
            </FadeHeading>
          </Box>

          <Grid
            templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }}
            gap={{ base: 0, lg: 12 }}
            alignItems="start"
          >
            {/* LEFT IMAGE */}
            {/* <Image
              src="https://thepropshopindia.com/stand-build-agency-india/stand/vf.webp"
              borderRadius="2xl"
              objectFit="cover"
              w="100%"
              h={{ base: "300px", md: "420px" }}
            /> */}

            {/* RIGHT ACCORDION */}
            <Accordion defaultIndex={[0]} allowToggle>
              {leftFaq.map((item, i) => (
                <AccordionItem
                  key={i}
                  border="none"
                  mb={4}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="0 10px 25px rgba(0,0,0,0.05)"
                  overflow="hidden"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    left="0"
                    top="0"
                    bottom="0"
                    w="4px"
                    bg="var(--color-primary)"
                  />

                  <h2>
                    <AccordionButton py={5} pl={6}>
                      <Flex flex="1" textAlign="left" fontWeight="600">
                        {i + 1}. {item.q}
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>

                  <AccordionPanel pb={6} pl={6} fontSize={"md"} color="black">
                    {item.a}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>

            <Accordion allowToggle>
              {rightFaq.map((item, i) => (
                <AccordionItem
                  key={i}
                  border="none"
                  mb={4}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="0 10px 25px rgba(0,0,0,0.05)"
                  overflow="hidden"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    left="0"
                    top="0"
                    bottom="0"
                    w="4px"
                    bg="var(--color-primary)"
                  />

                  <h2>
                    <AccordionButton py={5} pl={6}>
                      <Flex flex="1" textAlign="left" fontWeight="600">
                        {leftFaq.length + i + 1}. {item.q} {/* 👈 FIX */}
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>

                  <AccordionPanel pb={6} pl={6} fontSize={"md"} color="black">
                    {item.a}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Grid>
        </Container>
      </Box>
      {/* stats */}

      <Box ref={ref} py={{ base: 10, md: 16 }} bg="#000">
        <Container maxW="5xl">
          <SimpleGrid
            columns={{ base: 2, md: 4 }}
            spacing={{ base: 8, md: 12 }}
            maxW="1200px"
            mx="auto"
            px={6}
            textAlign="center"
          >
            {stats.map((item, index) => (
              <VStack key={index} spacing={1}>
                <Text
                  fontSize={{ base: "32px", md: "48px" }}
                  fontWeight="700"
                  color="white"
                >
                  {inView && ( // 👈 only run when visible
                    <>
                      <CountUp end={item.value} duration={2} />
                      {item.suffix}
                    </>
                  )}
                </Text>

                <Text fontSize="md" color="gray.300" letterSpacing="0.5px">
                  {item.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      {/* testimonial */}

      <Testimonial />
    </>
  );
};

export default Home;
