import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  Spinner,
  Flex,
  Button,
  Icon,
  Card,
  CardBody,
  useToast,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlay, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import MediaModal from "../../components/MediaModal";
import { galleryCategories } from "../../utils/galleryCategories";
const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagFilter, setTagFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const limit = 8;
  const navigate = useNavigate();
  const toast = useToast();

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

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const res = await api.delete(`/api/gallary/${id}`);

      if (res.data.success) {
        toast({
          title: "Deleted Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        getGallery(page);
      }
    } catch (error) {
      toast({
        title: "Delete Failed",
        status: "error",
        duration: 2000,
      });
    }
  };

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
      <Flex justify="space-between" mb={6} wrap="wrap" gap={4}>
        <Heading size="lg">Gallery</Heading>

        <Flex gap={3}>
          <Select
            placeholder="Filter by Tag"
            value={tagFilter}
            onChange={(e) => {
              setTagFilter(e.target.value);
              getGallery(1, e.target.value);
              setPage(1);
            }}
            w="250px"
          >
            {/* <option value="exhibition">Exhibition</option>
            <option value="retail-interiors">Retail Interiors</option>
            <option value="theme-events">Theme Events</option>
            <option value="conferences-seminars">Conferences & Seminars</option>
            <option value="international">International</option>
            <option value="awards">Awards</option>
            <option value="portfolio">Portfolio</option>
            <option value="countries">Clients</option>
            <option value="showcasing-stands">Showcasing Stands</option> */}
            {galleryCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Select>

          <Button colorScheme="blue" as={Link} to="/admin/gallary/create">
            Create Media
          </Button>
        </Flex>
      </Flex>

      <Box py={10}>
        <Container maxW="7xl">
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <>
              <Grid
                templateColumns="repeat(auto-fill,minmax(250px,1fr))"
                gap={6}
              >
                {gallery.map((item) => (
                  <Box
                    key={item.id}
                    cursor="pointer"
                    overflow="hidden"
                    borderRadius="lg"
                    onClick={() => openMedia(item)}
                  >
                    <Card>
                      <CardBody p="0">
                        <Box position="relative">
                          <Image
                            src={`${process.env.REACT_APP_API_URL}/${
                              item?.media?.file_type === "image"
                                ? item?.media?.file_path
                                : item?.media?.thumbnail_path
                            }`}
                            h="250px"
                            w="100%"
                            objectFit="cover"
                            transition="0.4s"
                            _hover={{ transform: "scale(1.1)" }}
                          />

                          {item?.media?.file_type === "video" && (
                            <Flex
                              position="absolute"
                              top="0"
                              left="0"
                              w="100%"
                              h="100%"
                              justify="center"
                              align="center"
                              bg="rgba(0,0,0,0.4)"
                            >
                              <Icon as={FaPlay} color="white" boxSize={10} />
                            </Flex>
                          )}
                        </Box>

                        <Flex direction="column" p="3" gap="2">
                          <Text fontWeight="600">
                            {galleryCategories.find(
                              (cat) => cat.value === item?.tags,
                            )?.label || item?.tags}
                          </Text>

                          <Flex gap={3} pt={3}>
                            <Button
                              size="sm"
                              colorScheme="green"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/admin/gallary/${item.id}`, {
                                  state: { tag: tagFilter },
                                });
                              }}
                              leftIcon={<FaEdit />}
                            >
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              colorScheme="red"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item.id);
                              }}
                              leftIcon={<FaTrash />}
                            >
                              Delete
                            </Button>
                          </Flex>
                        </Flex>
                      </CardBody>
                    </Card>
                  </Box>
                ))}
              </Grid>

              <Flex justify="center" mt={10} gap={4} align="center">
                <Button
                  onClick={() => setPage((p) => p - 1)}
                  isDisabled={page === 1}
                  leftIcon={<ChevronLeftIcon />}
                />

                <Text>
                  {page} / {totalPages}
                </Text>

                <Button
                  onClick={() => setPage((p) => p + 1)}
                  isDisabled={page === totalPages}
                  rightIcon={<ChevronRightIcon />}
                />
              </Flex>
            </>
          )}
        </Container>

        <MediaModal isOpen={isOpen} onClose={onClose} media={selectedMedia} />
      </Box>
    </>
  );
};

export default Gallery;
