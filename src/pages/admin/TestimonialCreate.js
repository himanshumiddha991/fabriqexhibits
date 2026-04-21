import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  VStack,
  Image,
  Textarea,
  Spinner,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

const TestimonialEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [oldImage, setOldImage] = useState(null);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // ⭐ GET SINGLE TESTIMONIAL
  const getDetail = async () => {
    try {
      const res = await api.get(`/api/testimonial/${id}`);

      if (res.data.success) {
        const t = res.data.data;

        setName(t.name);
        setMessage(t.message);
        setRating(t.rating);
        setOldImage(`${process.env.REACT_APP_API_URL}/${t.media?.file_path}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (!name || !message || !rating) {
      return alert("All fields required");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("message", message);
      formData.append("rating", rating);

      if (image) {
        formData.append("image", image);
      }

      const res = await api.put(`/api/testimonial/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast({
          title: "Updated Successfully",
          status: "success",
          duration: 2000,
        });

        navigate("/admin/testimonial");
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Update Failed",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Box p={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box py={16}>
      <Container maxW="lg">
        <Heading mb={6}>Edit Testimonial</Heading>

        <VStack spacing={4}>
          <Input
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            placeholder="Customer Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Select
            placeholder="Select Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Star</option>
            <option value="3">3 Star</option>
            <option value="4">4 Star</option>
            <option value="5">5 Star</option>
          </Select>

          <Input type="file" accept="image/*" onChange={handleFileChange} />

          {/* ⭐ Preview Logic */}
          {preview ? (
            <Image src={preview} borderRadius="md" maxH="250px" />
          ) : (
            oldImage && <Image src={oldImage} borderRadius="md" maxH="250px" />
          )}

          <Button
            colorScheme="blue"
            w="full"
            onClick={handleUpdate}
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Update Testimonial"}
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default TestimonialEdit;
