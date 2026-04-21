import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import Banner from "../components/Banner";
import api from "../utils/api";

const BlogDetail = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBlogDetail = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/api/blog/${slug}`);

      if (res.data.success) {
        setBlog(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching blog detail", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      getBlogDetail();
    }
  }, [slug]);

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box textAlign="center" py={20}>
        <Text>Blog not found</Text>
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.meta_title}</title>

        <meta name="description" content={blog.meta_description} />
      </Helmet>
      <Banner heading={blog.title} headingStyle={{ fontSize: "23px" }} />

      <Box py={16}>
        <Container maxW="5xl">
          {/* Image */}
          <Image
            src={`${process.env.REACT_APP_API_URL}/${blog.media?.file_path}`}
            alt={blog.title}
            w="100%"
            borderRadius="lg"
            mb={6}
          />

          {/* Title */}
          <Heading mb={4}>{blog.title}</Heading>

          {/* Date */}
          <Text color="gray.500" mb={6}>
            {new Date(blog.created_at).toDateString()}
          </Text>

          {/* Description */}
          <Box
            className="blog-description"
            dangerouslySetInnerHTML={{
              __html: blog.description,
            }}
          />
        </Container>
      </Box>
    </>
  );
};

export default BlogDetail;
