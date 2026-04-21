import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Spinner,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";

const BlogForm = () => {
  const { slug } = useParams();
  const isEdit = Boolean(slug);

  const editor = useRef(null);

  const [blog, setBlog] = useState({
    title: "",
    slug: "",
    description: "",
    keywords: "",
    meta_title: "",
    meta_description: "",
    image: null,
  });

  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/blog/${slug}`,
        );

        if (res.data.success) {
          setBlog(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching blog", error);
      } finally {
        setLoading(false);
      }
    };
    if (isEdit) {
      getBlog();
    }
  }, [slug, isEdit]);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleChange = (field, value) => {
    if (field === "title") {
      setBlog({
        ...blog,
        title: value,
        slug: generateSlug(value),
      });
    } else {
      setBlog({
        ...blog,
        [field]: value,
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    setBlog({
      ...blog,
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", blog.title);
      formData.append("slug", blog.slug);
      formData.append("description", blog.description);
      formData.append("meta_title", blog.meta_title);
      formData.append("meta_description", blog.meta_description);
      formData.append("keywords", blog.keywords);

      if (blog.image instanceof File) {
        formData.append("image", blog.image);
      }

      let res;

      if (isEdit) {
        res = await api.put(`/api/blog/${blog.id}`, formData);
      } else {
        res = await api.post(`/api/blog`, formData);
      }

      alert(`Blog ${isEdit ? "updated" : "created"} successfully`);
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Unexpected error occurred");
      }

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box maxW="900px" mx="auto" mt={10}>
      <Heading mb={6}>{isEdit ? "Edit Blog" : "Create Blog"}</Heading>

      <VStack spacing={5} align="stretch">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            value={blog.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Slug</FormLabel>
          <Input
            value={blog.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>

          <JoditEditor
            ref={editor}
            value={blog.description || ""}
            onBlur={(content) => handleChange("description", content)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Keywords</FormLabel>
          <Input
            value={blog.keywords || ""}
            onChange={(e) => handleChange("keywords", e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Upload Featured Image</FormLabel>

          <Input type="file" onChange={handleImageUpload} />

          {(blog.preview || blog.media) && (
            <Image
              src={
                blog.preview
                  ? blog.preview
                  : `${process.env.REACT_APP_API_URL}/${blog.media.file_path}`
              }
              mt={3}
              maxH="200px"
              borderRadius="md"
            />
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Meta Title</FormLabel>
          <Input
            value={blog.meta_title || ""}
            onChange={(e) => handleChange("meta_title", e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Meta Description</FormLabel>
          <Input
            value={blog.meta_description || ""}
            onChange={(e) => handleChange("meta_description", e.target.value)}
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit}>
          {isEdit ? "Update Blog" : "Create Blog"}
        </Button>
      </VStack>
    </Box>
  );
};

export default BlogForm;
