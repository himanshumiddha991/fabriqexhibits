import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Heading,
  Spinner,
  Stack,
  HStack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function Blogs() {
  const navigate = useNavigate();

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

  const deleteBlog = async (id) => {
    try {
      await api.delete(`/api/blog/${id}`);

      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    getBlogs(page);
  }, [page]);

  return (
    <>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Blogs</Heading>

        <Button colorScheme="blue" as={Link} to="/admin/blog/create-blog">
          Create Blog
        </Button>
      </Flex>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2,1fr)",
              lg: "repeat(3,1fr)",
            }}
            gap={6}
          >
            {blogs.map((blog) => (
              <Box
                key={blog.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg="white"
                shadow="md"
              >
                <Image
                  src={`${process.env.REACT_APP_API_URL}/${blog.media?.file_path}`}
                  alt={blog.title}
                  h="200px"
                  w="100%"
                  objectFit="cover"
                />

                <Stack p={4}>
                  <Heading size="md">{blog.title}</Heading>

                  <Text fontSize="md" color="gray.500">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </Text>

                  <Text
                    as="div"
                    noOfLines={3}
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />

                  <HStack pt={3}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => navigate(`/admin/blog/${blog.slug}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => deleteBlog(blog.id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Stack>
              </Box>
            ))}
          </Grid>

          {/* PAGINATION */}
          <Flex justify="center" mt={8} gap={4}>
            <Button
              onClick={() => setPage((prev) => prev - 1)}
              isDisabled={page === 1}
            >
              Previous
            </Button>

            <Text alignSelf="center">
              Page {page} of {totalPages}
            </Text>

            <Button
              onClick={() => setPage((prev) => prev + 1)}
              isDisabled={page === totalPages}
            >
              Next
            </Button>
          </Flex>
        </>
      )}
    </>
  );
}
