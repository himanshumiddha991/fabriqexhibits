import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Spinner,
  Flex,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";
import api from "../../utils/api";

const ContactCollection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const limit = 6;

  const getContacts = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await api.get(
        `/api/contact?page=${pageNumber}&limit=${limit}`,
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
    getContacts(page);
  }, [page]);

  return (
    <>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Contact Messages</Heading>
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
                    p={5}
                    bg="white"
                    shadow="sm"
                    transition="0.3s"
                    _hover={{ shadow: "md", transform: "translateY(-5px)" }}
                  >
                    <Stack spacing={2}>
                      <Text fontWeight="bold">{item.name}</Text>

                      <Text fontSize="md" color="black">
                        {item.email}
                      </Text>

                      <Text fontWeight="semibold">{item.subject}</Text>

                      {/* Message preview */}
                      <Text fontSize="md" noOfLines={3}>
                        {item.message}
                      </Text>

                      <Text fontSize="xs" color="gray.500">
                        {new Date(item.created_at).toLocaleString()}
                      </Text>

                      <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<ViewIcon />}
                        onClick={() => navigate(`/admin/contact/${item.id}`)}
                      >
                        View
                      </Button>
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

export default ContactCollection;
