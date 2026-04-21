import React from "react";
import {
  Box,
  Text,
  VStack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const SidebarProp = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      w="250px"
      bg="gray.800"
      color="white"
      display={{ base: "none", md: "block" }}
    >
      <VStack align="start" p={5} spacing={5}>
        <Text fontSize="lg" fontWeight="bold">
          Dashboard
        </Text>
        <Text as={Link} to="/admin/blogs">
          Blogs
        </Text>
        <Text as={Link} to="/admin/testimonial">
          Testimonial
        </Text>
        <Text as={Link} to="/admin/gallary">
          Gallary
        </Text>
        <Text as={Link} to="/admin/contact">
          Contacts
        </Text>
        {/* Logout Button */}
        <Button colorScheme="red" w="100%" onClick={handleLogout}>
          Logout
        </Button>
      </VStack>
    </Box>
  );
};
const Sidebar = () => {
  const { isOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        w="250px"
        bg="gray.800"
        color="white"
        display={{ base: "none", md: "block" }}
      >
        <SidebarProp />
      </Box>
      {/* Mobile Drawer Sidebar */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800" color="white">
          <DrawerCloseButton />
          <SidebarProp />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
