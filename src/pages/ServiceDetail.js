import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Stack,
  Image,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MediaMosaic from "../components/MediaMosaic";
import { useBreakpointValue } from "@chakra-ui/react";
import slide_1 from "../images/slides/slide_1.jpeg";
import slide_2 from "../images/slides/slide_2.jpeg";
import slide_3 from "../images/slides/slide_3.jpeg";
import m_slide_1 from "../images/slides/slide_1_small.jpeg";
import m_slide_2 from "../images/slides/slide_2_small.jpeg";
import m_slide_3 from "../images/slides/slide_3_small.jpeg";
import project_1 from "../images/projects/project_1.jpeg";
import project_2 from "../images/projects/project_2.jpeg";
import project_3 from "../images/projects/project_3.jpeg";
import project_4 from "../images/projects/project_4.jpeg";
import api from "../utils/api";
import "../styles/about.css";
const ServiceDetail = () => {
  const { slug } = useParams();
  const [gallery, setGallery] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [current, setCurrent] = useState(0);
  const desktopSlides = [slide_1, slide_2, slide_3];
  const mobileSlides = [m_slide_1, m_slide_2, m_slide_3];

  const slideImages = useBreakpointValue({
    base: mobileSlides, // mobile
    md: desktopSlides, // desktop
  });
  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const servicesData = [
    {
      slug: "exhibitions",
      slidertitle: "Building Spaces that Command Attention",
      slidersubtitle:
        "FabriqExhibits delivers the best custom stall design and fabrication solutions, creating impactful, engaging exhibition spaces for brands globally.",

      title:
        'Creating Exhibition Spaces That <span style="color: var(--color-primary)">Stand Out</span>',
      metaTitle: "Exhibition Stands Design & Build | Fabrig Exhibits",
      metaDescription:
        "Fabrig Exhibits helps you design and build exhibition stands. We offer simple, creative, and complete booth services for your business.",
      tag: "exhibition",
      slides: [slide_1, slide_2, slide_3],

      description: `<section class="about-section">
  <div class="container">
    <p>
      At <strong>FabriqExhibits</strong>, we specialize in designing and fabricating custom exhibition stalls that capture attention and communicate your brand effectively.
    </p>

    <p>
      From concept development and 3D visualization to fabrication and on-site installation, we deliver<strong> turnkey exhibition solutions globally.</strong>
    </p>
      
    <h3><strong>What We Offer:</strong></h3>
    
    <ul>
      <li>Custom Exhibition Stall Design</li>
      <li>Modular & Custom Booth Fabrication</li>
      <li>Pavilion Design & Execution</li>
      <li>3D Concepts & Visualization</li>
      <li>Global Installation & Dismantling</li>
    </ul>

    <h3><strong>Why Choose Us:</strong></h3>
   
    <ul>
      <li>Innovative and functional designs</li>
      <li>Precision fabrication</li>
      <li>On-time delivery worldwide</li>
    </ul>

  

  </div>
</section>`,
    },

    {
      slug: "retail-office-interiors",
      slidertitle: "Designing Interiors that Inspire",
      slidersubtitle:
        "We design functional and brand-oriented retail and office interiors that enhance customer experience and productivity.",

      title:
        'Designing <span style="color: var(--color-primary)">Spaces</span> That Reflect Your Brand',
      metaTitle: "Exhibition Stand Design & Build Services | Fabrig",
      metaDescription:
        "We design and build exhibition stands that help your brand stand out. Simple, creative, and complete booth solutions by Fabrig Exhibits.",
      tag: "retail-interiors",
      slides: [slide_3, project_1, project_2],

      description: `<section class="interior-section about-section">
  <div class="container">

   

    <p>
We create modern, functional, and aesthetically driven retail and office environments that enhance customer experience and productivity.</p>

    <h3><strong>Our Expertise:</strong></h3>
    
    <ul>
      <li>Retail Store Design & Execution</li>
      <li>Office Interiors & Workspace Design</li>
      <li>Brand Experience Centres</li>
      <li>Custom Furniture & Fixtures</li>
    </ul>

    <h3><strong>Our Approach:</strong></h3>

    <p>
      We blend design, functionality, and brand identity to deliver spaces that are both visually appealing and highly practical.
    </p>

  </div>
</section>`,
    },

    {
      slug: "graphics-design",
      slidertitle: "Graphics That Steal The Spotlight",
      slidersubtitle:
        "FabriqExhibits deliver high-impact graphics that command attention and leave a lasting impression on your audiences.",

      title:
        'Visual <span style="color: var(--color-primary)">Communication</span> That Makes an Impact',
      metaTitle:
        "Creative Graphics Design Services | Exhibition & Brand Design Company India",
      metaDescription:
        "Explore professional graphic design services for exhibitions, branding, and marketing creatives. We create visually compelling designs that enhance brand identity and engagement worldwide.",
      tag: "theme-events",
      slides: [project_3, project_4, slide_1],

      description: `<section class="visual-section about-section">
  <div class="container">

   

    <p>
      Our graphic design solutions ensure your brand stands out visually across exhibitions, retail spaces, and marketing platforms.
    </p>

    <h3><strong>Services Include: </strong></h3>
    <ul>
      <li>Exhibition Graphics & Branding</li>
      <li>Large Format Printing Designs</li>
      <li>Corporate Branding & Identity</li>
      <li>Marketing Collaterals</li>
    </ul>

<h3><strong>What Sets Us Apart: </strong></h3>
 <ul>
      <li>Strong design language aligned with brand identity</li>
      <li>High-quality, impactful visuals</li>
      <li>Seamless integration with physical spaces </li>
  
    </ul>

  </div>
</section> `,
    },
  ];
  const service = servicesData.find((item) => item.slug === slug);
  // const mediaItems = useSelector((s) => s.gallery.data);
  const [mediaTag, setMediaTag] = useState("exhibition");

  useEffect(() => {
    if (service) {
      setMediaTag(service.tag);
    }
  }, [service]);

  useEffect(() => {
    getGallery();
    setVisibleCount(8);
  }, [mediaTag]);

  if (!service) {
    return <h1>Service Not Found</h1>;
  }

  const limit = 50;
  const mergeUniqueById = (oldData, newData) => {
    const map = new Map();
    oldData.forEach((item) => map.set(item.id, item));
    newData.forEach((item) => map.set(item.id, item));
    return Array.from(map.values());
  };

  const getGallery = async () => {
    try {
      let page = 1;
      let totalPages = 1;
      let allData = [];

      while (page <= totalPages) {
        const res = await api.get(
          `/api/gallary?page=${page}&limit=${limit}&tag=${mediaTag}`,
        );

        if (res.data.success) {
          allData = [...allData, ...res.data.data];
          totalPages = res.data.totalPages;
        }

        page++;
      }

      setGallery((prev) => mergeUniqueById(prev, allData));
    } catch (err) {
      console.log(err);
    }
  };
  const imageGallery = gallery.filter(
    (item) =>
      item?.media?.file_type === "image" &&
      item?.tags?.toLowerCase().includes(mediaTag),
  );

  const visibleImages = imageGallery.slice(0, visibleCount);
  return (
    <>
      {" "}
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
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
        {service.slides.map((img, index) => (
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
            <Box
              color={"white"}
              fontWeight={"800"}
              fontSize={{ base: "20px", md: "30px" }}
            >
              {service && service.slidertitle
                ? service.slidertitle
                : "Designing Experiences. Building Global Impact."}
            </Box>
            <p className="hero-desc" fontSize={"16px"}>
              {service && service.slidersubtitle
                ? service.slidersubtitle
                : "Welcome to FabriqExhibits — India’s acclaimed exhibition stall building and fabrication company, creating world-class brand environments across the globe."}
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
      {/* Page Content */}
      <Box p="40px" w={{ base: "100%", md: "70%" }} mx="auto">
        <Heading
          as="h1"
          mb={4}
          textAlign="center"
          dangerouslySetInnerHTML={{ __html: service.title }}
        />
        <Box
          className="blog-description"
          mt={10}
          dangerouslySetInnerHTML={{
            __html: service.description,
          }}
        />
      </Box>
      <Box w={{ base: "100%", md: "70%" }} mx="auto" p="40px">
        <MediaMosaic items={visibleImages} ShowTitle={true} tag={mediaTag} />
        {/* <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {visibleImages.map((item) => (
            <Box
              key={item.id}
              h="280px"
              position="relative"
              overflow="hidden"
              borderRadius="10px"
            >
              <Box
                bgGradient="linear(to-t, rgba(0,0,0,0.9), rgba(0,0,0,0))"
                position="absolute"
                w="100%"
                h="100%"
              />

              <Box
                as="img"
                src={`${process.env.REACT_APP_API_URL}/${item.media.thumbnail_path || item.media.file_path}`}
                loading="lazy"
                width="100%"
                height="100%"
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </SimpleGrid> */}
      </Box>
      {visibleCount < imageGallery.length && (
        <Box display="flex" justifyContent="center" py={10}>
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            style={{
              background: "var(--color-primary)",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
            }}
          >
            Load More
          </button>
        </Box>
      )}
    </>
  );
};

export default ServiceDetail;
