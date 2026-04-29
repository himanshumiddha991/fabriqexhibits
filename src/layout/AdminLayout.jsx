import { Outlet, Navigate } from "react-router-dom";
import { Box, IconButton, Text, useDisclosure, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { HamburgerIcon } from "@chakra-ui/icons";
const AdminLayout = () => {
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Flex minH="100vh">
        {/* Optional Admin Header */}
        <Sidebar isOpen={isOpen} onClose={onClose} />
        <Flex minH="100vh" width={"100%"}>
          {/* Main Content */}
          <Box flex="1">
            {/* Topbar */}
            <Flex
              p={4}
              bg="white"
              borderBottom="1px"
              borderColor="gray.200"
              align="center"
            >
              <IconButton
                icon={<HamburgerIcon />}
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                mr={3}
              />

              <Text fontSize="xl" fontWeight="bold">
                Admin Panel
              </Text>
            </Flex>

            {/* Page Content */}
            <Box p={5}>
              <Outlet />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AdminLayout;
