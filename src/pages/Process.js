import React from "react";
import Banner from "../components/Banner";
import ExpandableCardsGroup from "../components/ExpandableCardsGroup";
import { Link } from "react-router-dom";
import {
  Box,
  GridItem,
  Stack,
  Image,
  Text,
  Container,
  Button,
  Grid,
  Heading,
} from "@chakra-ui/react";
import Vector_12 from "../images/svg/Vector_12.svg";
import Vector_13 from "../images/svg/Vector_13.svg";
import Vector_14 from "../images/svg/Vector_14.svg";
const Process = () => {
  const global_reco = [
    {
      id: 1,
      title: "Friendship Club",
      desc: "50k views",
      image: "https://picsum.photos/seed/people2/1920/1080",
    },
    {
      id: 2,
      title: "Business Conference",
      desc: "24k views",
      image: "https://picsum.photos/seed/crowd4/1920/1080",
    },
    {
      id: 3,
      title: "Holi Festival",
      desc: "26k views",
      image:
        "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: 4,
      title: "Next-gen Marketing",
      desc: "30k views",
      image: "https://picsum.photos/seed/crowd4/1920/1080",
    },
  ];
  const steps = [
    {
      title: "Find your place",
      description: "Choose a local place you wanna make a trip.",
      image: Vector_12,
    },
    {
      title: "Choose a guide",
      description: "Tell your hero about yourself and how you like to travel.",
      image: Vector_13,
    },
    {
      title: "Confirm your Design",
      description: "If it fulfills your priority you have confirm your tour.",
      image: Vector_14,
    },
  ];
  return (
    <>
      <Banner heading="Process" />
      <Box bg="#f7f7f7" py={20}>
        <Container maxW="6xl">
          <Heading
            textAlign="center"
            fontSize={{ base: "24px", md: "28px" }}
            mb={12}
            color="gray.700"
          >
            How Does it Works
          </Heading>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }}
            gap={10}
            textAlign="center"
          >
            {steps.map((step, index) => (
              <GridItem key={index}>
                <Stack spacing={4} align="center">
                  <Image
                    src={step.image}
                    alt={step.title}
                    boxSize="110px"
                    objectFit="contain"
                  />

                  <Text fontWeight="600" color="blue.500" fontSize="md">
                    {step.title}
                  </Text>

                  <Text fontSize="md" color="gray.500" maxW="240px">
                    {step.description}
                  </Text>
                </Stack>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box py={12} bg="var(--color-secondary)">
        <Container maxW="5xl">
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
              fontFamily={"Montserrat"}
              fontWeight="600"
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
            textReverse={true}
          />
        </Container>
      </Box>
    </>
  );
};

export default Process;
