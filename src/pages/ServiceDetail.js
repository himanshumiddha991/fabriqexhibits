import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Button, Stack, Image, Heading } from "@chakra-ui/react";
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
const ServiceDetail = () => {
  const { slug } = useParams();

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
      slidersubtitle: "FabriqExhibits delivers the best custom stall design and fabrication solutions, creating impactful, engaging exhibition spaces for brands globally.",
      
      title: "Exhibition Stands That Create Impact",
      metaTitle: "Exhibition Stands Design & Build | Fabrig Exhibits",
      metaDescription:
        "Fabrig Exhibits helps you design and build exhibition stands. We offer simple, creative, and complete booth services for your business.",
      tag: "exhibition",
      slides: [slide_1, slide_2, slide_3],

      description: `<section class="about-section">
  <div class="container">
    <p>
      At <strong>FabriqExhibits</strong>, we are experts in designing and fabricating custom exhibition stalls that capture attention and effectively establish your brand identity.
    </p>

    <p>
      From concept development and 3D visualization to fabrication and on-site installation, we deliver turnkey exhibition solutions across the globe.
    </p>

    <h3><strong>Our Deliverables:</strong></h3>
    <ul>
      <li>Custom Exhibition Stall Design</li>
      <li>Modular & Custom Booth Fabrication</li>
      <li>Pavilion Design & Execution</li>
      <li>3D Concepts & Visualization</li>
      <li>Global Installation & Dismantling</li>
    </ul>

    <h3><strong>Advantages of Choosing FabriqExhibits:</strong></h3>
    
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
      slidersubtitle: "We design functional and brand-oriented retail and office interiors that enhance customer experience and productivity.",
      
      title: "Retail & Office Interior Design",
      metaTitle: "Exhibition Stand Design & Build Services | Fabrig",
      metaDescription:
        "We design and build exhibition stands that help your brand stand out. Simple, creative, and complete booth solutions by Fabrig Exhibits.",
      tag: "retail-interiors",
      slides: [slide_3, project_1, project_2],

      description: `<section class="interior-section">
  <div class="container">

    <h2>><strong>Blending Your Brand’s Reflection in Your Interior</strong></h2>

    <p>
We are committed to engineering sophisticated and functional retail and office environments that not only elevate your customer experience but also amplify the productivity levels of the people living in the space.    </p>

    <h3><strong>Our Expertise:</strong></h3>
    
    <ul>
      <li>Retail Store Design & Execution</li>
      <li>Office Interiors & Workspace Design</li>
      <li>Brand Experience Centres</li>
      <li>Custom Furniture & Fixtures</li>
    </ul>

    <h2>Designing Visuals that Define Your Brand</h2>

    <p>
      At <strong>FabriqExhibits</strong>, we create high-impact brand identities, ensuring consistency across all exhibition, retail spaces, and digital platforms.
    </p>

  </div>
</section>`,
    },

    {
      slug: "graphics-design",
      slidertitle: "Graphics That Steal The Spotlight",
      slidersubtitle: "FabriqExhibits deliver high-impact graphics that command attention and leave a lasting impression on your audiences.",
      
      title: "Creative Graphics Design Services",
      metaTitle:
        "Creative Graphics Design Services | Exhibition & Brand Design Company India",
      metaDescription:
        "Explore professional graphic design services for exhibitions, branding, and marketing creatives. We create visually compelling designs that enhance brand identity and engagement worldwide.",
      tag: "theme-events",
      slides: [project_3, project_4, slide_1],

      description: `<section class="visual-section">
  <div class="container">

    <h2><strong>Designing Visuals That Make Your Brand Go Viral</strong></h2>

    <p>
      Our creative graphic design solutions transform your brand identity into a commanding visual narrative. With our communication strategies and aesthetic visuals, we ensure that your brand consistently captures the spotlight across all major international exhibitions, bespoke retail environments, as well as high-impact marketing platforms — making your brand’s message go viral.
    </p>

    <h3><strong>Our Services Include: </strong></h3>
    <ul>
      <li>Exhibition Graphics & Branding</li>
      <li>Large Format Printing Designs</li>
      <li>Corporate Branding & Identity</li>
      <li>Marketing Collaterals</li>
    </ul>

  </div>
</section> `,
    },
  ];
  const service = servicesData.find((item) => item.slug === slug);
  const mediaItems = useSelector((s) => s.gallery.data);
  const [mediaTag, setMediaTag] = useState("exhibition");
  useEffect(() => {
    if (service) {
      setMediaTag(service.tag);
    }
  }, [service]);
  if (!service) {
    return <h1>Service Not Found</h1>;
  }
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
        <Heading as="h1" mb={4} textAlign="center">
          {service.title}
        </Heading>
        <Box
          className="blog-description"
          mt={10}
          dangerouslySetInnerHTML={{
            __html: service.description,
          }}
        />
      </Box>
      <Box w={{ base: "100%", md: "70%" }} mx="auto" p="40px">
        <MediaMosaic items={mediaItems} ShowTitle={true} tag={mediaTag} />
      </Box>
    </>
  );
};

export default ServiceDetail;
