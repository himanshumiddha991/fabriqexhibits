import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  VStack,
  Image,
  Spinner,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";

import { galleryCategories } from "../../utils/galleryCategories";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useLocation } from "react-router-dom";
const GallaryCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const tag = location.state?.tag;
  console.log("tag", tag);

  const [file, setFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alt, setAlt] = useState("");
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    if (id) {
      fetchGalleryDetail();
    }
  }, [id]);

  const fetchGalleryDetail = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/api/gallary/${id}`);
      const data = res.data.data;
      console.log("gallery detail", data);
      setTags(data.tags || "");
      setAlt(data.media?.alt || "");
      setTitle(data.media?.title || "");
      setDescription(data.media?.description || "");
      const isVideoFile = data.media?.file_type === "video";
      setIsVideo(isVideoFile);

      const mediaPath = isVideoFile
        ? data.media?.thumbnail_path
        : data.media?.file_path;

      setPreview(`${process.env.REACT_APP_API_URL}/${mediaPath}`);
    } catch (err) {
      console.log(err);
      alert("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      setPreview(URL.createObjectURL(selected));
      setIsVideo(selected.type.startsWith("video"));
    }
  };

  const handleThumbnailChange = (e) => {
    const selected = e.target.files[0];
    setThumbnailFile(selected);

    if (selected) {
      setPreview(URL.createObjectURL(selected)); // preview thumbnail
    }
  };

  const generateVideoThumbnail = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;

      video.onloadeddata = () => {
        video.currentTime = 1;
      };

      video.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.8);
      };

      video.onerror = reject;
    });
  };

  const handleSubmit = async () => {
    if (!id && !file) return alert("Select file");

    try {
      setLoading(true);

      const formData = new FormData();

      if (file) formData.append("file", file);

      formData.append("tags", tags);
      formData.append("alt", alt);
      formData.append("title", title);
      formData.append("description", description);
      // 🔥 Thumbnail Logic
      if (file && file.type.startsWith("video")) {
        if (thumbnailFile) {
          // custom thumbnail
          formData.append("thumbnail", thumbnailFile);
        } else {
          // auto thumbnail
          const thumbnailBlob = await generateVideoThumbnail(file);

          const thumbnailGeneratedFile = new File(
            [thumbnailBlob],
            "thumbnail.jpg",
            { type: "image/jpeg" },
          );

          formData.append("thumbnail", thumbnailGeneratedFile);
        }
      }

      // edit mode: only thumbnail changed
      if (id && !file && thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }
      let resp;
      if (id) {
        resp = await api.put(`/api/gallary/${id}`, formData);
        toast({
          title: "Gallery Updated Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.href = `/admin/gallary/${id}`;
        }, 2000);
        // window.location.href = `/admin/gallary/${id}`;
      } else {
        resp = await api.post("/api/gallary", formData);
        toast({
          title: "Gallery Uploaded Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.href = "/admin/gallary/create";
        }, 2000);
      }
      // console.log("response", resp);
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box py={16}>
      <Container maxW="lg">
        <Heading mb={6}>
          {id ? "Edit Gallery Media" : "Upload Gallery Media"}
        </Heading>

        <VStack spacing={4}>
          {/* Main File Upload */}
          <Input type="file" onChange={handleFileChange} />

          {/* Thumbnail Upload (ONLY for video edit or video selected) */}
          {(isVideo || file?.type?.startsWith("video")) && (
            <>
              <Text fontSize="md" fontWeight="bold">
                Upload Custom Thumbnail (Optional)
              </Text>
              <Input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
            </>
          )}

          {/* Tags */}
          <Select
            placeholder="Select Tag"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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

          {/* Title */}
          <Input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* Title */}
          <Input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* Alt */}
          <Input
            type="text"
            placeholder="Enter Alt Text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />

          {/* Preview */}
          {preview && (
            <>
              <Image src={preview} borderRadius="md" />
            </>
          )}

          {/* Submit */}
          <Button
            colorScheme="red"
            w="full"
            onClick={handleSubmit}
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" /> : id ? "Update" : "Upload"}
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default GallaryCreate;
