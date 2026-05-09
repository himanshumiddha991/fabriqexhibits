import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Box,
  VStack,
  Text,
} from "@chakra-ui/react";

const MediaModal = ({ isOpen, onClose, media, ShowTitle = true }) => {
  if (!media) return null;
  console.log("media in modal", media);
  const url = `${process.env.REACT_APP_API_URL}/${media.url}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" w="80vw" isCentered>
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent w="80vw" maxH="90vh" overflow="hidden">
        <ModalBody p={0} overflow="auto">
          {media.type === "image" ? (
            <Image src={media.url} />
          ) : (
            <video src={media.url} controls autoPlay />
          )}
          {ShowTitle && (media?.title || media?.description || media?.alt) && (
            <Box position="absolute" bottom="0" w="100%" h="200px">
              <Box
                bgGradient="linear(to-t, rgba(0,0,0,0.9), rgba(0,0,0,0))"
                height="100%"
                width="100%"
                position="absolute"
              />

              <Box
                position="absolute"
                bottom="0"
                left="0"
                m="10px"
                color="white"
              >
                <VStack align="start" spacing={1}>
                  {media?.title && <Text>{media.title}</Text>}

                  {media?.description && <Text>{media.description}</Text>}

                  {media?.alt && <Text>{media.alt}</Text>}
                </VStack>
              </Box>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MediaModal;
