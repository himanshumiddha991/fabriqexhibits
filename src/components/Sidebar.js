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
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SidebarProp = ({ onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose && onClose(); // ✅ close drawer after logout
  };

  return (
    <VStack align="start" p={5} spacing={5}>
      <Text fontSize="lg" fontWeight="bold">
        Dashboard
      </Text>

      <Text as={Link} to="/admin/blogs" onClick={onClose}>
        Blogs
      </Text>
      <Text as={Link} to="/admin/testimonial" onClick={onClose}>
        Testimonial
      </Text>
      <Text as={Link} to="/admin/gallary" onClick={onClose}>
        Gallary
      </Text>
      <Text as={Link} to="/admin/contact" onClick={onClose}>
        Contacts
      </Text>

      <Button colorScheme="red" w="100%" onClick={handleLogout}>
        Logout
      </Button>
    </VStack>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
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
          <SidebarProp onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
