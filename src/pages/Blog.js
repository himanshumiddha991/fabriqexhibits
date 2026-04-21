import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import {
  Box,
  Container,
  Image,
  Text,
  Heading,
  HStack,
  Icon,
  Badge,
  Stack,
  Grid,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { FaUser, FaComments } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { Link } from "react-router-dom";
import api from "../utils/api";
import BannerBg from "../images/banner/5.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 3;

  const getBlogs = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await api.get(`/api/blogs?page=${pageNumber}&limit=${limit}`);

      if (res.data.success) {
        setBlogs(res.data.data);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs(page);
  }, [page]);

  return (
    <>
      <Banner heading="Blog" BannerBg={BannerBg} />

      <Box py={16} bg="#fffff">
        <Container maxW="6xl">
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <>
              <Box gap={8}>
                {blogs.map((blog) => (
                  <Box key={blog.id} overflow="hidden" mb={6}>
                    {/* https://www.youtube.com/watch?v=L4svea3-svY */}
                    {/* Image */}
                    <Box position="relative">
                      <Image
                        src={`${process.env.REACT_APP_API_URL}/${blog.media?.file_path}`}
                        alt={blog.title}
                        h={{ xl: "540px", md: "300px", base: "250px" }}
                        w="100%"
                        objectFit="cover"
                        className="blog-image"
                      />

                      {/* Title Overlay */}
                      <Box
                        position="absolute"
                        bottom="30px"
                        left="0"
                        w="100%"
                        color="white"
                        p={4}
                      >
                        <Heading as={Link} to={`/blog/${blog.slug}`} size="sm">
                          {blog.title}
                        </Heading>
                      </Box>
                      {/* Date */}
                      <Badge
                        position="absolute"
                        bottom="0"
                        right="100px"
                        h="54px"
                        w="62px"
                        bg="white"
                        color="#F7697F"
                        borderRadius="10px 10px 0 0"
                        border="2px solid #F7697F"
                        borderBottom="none"
                        display="flex"
                        p="0"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          w="100%"
                          h="100%"
                          p="0"
                          m="0"
                          borderRadius="8px"
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                          alignItems="center"
                          className="badge-container"
                        >
                          <Box fontSize="18px" fontWeight="bold">
                            {new Date(blog.created_at).getDate()}
                          </Box>
                          <Box fontSize="12px" textTransform="uppercase">
                            {new Date(blog.created_at).toLocaleString("en-US", {
                              month: "short",
                            })}
                          </Box>
                          <Box className="badge-container-layer"></Box>
                        </Box>
                      </Badge>
                    </Box>

                    {/* Meta */}
                    <Stack py={4}>
                      <HStack spacing={6} color="black">
                        <HStack>
                          <Icon as={MdArticle} color="red.400" />
                          <Text fontSize="md">News</Text>
                        </HStack>

                        <HStack>
                          <Icon as={FaUser} color="red.400" />
                          <Text fontSize="md">Admin</Text>
                        </HStack>

                        <HStack>
                          <Icon as={FaComments} color="red.400" />
                          <Text fontSize="md">Comment</Text>
                        </HStack>
                      </HStack>

                      <Text
                        noOfLines={8}
                        fontSize={13}
                        dangerouslySetInnerHTML={{
                          __html: blog.description
                            ?.replace(/<p>\s*<\/p>/g, "")
                            .replace(/<br\s*\/?>/gi, "")
                            .trim(),
                        }}
                      />
                    </Stack>
                  </Box>
                ))}
              </Box>

              {/* Pagination */}
              <Flex justify="center" mt={10} align="center" gap={4}>
                <Button
                  onClick={() => setPage((prev) => prev - 1)}
                  isDisabled={page === 1}
                  leftIcon={<ChevronLeftIcon />}
                ></Button>

                <Text fontWeight="medium">
                  {page} / {totalPages}
                </Text>

                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  isDisabled={page === totalPages}
                  rightIcon={<ChevronRightIcon />}
                ></Button>
              </Flex>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Blog;
