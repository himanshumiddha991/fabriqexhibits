import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  Spinner,
  Flex,
  Icon,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import api from "../../utils/api";

const Testimonial = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const toast = useToast();

  const limit = 6;

  const getTestimonials = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await api.get(
        `/api/testimonial?page=${pageNumber}&limit=${limit}`,
      );

      if (res.data.success) {
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTestimonials(page);
  }, [page]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const res = await api.delete(`/api/testimonial/${id}`);

      if (res.data.success) {
        toast({
          title: "Deleted Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        getTestimonials(page); // reload current page
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Delete Failed",
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Testimonial</Heading>

        <Button colorScheme="blue" as={Link} to="/admin/testimonial/create">
          Create
        </Button>
      </Flex>

      <Box py={16} bg="gray.50" minH="100vh">
        <Container maxW="7xl">
          {loading ? (
            <Flex justify="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              <Grid
                templateColumns={{
                  base: "repeat(1,1fr)",
                  md: "repeat(2,1fr)",
                  lg: "repeat(3,1fr)",
                }}
                gap={8}
              >
                {data.map((item) => (
                  <Box
                    key={item.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={5}
                    bg="white"
                    shadow="sm"
                    transition="0.3s"
                    _hover={{ shadow: "md", transform: "translateY(-5px)" }}
                  >
                    {item?.media?.file_path && (
                      <Image
                        src={`${process.env.REACT_APP_API_URL}/${item.media.file_path}`}
                        h="150px"
                        w="100%"
                        objectFit="cover"
                        borderRadius="md"
                        mb={4}
                      />
                    )}

                    <Stack spacing={2}>
                      <Text fontWeight="bold" fontSize="lg">
                        {item.name}
                      </Text>

                      <Text color="black" fontSize="md">
                        {item.message}
                      </Text>

                      <Flex pt={2}>
                        {[...Array(item.rating)].map((_, i) => (
                          <Icon key={i} as={FaStar} color="orange.400" />
                        ))}
                      </Flex>

                      <Flex gap={3} pt={3}>
                        <Button
                          size="sm"
                          colorScheme="green"
                          leftIcon={<FaEdit />}
                          onClick={() =>
                            navigate(`/admin/testimonial/${item.id}`)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          colorScheme="red"
                          leftIcon={<FaTrash />}
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </Flex>
                    </Stack>
                  </Box>
                ))}
              </Grid>

              {/* ⭐ Pagination */}
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
      </Box>
    </>
  );
};

export default Testimonial;
