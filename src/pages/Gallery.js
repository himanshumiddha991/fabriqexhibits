import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import MediaMosaic from "../components/MediaMosaic";
import api from "../utils/api";
import {
  Box,
  Container,
  Text,
  Spinner,
  Flex,
  Button,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import BannerBg from "../images/banner/2.webp";
import MediaModal from "../components/MediaModal";
import { galleryCategories } from "../utils/galleryCategories";
const Gallery = () => {
  const location = useLocation();
  console.log(location.state); // { from: "homepage" }
  const passedTag = location.state?.tag || "";
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagFilter, setTagFilter] = useState(passedTag);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const limit = 8;
  const getGallery = useCallback(
    async (pageNumber = 1, tag = tagFilter) => {
      try {
        setLoading(true);

        let url = `/api/gallary?page=${pageNumber}&limit=${limit}`;

        if (tag) url += `&tag=${tag}`;

        const res = await api.get(url);

        if (res.data.success) {
          setGallery(res.data.data);
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [tagFilter], // dependency
  );
  useEffect(() => {
    getGallery(page);
  }, [page, getGallery]);

  const openMedia = (item) => {
    setSelectedMedia({
      type: item?.media?.file_type,
      url: `${process.env.REACT_APP_API_URL}/${item?.media?.file_path}`,
      title: item?.media?.title,
      description: item?.media?.description,
      alt: item?.media?.alt,
    });
    onOpen();
  };
  return (
    <>
      <Banner
        subheading="Spaces That Speak. Designs That Perform."
        heading="Gallery"
        caption={
          <>
            A showcase of our work across exhibitions, retail, and global
            projects.
          </>
        }
        BannerBg={BannerBg}
      />
      <Box py={12}>
        <Container maxW="5xl">
          <Box
            display="flex"
            position={"relative"}
            justifyContent="center"
            mb={8}
          >
            <Box
              className="hero-dot"
              height={"300px"}
              width={"300px"}
              left={"35%"}
              zIndex={-1}
            ></Box>
            <Select
              zIndex={1}
              bg={"white"}
              border={"none"}
              placeholder="Explore by Category"
              value={tagFilter}
              onChange={(e) => {
                setTagFilter(e.target.value);
                getGallery(1, e.target.value);
              }}
              w="250px"
            >
              {galleryCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Select>
          </Box>
          {loading ? <Spinner size="xl" /> : <MediaMosaic items={gallery} />}
        </Container>
      </Box>
      <Flex pb={5} justify="center" mt={10} gap={4} align="center">
        <Button
          onClick={() => setPage((p) => p - 1)}
          isDisabled={page === 1}
          leftIcon={<ChevronLeftIcon />}
        />

        <Button
          onClick={() => setPage((p) => p + 1)}
          isDisabled={page === totalPages}
          rightIcon={<ChevronRightIcon />}
        />
      </Flex>
      <MediaModal isOpen={isOpen} onClose={onClose} media={selectedMedia} />
    </>
  );
};

export default Gallery;
