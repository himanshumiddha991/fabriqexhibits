import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Spinner,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

const GetContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDetail = async () => {
    try {
      const res = await api.get(`/api/contact/${id}`);

      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  if (loading) {
    return (
      <Box p={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box p={10}>
        <Text>Contact not found</Text>
      </Box>
    );
  }

  return (
    <Box py={16} bg="gray.50" minH="100vh">
      <Container maxW="2xl">
        <Heading mb={6}>Contact Detail</Heading>

        <VStack
          align="start"
          spacing={4}
          bg="white"
          p={6}
          borderRadius="md"
          shadow="sm"
        >
          <Text>
            <strong>Name:</strong> {data.name}
          </Text>

          <Divider />

          <Text>
            <strong>Email:</strong> {data.email}
          </Text>

          <Divider />

          <Text>
            <strong>Subject:</strong> {data.subject}
          </Text>

          <Divider />

          <Text>
            <strong>Message:</strong>
          </Text>

          <Text whiteSpace="pre-wrap" color="black">
            {data.message}
          </Text>

          <Divider />

          <Text fontSize="md" color="gray.500">
            {new Date(data.created_at).toLocaleString()}
          </Text>
          {data.media && data.media.file_path && (
            <>
              <Divider />

              <Text>
                <strong>Attachment:</strong>
              </Text>

              {data.media.file_type === "image" ? (
                <Box>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${data.media.file_path}`}
                    alt={data.media.file_name}
                    style={{
                      maxWidth: "100%",
                      borderRadius: "8px",
                      marginTop: "8px",
                    }}
                  />
                </Box>
              ) : (
                <a
                  href={`${process.env.REACT_APP_API_URL}/${data.media.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3182ce", marginTop: "8px" }}
                >
                  View File
                </a>
              )}
            </>
          )}
          <Button mt={4} onClick={() => navigate(-1)}>
            Back
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default GetContact;
