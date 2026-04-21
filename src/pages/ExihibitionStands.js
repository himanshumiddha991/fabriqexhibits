import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  Text,
  Flex,
  SimpleGrid,
  VStack,
  Input,
  Button,
  Heading,
  useToast,
  Spinner,
  Image,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
} from "@chakra-ui/react";
import CountUp from "react-countup";
import { FaPlay } from "react-icons/fa";
import LogoRow from "../components/LogoRow";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import api from "../utils/api";
import { CheckCircleIcon } from "@chakra-ui/icons";
import MediaModal from "../components/MediaModal";

import hero1 from "../images/2.webp";
import hero2 from "../images/6.webp";
import hero3 from "../images/7.webp";
import fr from "../images/fr.webp";
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
const images = [hero1, hero2, hero3];
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
const faqData = [
  {
    q: "What services do you provide as a stand build agency in India?",
    a: "We provide complete exhibition stand design, fabrication, installation and dismantling services.",
  },
  {
    q: "Which countries do you operate in?",
    a: "We provide stand design and build services across ASIA, MIDDLE EAST, EUROPE, AFRICA, North America & South America and beyond.",
  },
  {
    q: "Do you have local presence or partners in India?",
    a: "Yes, we have strong presence and partner network in India.",
  },
  {
    q: "What types of clients or industries do you serve?",
    a: "We serve clients from manufacturing, technology, pharma, automobile and many more industries.",
  },
  {
    q: "Can you create customized exhibition stands for worldwide events?",
    a: "Yes, we design fully customized exhibition booths globally.",
  },
  {
    q: "Do you provide modular and reusable stand options for worldwide exhibitions?",
    a: "Yes, we provide modular reusable stand solutions.",
  },
  {
    q: "Do you handle logistics and shipping of the exhibition stand worldwide?",
    a: "Yes, we handle end-to-end logistics and shipping.",
  },
];
const QuoteForm = () => {
  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    event: "",
    size: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.event) {
      return toast({
        title: "Please fill required fields",
        status: "error",
        position: "top",
      });
    }

    try {
      setLoading(true);

      await api.post("/api/quote", form);

      toast({
        title: "Quote Request Sent",
        status: "success",
        position: "top",
      });

      setForm({
        name: "",
        phone: "",
        email: "",
        event: "",
        size: "",
      });
    } catch {
      toast({
        title: "Submission Failed",
        status: "error",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="white" p={8} borderRadius="xl" boxShadow="xl" w="100%">
      <Heading size="md" textAlign="center">
        Get Free Quote
      </Heading>

      <Text textAlign="center" mb={5} color="gray.500">
        Let’s create something extraordinary
      </Text>

      <VStack spacing={4}>
        <Input
          placeholder="Your Name *"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          placeholder="Phone Number *"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <Input
          placeholder="Email Address *"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Exhibition/Show Name *"
          name="event"
          value={form.event}
          onChange={handleChange}
        />
        <Input
          placeholder="Stand Size (Optional)"
          name="size"
          value={form.size}
          onChange={handleChange}
        />

        <Button
          bg="var(--color-primary)"
          color="white"
          w="100%"
          borderRadius="full"
          onClick={handleSubmit}
        >
          {loading ? <Spinner size="sm" /> : "GET QUOTE NOW"}
        </Button>
      </VStack>
    </Box>
  );
};
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
const StatBox = ({ number, label, suffix }) => (
  <Flex
    bg="white"
    color="black"
    borderRadius="xl"
    p={6}
    direction="column"
    align="center"
  >
    <Heading display={"flex"} color="var(--color-primary)">
      <CountUp end={number} duration={2} /> {}
      {suffix}
    </Heading>
    <Text fontSize="md">{label}</Text>
  </Flex>
);

const ExihibitionStands = () => {
  const [index, setIndex] = useState(0);
  const gallery = useSelector((s) => s.gallery.data);
  const testimonials = useSelector((s) => s.testimonials.data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const imageGallery = useMemo(() => {
    return gallery.filter(
      (item) =>
        item?.media?.file_type === "image" && item?.tags === "exhibition",
    );
  }, [gallery]);
  const videoGallery = useMemo(() => {
    return gallery.filter(
      (item) =>
        item?.media?.file_type === "video" && item?.tags === "exhibition",
    );
  }, [gallery]);

  console.log("videoGallery", videoGallery, imageGallery);
  const awardGallery = useMemo(() => {
    return gallery.filter(
      (item) => item?.media?.file_type === "image" && item?.tags === "awards",
    );
  }, [gallery]);
  const sliderImages = [...awardGallery, ...awardGallery];
  const openMedia = (item) => {
    console.log("item", item);
    setSelectedMedia({
      type: item?.media?.file_type,
      url: `${process.env.REACT_APP_API_URL}/${item?.media?.file_path}`,
      description: item?.media?.description,
      title: item?.media?.title,
    });
    onOpen();
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const slideWidth = 450;
  const gap = 40;
  const totalWidth = slideWidth + gap;

  const [testiIndex, setTestiIndex] = useState(1000); // start from big index

  useEffect(() => {
    const interval = setInterval(() => {
      setTestiIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box
        minH="100vh"
        backgroundImage={`url(${images[index]})`}
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
        transition="0.8s"
        pt={28}
      >
        {/* overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0,0,0,0.6)"
        />

        <Container maxW="7xl" position="relative" zIndex="2" py={20}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1.2fr 0.8fr" }}
            gap={10}
            alignItems="center"
          >
            {/* LEFT CONTENT */}
            <Box color="white">
              <Heading size="2xl" lineHeight="1.2">
                World-Class <br /> Exhibition Stands <br /> Delivered Globally
              </Heading>

              <Text mt={6} maxW="500px">
                Transform your brand presence at trade shows. We design
                award-winning exhibition stands that bring your brand to life.
              </Text>

              {/* Stats */}
              <SimpleGrid columns={{ base: 2, md: 4 }} mt={10} spacing={5}>
                <StatBox number="7000" suffix="+" label="Projects Delivered" />
                <StatBox number="15" suffix="" label="Years of Experience" />
                <StatBox number="600" suffix="+" label="Happy Clients" />
                <StatBox number="20" suffix="+" label="Countries" />
              </SimpleGrid>
            </Box>

            {/* RIGHT FORM */}
            <QuoteForm />
          </Grid>
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
                <Heading size="lg">
                  Are you looking for booth for trade shows?
                </Heading>
              </Flex>

              {/* Intro */}
              <Text fontSize="lg" mb={8}>
                <Text as="span" color="var(--color-primary)" fontWeight="bold">
                  Propshop Worldwide
                </Text>{" "}
                is your trusted exhibition stand design agency, offering global
                services with local expertise.
              </Text>

              {/* Features Card */}
              <Box
                bg="white"
                borderRadius="2xl"
                p={8}
                boxShadow="0 10px 30px rgba(0,0,0,0.05)"
              >
                <VStack align="start" spacing={5}>
                  <Feature text="Experienced & Reliable exhibition booth builders" />
                  <Feature text="Serving across Asia, the Middle East, Europe, Africa, North & South America" />
                  <Feature text="Strong presence in India, USA, UK, and UAE" />
                  <Feature text="Custom-designed booths for rental or purchase" />
                  <Feature text="Tailored to your brand identity and business goals" />
                  <Feature text="Impactful, strategic exhibition stands that grab attention" />
                  <Feature text="Trusted by global brands for end-to-end trade show solutions." />
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
      <Box overflow="hidden" py={10} bg="#f5f5f5">
        <Text textAlign="center" fontSize="32px" fontWeight="700" mb={8}>
          OUR AWARDS &{" "}
          <Text as="span" color="var(--color-primary)">
            ACHIEVEMENTS
          </Text>
        </Text>

        <Box
          whiteSpace="nowrap"
          display="flex"
          width="fit-content"
          animation="scroll 50s linear infinite"
          sx={{
            "@keyframes scroll": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        >
          {sliderImages.map((item, i) => (
            <Flex
              key={i}
              direction="column"
              align="center"
              justify="center"
              bg="white"
              border="1px solid #ccc"
              mx={4}
              minW="260px"
              p={4}
              borderWidth="1px"
              borderColor="black"
            >
              <Image
                src={`${process.env.REACT_APP_API_URL}/${item.media.file_path}`}
                h="180px"
                w={"260px"}
                objectFit="cover"
              />
              <Text fontWeight="600" textAlign="center">
                {item?.alt || item?.title}
              </Text>
            </Flex>
          ))}
        </Box>
      </Box>
      <Box py={20} px={8}>
        {/* Heading */}
        <Flex align="center" mb={6}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w={"100%"}
          >
            {/* Heading */}
            <Heading mb={14} letterSpacing="1px">
              AWARD WINNING
              <Text as="span" color="var(--color-primary)">
                EXHIBITION STANDS
              </Text>
            </Heading>
          </Box>
        </Flex>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {imageGallery.slice(0, 16).map((item) => (
            <Box
              key={item.id}
              position="relative"
              overflow="hidden"
              role="group"
              cursor="pointer"
            >
              {/* Image */}
              <Image
                src={`${process.env.REACT_APP_API_URL}/${item.media.file_path}`}
                w="100%"
                h="280px"
                objectFit="cover"
                transition="0.6s"
                _groupHover={{ transform: "scale(1.1)" }}
              />

              {/* Hover Overlay */}
              <Box
                position="absolute"
                bottom="0"
                left="0"
                w="100%"
                h="0%"
                bg="rgba(255, 90, 0, 0.85)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="0.5s"
                _groupHover={{ h: "100%" }}
                onClick={() => openMedia(item)}
              >
                <Text
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  textAlign="center"
                  px={4}
                  opacity="0"
                  transition="0.4s"
                  _groupHover={{ opacity: 1 }}
                >
                  {item.media.alt || "Exhibition Stand"}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Box bg="#f3f3f3" py={20}>
        <Container maxW="7xl" textAlign="center">
          {/* Heading */}
          <Heading mb={14} letterSpacing="1px">
            OUR WORLDWIDE{" "}
            <Text as="span" color="var(--color-primary)">
              PRESENCE
            </Text>
          </Heading>

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
      <Box bg="#ffff" pt={20} overflow="hidden">
        <Heading textAlign="center" mb={8}>
          SUCCESS STORIES FROM OUR{" "}
          <Text as="span" color="var(--color-primary)">
            CLIENTS
          </Text>
        </Heading>

        <Box>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} p={10}>
                {({ isActive }) => (
                  <Box
                    my={5}
                    p={10}
                    transition="0.4s"
                    // transform={isActive ? "scale(1)" : "scale(0.8)"}
                    // opacity={isActive ? 1 : 0.6}
                    className={
                      isActive ? "testimonialCard active" : "testimonialCard"
                    }
                  >
                    <Image
                      src={`${process.env.REACT_APP_API_URL}/${item?.media?.file_path}`}
                      h="90px"
                      borderRadius={"50%"}
                      mx="auto"
                      mb={6}
                    />

                    <Text textAlign="center" color="black">
                      {item?.message}
                    </Text>

                    <Text mt={6} fontWeight="bold" textAlign="center">
                      {item?.name}
                    </Text>
                  </Box>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
      <Box
        position="relative"
        py={{ base: 8, md: 8 }}
        overflow="hidden"
        bg={"#fff"}
      >
        <Container maxW="7xl" position="relative" zIndex={1}>
          <Heading textAlign="center" mb={8}>
            Our Clients
            <Text as="span" color="var(--color-primary)">
              Trust Us
            </Text>
          </Heading>
          {/* Mobile → Only 1 row */}
          <Box display={{ base: "block", md: "none" }}>
            <LogoRow />
          </Box>

          {/* Desktop → 5 rows */}
          <Box display={{ base: "none", md: "block" }}>
            <LogoRow />
            <LogoRow reverse />
          </Box>
        </Container>
      </Box>
      {videoGallery?.length > 0 && (
        <Box py={20} px={8}>
          {/* Heading */}
          <Flex align="center" mb={6}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              w={"100%"}
            >
              {/* Heading */}
              <Heading mb={14} letterSpacing="1px">
                Don't Just Take Our{" "}
                <Text as="span" color="var(--color-primary)">
                  Word for It
                </Text>
              </Heading>
            </Box>
          </Flex>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {videoGallery.slice(0, 4).map((item) => (
              <Box
                key={item.id}
                position="relative"
                overflow="hidden"
                role="group"
                cursor="pointer"
                borderRadius={"10px"}
                onClick={() => openMedia(item)}
              >
                {/* Image */}
                <Image
                  src={`${process.env.REACT_APP_API_URL}/${
                    item.media.thumbnail_path
                  }`}
                  w="100%"
                  h="280px"
                  objectFit="cover"
                  transition="0.6s"
                  _groupHover={{ transform: "scale(1.1)" }}
                />

                {/* Hover Overlay */}
                <Flex
                  position="absolute"
                  top="50%"
                  left="50%"
                  w="50px"
                  h="50px"
                  justify="center"
                  align="center"
                  bg="#f7697f"
                  borderRadius={"50%"}
                  padding={"10px"}
                  transform={"translate(-50%, -50%)"}
                >
                  <Icon as={FaPlay} color="white" boxSize={5} />
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}

      <Box bg="#f4f4f4" py={20}>
        <Container maxW="7xl">
          {/* Heading */}
          <Box mb={10}>
            <Box w="60px" h="4px" bg="var(--color-primary)" mb={4} />
            <Heading size="xl">
              Frequently Asked{" "}
              <Text as="span" color="var(--color-primary)">
                Questions
              </Text>
            </Heading>
          </Box>

          <Grid
            templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }}
            gap={12}
            alignItems="start"
          >
            {/* LEFT IMAGE */}
            <Image
              src="https://thepropshopindia.com/stand-build-agency-india/stand/vf.webp"
              borderRadius="2xl"
              objectFit="cover"
              w="100%"
              h={{ base: "300px", md: "420px" }}
            />

            {/* RIGHT ACCORDION */}
            <Accordion defaultIndex={[1]} allowToggle>
              {faqData.map((item, i) => (
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
                  {/* Left red accent */}
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

                  <AccordionPanel pb={6} pl={6} color="black">
                    {item.a}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Grid>
        </Container>
      </Box>

      <MediaModal isOpen={isOpen} onClose={onClose} media={selectedMedia} />
    </>
  );
};

export default ExihibitionStands;
