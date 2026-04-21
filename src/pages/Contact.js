import React, { useState } from "react";
import Banner from "../components/Banner";
import model from "../images/projects/project_5.jpeg";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

import {
  SimpleGrid,
  Box,
  GridItem,
  Image,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Input,
  Textarea,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import api from "../utils/api";
const Contact = () => {
  const lat = 28.4257225;
  const lng = 77.0577849;
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.email) {
      toast({
        title: "Email is required",
        status: "error",
        position: "top",
        duration: 2000,
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      toast({
        title: "Invalid Email",
        status: "error",
        position: "top",
        duration: 2000,
      });
      return false;
    }

    if (!form.message) {
      toast({
        title: "Message is required",
        status: "error",
        position: "top",
        duration: 2000,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await api.post("/api/contact", form);

      if (res.data.success) {
        toast({
          title: "Message Sent Successfully",
          description: "We will contact you soon.",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later",
        status: "error",
        position: "top",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  const stats = [
    { value: 7000, suffix: "+", label: "Projects Delivered" },
    { value: 15, suffix: "", label: "Years of Experience" },
    { value: 600, suffix: "+", label: "Happy Clients" },
    { value: 20, suffix: "+", label: "Countries" },
  ];
  return (
    <>
      {" "}
      <Box pt="112px" pb={{ base: 10, md: 16 }} bg="#000">
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
                  <CountUp end={item.value} duration={2} />
                  {item.suffix}
                </Text>

                <Text fontSize="md" color="gray.300" letterSpacing="0.5px">
                  {item.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      {/* git add . */}
      {/* <Banner heading="Contact Us" /> */}
      <Box py={{ base: 12, md: 20 }}>
        <Container maxW="5xl">
          <Grid
            templateColumns={{ base: "1fr", md: "1.2fr 1fr" }}
            gap={{ base: 10, md: 16 }}
            alignItems="center"
          >
            {/* Left Content */}
            <GridItem>
              <Heading
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bold"
                mb={6}
              >
                Hi Let’s Talk!
              </Heading>

              <Text fontSize="md" color="gray.700" mb={6} lineHeight="1.8">
                Mrs. India Supranational is a prestigious beauty pageant that
                transcends conventional notions of beauty. It is a platform that
                celebrates the multifaceted qualities of Indian women, from
                their grace and elegance to their intellect and social
                awareness. This pageant is not just about crowning a queen; it’s
                about empowering women and advocating for positive change.
              </Text>

              <Heading fontSize="lg" mb={4}>
                We’re here!
              </Heading>

              <VStack align="start" spacing={4}>
                <HStack>
                  <Icon as={PhoneIcon} color="orange.400" boxSize={5} />
                  <Text fontSize="lg" color="gray.700">
                    9958137313
                  </Text>
                </HStack>

                <HStack>
                  <Icon as={EmailIcon} color="orange.400" boxSize={5} />
                  <Text fontSize="lg" color="gray.700">
                    Isha@fabriqexhibits.com
                  </Text>
                </HStack>

                <HStack>
                  <Icon as={MdLocationOn} color="orange.400" boxSize={5} />
                  <Text fontSize="lg" color="gray.700">
                    T-17, Tower C, Baani Square Sector 50, Gurugram – 122018
                    Haryana, India
                  </Text>
                </HStack>
              </VStack>
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
      <Box
        py={{ base: 16, md: 24 }}
        bg="linear-gradient(135deg,#f7f2e7 0%, #e9eef5 100%)"
      >
        <Container maxW="7xl">
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={{ base: 10, md: 16 }}
            alignItems="center"
          >
            {/* Left Content */}
            <GridItem>
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                mb={5}
                fontWeight="600"
                color="gray.800"
              >
                Perfectly Designed Complete Wedding Packages!
              </Heading>

              <Text color="black" mb={8} lineHeight="1.7">
                Unlock the allure of our perfectly designed complete wedding
                packages! Tailored with elegance, our offerings promise a
                seamless celebration. Contact us today to turn your dream
                wedding into a masterpiece of love and culture.
              </Text>

              <Text fontWeight="600" mb={4}>
                Follow Us:
              </Text>

              <HStack display={"none"} spacing={4}>
                <Box
                  bg="orange.400"
                  p={3}
                  borderRadius="full"
                  color="white"
                  cursor="pointer"
                  height={"40px"}
                  width={"40px"}
                  display={"flex"}
                >
                  <Icon as={FaFacebookF} />
                </Box>

                <Box
                  bg="orange.400"
                  p={3}
                  borderRadius="full"
                  color="white"
                  cursor="pointer"
                  height={"40px"}
                  width={"40px"}
                  display={"flex"}
                >
                  <Icon as={FaTwitter} />
                </Box>

                <Box
                  bg="orange.400"
                  p={3}
                  borderRadius="full"
                  color="white"
                  cursor="pointer"
                  height={"40px"}
                  width={"40px"}
                  display={"flex"}
                >
                  <Icon as={FaInstagram} />
                </Box>

                <Box
                  bg="orange.400"
                  p={3}
                  borderRadius="full"
                  color="white"
                  cursor="pointer"
                  height={"40px"}
                  width={"40px"}
                  display={"flex"}
                >
                  <Icon as={FaPinterestP} />
                </Box>
              </HStack>
            </GridItem>

            {/* Right Form */}
            <GridItem>
              <VStack spacing={4}>
                <Input
                  placeholder="Your Name"
                  bg="white"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Mobile number"
                  rows={5}
                  bg="white"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Your Email"
                  bg="white"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />

                <Input
                  placeholder="Show name"
                  bg="white"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Stand Size"
                  rows={5}
                  bg="white"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                />

                {/* <Textarea
                  placeholder="Stand Size"
                  rows={5}
                  bg="white"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                /> */}

                <Button
                  variant="outline"
                  borderColor="orange.400"
                  color="gray.800"
                  px={8}
                  onClick={handleSubmit}
                  isDisabled={loading}
                  _hover={{
                    bg: "orange.400",
                    color: "white",
                  }}
                >
                  {loading ? <Spinner size="sm" /> : "CONTACT NOW"}
                </Button>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      {/* <Box bg="black" py={{ base: 20, md: 32 }} position="relative">
        <Container maxW="4xl">
          <VStack spacing={6} textAlign="center">
            <Heading
              color="white"
              fontWeight="400"
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              letterSpacing="1px"
            >
              Want Your ........ To Be Perfect And Memorable?
            </Heading>

            <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
              Your story deserves the perfect chapter of perfection.
            </Text>

            <Button
              variant="outline"
              borderColor="#D4AF37"
              color="white"
              px={8}
              py={6}
              fontSize="md"
              letterSpacing="1px"
              _hover={{
                bg: "#D4AF37",
                color: "black",
              }}
            >
              CONTACT NOW
            </Button>
          </VStack>
        </Container>
      </Box> */}
      <Box w="100%" h={{ base: "300px", md: "450px" }}>
        <iframe
          title="google-map"
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        />
      </Box>
    </>
  );
};

export default Contact;
