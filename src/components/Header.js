import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Stack,
  Image,
  useDisclosure,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logos/logo.svg";

function Header() {
  const [openMobileMenu, setOpenMobileMenu] = React.useState(null);
  // Mobile menu control
  const { isOpen: isMobileOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();

  // ✅ Single menu array
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    {
      label: "Business Lines",
      children: [
        {
          label: "Custom Stall Design & Stall Fabrication",
          path: "/services/exhibitions",
        },
        {
          label: "Retail/Office Interiors",
          path: "/services/retail-office-interiors",
        },
        { label: "Graphic Designing", path: "/services/graphics-design" },
      ],
    },
    { label: "Our Portfolio", path: "/portfolio" },
    { label: "Career", path: "/career" },
    { label: "Blogs", path: "/blogs" },
    { label: "Clients", path: "/clients" },
  ];

  return (
    <Box
      bg="var(--color-primary-dark)"
      position="fixed"
      top="0"
      zIndex="1000"
      width="100%"
      py={6}
    >
      <Container maxW="8xl">
        {/* Top Bar */}
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Link to="/">
            <Image src={logo} alt="brand logo" h="70px" />
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <HStack spacing={5} display={{ base: "none", md: "flex" }}>
            {menuItems.map((item, i) => {
              // Dropdown menu
              if (item.children) {
                return (
                  <Menu key={i}>
                    {({ isOpen }) => (
                      <>
                        <MenuButton
                          p={0}
                          mr="-12px"
                          as={Button}
                          bg="transparent"
                          _hover={{ bg: "transparent" }}
                          _active={{ bg: "transparent" }}
                          _focus={{ boxShadow: "none" }}
                          sx={{
                            color: location.pathname.includes("/services")
                              ? "#fff"
                              : "var(--color-text-faded)",
                          }}
                          rightIcon={
                            <ChevronDownIcon
                              style={{
                                transform: isOpen
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "0.2s",
                              }}
                            />
                          }
                        >
                          {item.label}
                        </MenuButton>

                        <MenuList
                          bg="var(--color-primary-dark)"
                          borderColor="var(--color-primary)"
                        >
                          {item.children.map((sub, idx) => (
                            <MenuItem
                              key={idx}
                              as={Link}
                              to={sub.path}
                              bg="var(--color-primary-dark)"
                              _hover={{
                                bg: "var(--color-primary-dark)",
                                color: "white",
                              }}
                              color="var(--color-text-faded)"
                              fontSize="13px"
                            >
                              {sub.label}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </>
                    )}
                  </Menu>
                );
              }

              // Normal link
              return (
                <Button
                  key={i}
                  as={Link}
                  to={item.path}
                  variant="nav"
                  sx={{
                    color:
                      location.pathname === item.path
                        ? "#fff"
                        : "var(--color-text-faded)",
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </HStack>

          {/* Contact Button */}
          <Button
            as={Link}
            to="/contact-us"
            variant="outlineBrand"
            fontSize="14px"
            display={{ base: "none", md: "inline-flex" }}
            sx={{
              color:
                location.pathname === "/contact-us"
                  ? "#fff"
                  : "var(--color-text-faded)",
            }}
          >
            Contact Us
          </Button>

          {/* ================= MOBILE TOGGLE ================= */}
          <IconButton
            size="md"
            icon={isMobileOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Toggle Menu"
            display={{ md: "none" }}
            onClick={isMobileOpen ? onClose : onOpen}
            bg="transparent"
            color="white"
            fontSize="25px"
            _hover={{ bg: "transparent" }}
          />
        </Flex>

        {/* ================= MOBILE MENU ================= */}
        {isMobileOpen && (
          <Box pb={4} pt={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {menuItems.map((item, i) => {
                // 🔽 Dropdown item (Services)
                if (item.children) {
                  const isOpen = openMobileMenu === i;

                  return (
                    <Box key={i}>
                      <Button
                        variant="ghost"
                        color="white"
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        onClick={() => setOpenMobileMenu(isOpen ? null : i)}
                        _hover={{ bg: "transparent" }}
                        _active={{ bg: "transparent" }}
                      >
                        {item.label}

                        <ChevronDownIcon
                          style={{
                            transform: isOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "0.2s",
                          }}
                        />
                      </Button>

                      {/* Submenu */}
                      {isOpen && (
                        <Stack pl={4} mt={2}>
                          {item.children.map((sub, idx) => (
                            <Button
                              key={idx}
                              as={Link}
                              to={sub.path}
                              variant="ghost"
                              color="white"
                              justifyContent="flex-start"
                              onClick={() => {
                                setOpenMobileMenu(null);
                                onClose();
                              }}
                            >
                              {sub.label}
                            </Button>
                          ))}
                        </Stack>
                      )}
                    </Box>
                  );
                }

                // 🔗 Normal item
                return (
                  <Button
                    key={i}
                    as={Link}
                    to={item.path}
                    variant="ghost"
                    color="white"
                    justifyContent="flex-start"
                    onClick={onClose}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Header;
