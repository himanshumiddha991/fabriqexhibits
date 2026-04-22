import React, { useState, useRef } from "react";
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
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
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
  const { ref, inView } = useInView({
    triggerOnce: true, // 👈 run only once
    threshold: 0.3, // 👈 trigger when 30% visible
  });
  const toast = useToast();
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    show: "",
    stallSize: "",
    message: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    setForm({ ...form, image: file });
  };
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
    if (!form.show) {
      toast({
        title: "Show Name is required",
        status: "error",
        position: "top",
        duration: 2000,
      });
      return false;
    }
    if (!form.phone) {
      toast({
        title: "Phone Number is required",
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
      const formattedMessage = `
        Message: ${form.message}
        Stall Size: ${form.stallSize}
        Show: ${form.show}
        Company: ${form.company}
        Phone: ${form.phone}
        `;

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("subject", "New Inquiry");
      formData.append("message", formattedMessage);
      formData.append("image", form.image);

      const res = await api.post("/api/contact", formData);

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
          company: "",
          email: "",
          phone: "",
          show: "",
          stallSize: "",
          message: "",
        });
        // ✅ Reset file input UI
        if (fileRef.current) {
          fileRef.current.value = null;
        }
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
      {/* git add . */}
      {/* <Banner heading="Contact Us" /> */}
      <Box pt="170px" pb={{ base: 12, md: 20 }}>
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
                Let’s Build Something Exceptional
              </Heading>

              <Text fontSize="md" color="gray.700" mb={6} lineHeight="1.8">
                At FabriqExhibits, we are ready to bring your ideas to
                life—whether it’s a global exhibition stall, a retail space, or
                a complete brand environment. Get in touch with us to discuss
                your requirements, and our team will connect with you shortly.
              </Text>
              <Heading fontSize="md" mt={5} mb={4}>
                Our Offices
              </Heading>
              <VStack align="start" spacing={4}>
                <HStack>
                  <Icon as={MdLocationOn} color="orange.400" boxSize={5} />
                  <Text fontSize="md" color="gray.700">
                    <strong> India –</strong> T 17 tower c Baani Square sector
                    50 Gurgaon, 122018
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={MdLocationOn} color="orange.400" boxSize={5} />
                  <Text fontSize="md" color="gray.700">
                    <strong> Dubai –</strong> Ras Al Khor industrial area 2 P.O.
                    Box 117318, Dubai UAE
                  </Text>
                </HStack>
              </VStack>
              <Heading fontSize="md" mt={5} mb={4}>
                We’re here!
              </Heading>

              <VStack align="start" spacing={4}>
                <HStack>
                  <Icon as={PhoneIcon} color="orange.400" boxSize={5} />
                  <Text fontSize="md" color="gray.700">
                    +91-9958137313
                  </Text>
                </HStack>

                <HStack>
                  <Icon as={EmailIcon} color="orange.400" boxSize={5} />
                  <Text fontSize="md" color="gray.700">
                    Isha@fabriqexhibits.com
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
            alignItems="start"
          >
            {/* Left Content */}
            <GridItem>
              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                mb={5}
                fontWeight="600"
                color="gray.800"
              >
                At FabriqExhibits, we believe in delivering not just solutions,
                but experiences that inspire and perform.
              </Heading>

              <Box maxW="600px" mx="auto" py={6}>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  What Happens Next?
                </Text>

                <List spacing={3}>
                  <ListItem display="flex" alignItems="center">
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    <Text fontSize="md">Our team reviews your requirement</Text>
                  </ListItem>

                  <ListItem display="flex" alignItems="center">
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    <Text fontSize="md">
                      We connect with you within 24 hours
                    </Text>
                  </ListItem>

                  <ListItem display="flex" alignItems="center">
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    <Text fontSize="md">
                      A customized proposal and concept approach is shared
                    </Text>
                  </ListItem>
                </List>
              </Box>

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
              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                mb={5}
                fontWeight="600"
                color="gray.800"
              >
                Please Tell Us About Your Requirement
              </Heading>

              <VStack spacing={4}>
                <Input
                  placeholder="Full Name *"
                  bg="white"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Company Name *"
                  bg="white"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Email Address*"
                  bg="white"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Phone Number*"
                  rows={5}
                  bg="white"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />

                <Input
                  placeholder="Show Name*"
                  bg="white"
                  name="show"
                  value={form.subject}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Stall Size / Project Area"
                  rows={5}
                  bg="white"
                  name="stallSize"
                  value={form.stallSize}
                  onChange={handleChange}
                />

                <Textarea
                  placeholder="Your Requirement / Message*"
                  rows={5}
                  bg="white"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                />
                <Box
                  position="relative"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  px={3}
                  py={2}
                  bg="white"
                  _hover={{ borderColor: "gray.300" }}
                  _focusWithin={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #3182ce",
                  }}
                  w={"100%"}
                >
                  <Input
                    padding={"6px"}
                    type="file"
                    name="image"
                    onChange={handleImageUpload}
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg"
                    bg="white"
                    ref={fileRef}
                    border={"none"}
                  />
                  {/* Custom Button */}
                  <Button
                    onClick={() => fileRef.current.click()}
                    bg="#efefef"
                    p="5px"
                    position="absolute"
                    left="10px"
                    width={"100px"}
                    top="49%"
                    transform="translate(0%, -50%)"
                    fontSize="12px"
                    h="28px"
                    border="1px solid #737171"
                    borderRadius="3px"
                  >
                    File Upload
                  </Button>
                </Box>

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
                  {loading ? <Spinner size="sm" /> : "SUBMIT"}
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
