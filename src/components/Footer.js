import {
  Box,
  Text,
  Heading,
  Input,
  Button,
  HStack,
  VStack,
  SimpleGrid,
  Link,
  Divider,
  Icon,
  Image,
  useToast,
  Flex,
  Container,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { MdLocationOn } from "react-icons/md";

import api from "../utils/api";
import logo from "../images/logos/logo.svg";
import vector_1 from "../images/svg/Vector_1.svg";
import vector_4 from "../images/svg/Vector_4.svg";
import vector_5 from "../images/svg/Vector_5.svg";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaVimeoV } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubscribe = async () => {
    try {
      if (!email) {
        alert("Email is requi#c7a135");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      // sending minimal data to same API
      formData.append("name", "Subscriber");
      formData.append("email", email);
      formData.append("subject", "Newsletter Subscription");
      formData.append("message", "User subscribed from website");
      const res = await api.post("/api/contact", formData);

      if (res.data.success) {
        toast({
          title: "Subscribed successfully",
          description: "We will contact you soon.",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });

        setEmail(""); // ✅ reset input
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <>
      <Box
        display={"none"}
        bg="#000"
        color="white"
        pt={{ base: 14, md: 20 }}
        pb={8}
        position={"relative"}
      >
        <Box
          className="hero-dot"
          top={["43%", "43%"]}
          left={["15%", "15%"]}
          width="600px"
          height="300px"
          filter="blur(180px)"
          opacity={0.4}
          transform="translate(-50%, -50%)"
        ></Box>
        <Image
          src={vector_1}
          alt="vector"
          position="absolute"
          top={["43%", "43%"]}
          left={["15%", "15%"]}
          transform="translate(-50%, -50%)"
          h={["75px", "75px"]}
        />

        {/* Newsletter Section */}
        <VStack
          spacing={5}
          maxW="720px"
          mx="auto"
          textAlign="center"
          px={6}
          position={"relative"}
        >
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
          <Box
            src={vector_5}
            position="absolute"
            top="-17px"
            right="24px"
            transform="translate(-50%,0%)"
            h={["25px", "37px"]}
            fill="#c7a135"
          />
          <Heading fontSize={{ base: "28px", md: "40px" }}>
            Never miss a single news
          </Heading>

          <Text fontSize="md" color="gray.400">
            Stay informed with all the latest updates and news about our events.
            Never miss a moment of our exciting and innovative gatherings in the
            world of technology and beyond.
          </Text>

          {/* Email Form */}
          <HStack
            zIndex={1}
            spacing={3}
            w="100%"
            maxW="520px"
            flexDir={{ base: "column", sm: "row" }}
          >
            <Input
              bg="white"
              color="black"
              placeholder="Enter your email address"
              _placeholder={{ color: "gray.500" }}
              borderRadius="8px"
              h="48px"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              bg="#6E3AFF"
              color="white"
              px={8}
              h="48px"
              borderRadius="8px"
              _hover={{ bg: "#5a2fe0" }}
              w={{ base: "100%", sm: "auto" }}
              onClick={handleSubscribe}
              isLoading={loading}
            >
              Subscribe
            </Button>
          </HStack>
        </VStack>

        {/* Footer Links */}
        <Box maxW="1200px" mx="auto" mt={16} px={6}>
          <SimpleGrid
            py={10}
            templateColumns={{ base: "1fr", md: "20% 60% 20%" }}
            gap={{ base: 6, md: 0 }}
            alignItems="center"
          >
            {/* Logo */}
            <Link to="/">
              <Image src={logo} alt="brand logo" h="70px" />
            </Link>

            <HStack
              spacing={6}
              gap={{ base: 4, md: 8 }}
              justify={{ base: "flex-start", md: "center" }}
              flexWrap="wrap"
            >
              {[
                { name: "About", path: "/about" },
                { name: "Gallery", path: "/gallery" },
                { name: "Process", path: "/process" },
                { name: "Career", path: "/career" },
                { name: "Exhibition Stands", path: "/exhibition-stands" },
              ].map((item) => (
                <Link
                  as={RouterLink}
                  to={item.path}
                  key={item.name}
                  fontSize="md"
                  color="gray.400"
                  _hover={{ color: "white" }}
                >
                  {item.name}
                </Link>
              ))}
            </HStack>

            {/* Social Icons */}
            <HStack
              display={"none"}
              spacing={4}
              justify={{ base: "flex-start", md: "flex-end" }}
            >
              {[FaTwitter, FaFacebookF, FaLinkedinIn, FaVimeoV].map(
                (IconComp, i) => (
                  <Box
                    key={i}
                    w="36px"
                    h="36px"
                    borderColor={"#6E3AFF"}
                    borderWidth="1px"
                    borderRadius="100%"
                    bg="#000"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ bg: "#6E3AFF" }}
                  >
                    <Icon as={IconComp} />
                  </Box>
                ),
              )}
            </HStack>
          </SimpleGrid>

          <Divider my={8} borderColor="gray.400" />

          {/* Bottom Bar */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Text fontSize="xs" color="gray.500">
              Copyright © Designmonks All Rights Reserved
            </Text>

            <HStack
              spacing={6}
              justify={{ base: "flex-start", md: "flex-end" }}
            >
              <Link fontSize="xs" color="gray.500">
                Terms & Conditions
              </Link>
              <Link fontSize="xs" color="gray.500">
                Privacy Policy
              </Link>
            </HStack>
          </SimpleGrid>
        </Box>
      </Box>
      <Box bg="#000" borderTopWidth="3px" borderTopColor="#c7a135">
        <Container maxW="8xl">
          <Box color="white" py={{ base: 10, md: 16 }} px={6}>
            <SimpleGrid
              maxW="1300px"
              mx="auto"
              minChildWidth="250px"
              spacing={10}
            >
              {/* LEFT SECTION */}
              <Box>
                <Image src={logo} alt="logo" h="80px" mt={"-20px"} mb={4} />

                <Text fontWeight="bold" mb={2}>
                  FABRIQ EXHIBITS
                </Text>

                <Text fontSize="md" color="gray.400" lineHeight="1.7">
                  Fabriq Exhibits is a trusted exhibition stand builder and
                  booth design company, delivering innovative stall design,
                  fabrication, and turnkey exhibition solutions for brands
                  across industries.
                </Text>
              </Box>

              {/* INFO */}
              <Box>
                <Text
                  fontWeight="bold"
                  mb={4}
                  borderBottom="2px solid #c7a135"
                  w="fit-content"
                >
                  Info
                </Text>

                <VStack align="start" spacing={4}>
                  <HStack>
                    <Icon as={PhoneIcon} color="#c7a135" boxSize={4} />
                    <Text fontSize="md" color="gray.400">
                      9958137313
                    </Text>
                  </HStack>

                  <HStack>
                    <Icon as={EmailIcon} color="#c7a135" boxSize={4} />
                    <Text fontSize="md" color="gray.400">
                      Isha@fabriqexhibits.com
                    </Text>
                  </HStack>

                  <HStack>
                    <Icon as={MdLocationOn} color="#c7a135" boxSize={4} />
                    <Text fontSize="md" color="gray.400">
                      T-17, Tower C, Baani Square Sector 50, Gurugram – 122018
                      Haryana, India{" "}
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              {/* QUICK LINKS */}
              <Box>
                <Text
                  fontWeight="bold"
                  mb={4}
                  borderBottom="2px solid #c7a135"
                  w="fit-content"
                >
                  Quick Links
                </Text>

                {[
                  { label: "Home", link: "/" },
                  { label: "About Us", link: "/about" },
                  { label: "Our Portfolio", link: "/portfolio" },
                  { label: "Career", link: "/career" },
                  { label: "Blogs", link: "/blogs" },
                  { label: "Clients", link: "/clients" },
                  { label: "Contact Us", link: "/contact-us" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    fontSize="md"
                    color="gray.400"
                    display="block"
                    mb={2}
                    _hover={{ color: "white" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Box>

              {/* SERVICES */}
              <Box>
                <Text
                  fontWeight="bold"
                  mb={4}
                  borderBottom="2px solid #c7a135"
                  w="fit-content"
                >
                  Our Services
                </Text>

                {[
                  {
                    label: "Custom Stall Design & Stall Fabrication",
                    link: "/services/exhibitions",
                  },
                  {
                    label: "Retail/Office Interiors",
                    link: "/services/retail-office-interiors",
                  },
                  {
                    label: "Graphic Designing",
                    link: "/services/graphics-design",
                  },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    fontSize="md"
                    color="gray.400"
                    display="block"
                    mb={2}
                    _hover={{ color: "white" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Box>
            </SimpleGrid>

            {/* BOTTOM BAR */}
            <Divider my={10} borderColor="gray.400" />

            <Flex
              maxW="1300px"
              mx="auto"
              justify="center"
              alignItems={"center"}
              flexDir={{ base: "column", md: "column" }}
              gap={4}
            >
              <Text fontSize="md" color="gray.500">
                © {new Date().getFullYear()} Fabriq Exhibits. All Rights
                Reserved.
              </Text>
              <Link
                fontSize="md"
                color="gray.500"
                href="https://digitalwhopper.com/"
                isExternal
              >
                Designed & Developed by Digital Whopper
              </Link>
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Footer;
