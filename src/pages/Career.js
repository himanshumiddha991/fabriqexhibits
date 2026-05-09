import React, { useState, useRef } from "react";
import Banner from "../components/Banner";
import BannerBg from "../images/banner/3.jpg";
import model from "../images/projects/project_5.jpeg";
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
import FadeHeading from "../components/FadeHeading";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";

import { MdLocationOn } from "react-icons/md";
import api from "../utils/api";
const Career = () => {
  const lat = 51.5033;
  const lng = -0.1195;
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  const fileRef = useRef(null);
  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    cv: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    setForm({ ...form, image: file });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("subject", form.subject);
      formData.append("message", form.message);
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
          email: "",
          subject: "",
          message: "",
          image: null,
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

  return (
    <>
      {" "}
      <Banner
        heading="Career"
        subheading=""
        caption="Build Your Future With Us"
        BannerBg={BannerBg}
      />
      <Box py={{ base: 12, md: 20 }}>
        <Container maxW="5xl">
          <Grid
            templateColumns={{ base: "1fr", md: "1.2fr 1fr" }}
            gap={{ base: 10, md: 16 }}
            alignItems="center"
          >
            {/* Left Content */}
            <GridItem>
              <FadeHeading
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bold"
                mb={6}
              >
                About{" "}
                <Text as="span" color="var(--color-primary)">
                  Fabriq Exhibits
                </Text>
              </FadeHeading>

              <Text fontSize="md" color="gray.700" mb={6} lineHeight="1.8">
                Welcome to FabriqExhibits, where we transform ideas into
                immersive brand experiences. We have successfully delivered
                7000+ exhibition stalls and creative spaces across global
                markets. From developing a concept to delivering the output, we
                apply strong design thinking with flawless on-ground execution
                to create an impactful environment that elevates your brand. We
                foster a client-first approach and exceed their expectations
                through reliable timelines, fostering long-term relationships.
                At FabriqExhibits, we craft experiences that engage, inspire,
                and deliver real results.
              </Text>

              <Heading fontSize="lg" mb={4}>
                We’re here!
              </Heading>

              <VStack align="start" spacing={4}>
                <HStack>
                  <Icon as={PhoneIcon} color="#c7a135" boxSize={5} />
                  <Text fontSize="lg" color="gray.700">
                    9958137313
                  </Text>
                </HStack>

                <HStack>
                  <Icon as={EmailIcon} color="#c7a135" boxSize={5} />
                  <Text fontSize="lg" color="gray.700">
                    Isha@fabriqexhibits.com
                  </Text>
                </HStack>

                <HStack>
                  <Icon as={MdLocationOn} color="#c7a135" boxSize={5} />
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
      <Box bg="black" py={{ base: 20, md: 32 }} position="relative">
        <Container maxW="4xl">
          <VStack spacing={6} textAlign="center">
            <Box color="white">
              {/* Header */}
              <VStack spacing={4} textAlign="center" mb={12}>
                <Heading size="xl">🌟 Our Belief</Heading>
                <Text maxW="800px" color="gray.300" fontSize={"13px"}>
                  At FabriqExhibits, we believe that our people are the
                  foundation of everything we create. Great design, flawless
                  execution, and global success are only possible when
                  individuals feel valued, empowered, and inspired. We are
                  committed to building a workplace where every team member has
                  the opportunity to grow, contribute, and thrive.
                </Text>
              </VStack>

              {/* Cards */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {/* Card 1 */}
                <Box
                  p={6}
                  fontSize={"13px"}
                  bg="gray.900"
                  borderRadius="2xl"
                  boxShadow="lg"
                  transition="0.3s"
                  _hover={{ transform: "translateY(-6px)", bg: "gray.800" }}
                >
                  <Text fontSize="2xl" mb={3}>
                    🤝
                  </Text>
                  <Heading size="md" mb={2}>
                    People First Culture
                  </Heading>
                  <Text color="gray.400" fontSize="md">
                    We foster a supportive and inclusive environment where ideas
                    are respected, collaboration is encouraged, and every voice
                    matters.
                  </Text>
                </Box>

                {/* Card 2 */}
                <Box
                  p={6}
                  bg="gray.900"
                  borderRadius="2xl"
                  boxShadow="lg"
                  transition="0.3s"
                  _hover={{ transform: "translateY(-6px)", bg: "gray.800" }}
                >
                  <Text fontSize="2xl" mb={3}>
                    🚀
                  </Text>
                  <Heading size="md" mb={2}>
                    Growth & Opportunities
                  </Heading>
                  <Text color="gray.400" fontSize="md">
                    We believe in continuous learning and professional
                    development, giving our team the tools and opportunities to
                    expand their skills and advance their careers.
                  </Text>
                </Box>

                {/* Card 3 */}
                <Box
                  p={6}
                  bg="gray.900"
                  borderRadius="2xl"
                  boxShadow="lg"
                  transition="0.3s"
                  _hover={{ transform: "translateY(-6px)", bg: "gray.800" }}
                >
                  <Text fontSize="2xl" mb={3}>
                    🛡️
                  </Text>
                  <Heading size="md" mb={2}>
                    Respect & Integrity
                  </Heading>
                  <Text color="gray.400" fontSize="md">
                    We uphold a culture of mutual respect, fairness, and
                    transparency—ensuring a workplace built on trust and
                    accountability.
                  </Text>
                </Box>

                {/* Card 4 */}
                <Box
                  p={6}
                  bg="gray.900"
                  borderRadius="2xl"
                  boxShadow="lg"
                  transition="0.3s"
                  _hover={{ transform: "translateY(-6px)", bg: "gray.800" }}
                >
                  <Text fontSize="2xl" mb={3}>
                    🔍
                  </Text>
                  <Heading size="md" mb={2}>
                    Ownership & Excellence
                  </Heading>
                  <Text color="gray.400" fontSize="md">
                    We encourage our team to take ownership of their work, with
                    a shared commitment to delivering excellence in every
                    project.
                  </Text>
                </Box>

                {/* Card 5 */}
                <Box
                  p={6}
                  bg="gray.900"
                  borderRadius="2xl"
                  boxShadow="lg"
                  transition="0.3s"
                  _hover={{ transform: "translateY(-6px)", bg: "gray.800" }}
                >
                  <Text fontSize="2xl" mb={3}>
                    🌍
                  </Text>
                  <Heading size="md" mb={2}>
                    Global Exposure
                  </Heading>
                  <Text color="gray.400" fontSize="md">
                    With projects across India and international markets, we
                    offer our team the chance to work on diverse and exciting
                    assignments that broaden perspectives.
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>
            {/* <Heading
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
            </Button> */}
          </VStack>
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
            <GridItem
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <FadeHeading mb={6}>
                Why{" "}
                <Text as="span" color="var(--color-primary)">
                  Join
                </Text>{" "}
                Us
              </FadeHeading>

              <Text fontWeight="500" mb={5} fontSize={"md"} color="gray.700">
                Be a Part of Something Inspiring
              </Text>

              <Text color="black" mb={6} fontSize={"md"} lineHeight="1.6">
                At FabriqExhibits, we believe that great work begins with great
                people. Joining us means becoming part of a team that is
                passionate about design, driven by excellence, and committed to
                delivering impactful experiences across global platforms.
              </Text>

              {/* Compact List */}
              <Box as="ul" pl={4} m={0} style={{ listStyleType: "none" }}>
                <Text as="li" mb={3} color="gray.700" fontSize="md">
                  🌍 <b>Work on Global Projects:</b> Be involved in exciting
                  projects across India and international markets. Gain exposure
                  to diverse industries, global exhibitions, and large-scale
                  design and build assignments.
                </Text>

                <Text as="li" mb={3} color="gray.700" fontSize="md">
                  🎯 <b>Make a Real Impact:</b> Your ideas and contributions
                  matter. We empower our team to take ownership, innovate, and
                  play a key role in shaping meaningful brand experiences.
                </Text>

                <Text as="li" mb={3} color="gray.700" fontSize="md">
                  📈 <b>Grow with Us:</b> We are committed to your professional
                  growth. From learning opportunities to hands-on project
                  exposure, we help you build skills and advance your career.
                </Text>

                <Text as="li" mb={3} color="gray.700" fontSize="md">
                  🤝 <b>Collaborative Culture:</b> Work in an environment that
                  values teamwork, open communication, and mutual respect. We
                  believe the best results come from strong collaboration.
                </Text>

                <Text as="li" mb={3} color="gray.700" fontSize="md">
                  🛠️ <b>End-to-End Exposure:</b>Experience the complete
                  journey—from concept and design to fabrication and
                  execution—giving you a holistic understanding of the industry.
                </Text>

                <Text as="li" mb={3} color="gray.700" fontSize="md">
                  🏆 <b>Driven by Excellence:</b> Be part of a team that strives
                  for quality, precision, and innovation in everything we do. We
                  celebrate achievements and continuously aim higher.
                </Text>

                <Text as="li" color="gray.700" fontSize="md">
                  💡 <b>Creative & Dynamic Environment:</b> No two days are the
                  same. Work on diverse, challenging, and creative projects that
                  keep you inspired and motivated.
                </Text>
              </Box>
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
                  placeholder="Your Email"
                  bg="white"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />

                <Input
                  placeholder="Enter position you are applying for"
                  bg="white"
                  name="subject"
                  value={form.subject}
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
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg"
                    bg="white"
                    ref={fileRef}
                    border={"none"}
                  />
                  {/* Custom Button */}
                  <Button
                    onClick={() => fileRef.current.click()}
                    onChange={handleImageUpload}
                    bg="#efefef"
                    p="5px"
                    position="absolute"
                    left="10px"
                    top="49%"
                    transform="translate(0%, -50%)"
                    fontSize="12px"
                    h="28px"
                    border="1px solid #737171"
                    borderRadius="3px"
                  >
                    Upload Resume
                  </Button>
                </Box>

                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  bg="white"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                />

                <Button
                  variant="outline"
                  borderColor="#c7a135"
                  color="gray.800"
                  px={8}
                  onClick={handleSubmit}
                  isDisabled={loading}
                  _hover={{
                    bg: "#c7a135",
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
      <Box py={{ base: 16, md: 24 }} bg="gray.50">
        <Container maxW="7xl">
          {/* Header */}
          <VStack spacing={4} textAlign="center" mb={14}>
            <FadeHeading mb={6}>
              Open{" "}
              <Text as="span" color="var(--color-primary)">
                Positions
              </Text>
            </FadeHeading>
            <Text color="black" maxW="700px">
              Join FabriqExhibits and be part of a team building impactful
              exhibition and design experiences across India and globally.
            </Text>
          </VStack>

          {/* Jobs Grid */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* Job 1 */}
            <Box p={6} bg="white" borderRadius="xl" boxShadow="md">
              <Heading size="md" mb={2}>
                🚀 Business Development Executive / Manager
              </Heading>

              <Text fontSize="md" color="black" mb={3}>
                Drive growth by identifying opportunities and building client
                relationships.
              </Text>

              <Text fontWeight="600" mb={2}>
                Key Responsibilities:
              </Text>
              <Box as="ul" pl={4} fontSize="md" color="black">
                <li>Identify new business opportunities</li>
                <li>Generate leads via networking & research</li>
                <li>Prepare proposals & presentations</li>
                <li>Maintain client relationships</li>
              </Box>

              <Text fontWeight="600" mt={3} mb={2}>
                Requirements:
              </Text>
              <Box as="ul" pl={4} fontSize="md" color="black">
                <li>2–6 years experience</li>
                <li>Strong communication skills</li>
                <li>Client-focused mindset</li>
              </Box>
            </Box>

            {/* Job 2 */}
            <Box p={6} bg="white" borderRadius="xl" boxShadow="md">
              <Heading size="md" mb={2}>
                🤝 Key Account Manager
              </Heading>

              <Text fontSize="md" color="black" mb={3}>
                Manage and nurture relationships with key clients.
              </Text>

              <Text fontWeight="600" mb={2}>
                Key Responsibilities:
              </Text>
              <Box as="ul" pl={4} fontSize="md" color="black">
                <li>Primary point of contact for clients</li>
                <li>Align services with client goals</li>
                <li>Ensure smooth project delivery</li>
              </Box>

              <Text fontWeight="600" mt={3} mb={2}>
                Requirements:
              </Text>
              <Box as="ul" pl={4} fontSize="md" color="black">
                <li>3–8 years experience</li>
                <li>Strong relationship skills</li>
                <li>Multi-client management</li>
              </Box>
            </Box>

            {/* Job 3 */}
            <Box p={6} bg="white" borderRadius="xl" boxShadow="md">
              <Heading size="md" mb={2}>
                🎨 3D Designer
              </Heading>

              <Text fontSize="md" color="black" mb={3}>
                Design exhibition stalls and interior spaces.
              </Text>

              <Text fontWeight="600" mb={2}>
                Key Responsibilities:
              </Text>
              <Box as="ul" pl={4} fontSize="md" color="black">
                <li>Create 3D concepts & renders</li>
                <li>Translate client briefs into design</li>
                <li>Collaborate with teams</li>
              </Box>

              <Text fontWeight="600" mt={3} mb={2}>
                Requirements:
              </Text>
              <Box as="ul" pl={4} fontSize="md" color="black">
                <li>2–5 years experience</li>
                <li>3ds Max, SketchUp, AutoCAD</li>
                <li>Strong design sense</li>
              </Box>
            </Box>

            {/* Job 4 */}
            <Box p={6} bg="white" borderRadius="xl" boxShadow="md">
              <Heading size="md" mb={2}>
                🖌️ Graphic Designer
              </Heading>

              <Text fontSize="md" color="black" mb={3}>
                Create visual designs for branding and marketing.
              </Text>

              <Text fontWeight="600" mb={2}>
                Key Responsibilities:
              </Text>
              <Box as="ul" pl={4} fontSize="md" color="black">
                <li>Design exhibition graphics</li>
                <li>Create marketing creatives</li>
                <li>Maintain brand consistency</li>
              </Box>

              <Text fontWeight="600" mt={3} mb={2}>
                Requirements:
              </Text>
              <Box as="ul" pl={4} fontSize="md" color="black">
                <li>2–5 years experience</li>
                <li>Adobe Creative Suite</li>
                <li>Strong layout & typography</li>
              </Box>
            </Box>

            {/* Job 5 */}
            <Box p={6} bg="white" borderRadius="xl" boxShadow="md">
              <Heading size="md" mb={2}>
                🛠️ Operations Head
              </Heading>

              <Text fontSize="md" color="black" mb={3}>
                Lead project execution and operations.
              </Text>

              <Text fontWeight="600" mb={2}>
                Key Responsibilities:
              </Text>
              <Box as="ul" pl={4} fontSize="md" color="black">
                <li>Oversee fabrication & execution</li>
                <li>Manage teams & vendors</li>
                <li>Ensure timely delivery</li>
              </Box>

              <Text fontWeight="600" mt={3} mb={2}>
                Requirements:
              </Text>
              <Box as="ul" pl={4} fontSize="md" color="black">
                <li>8–15 years experience</li>
                <li>Leadership & project management</li>
                <li>Large-scale project handling</li>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default Career;
