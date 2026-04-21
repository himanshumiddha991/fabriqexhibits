import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fontSizes: {
    sm: "12px",
    md: "14px", // 👈 override md
    lg: "16px",
    xl: "20px",
  },
  colors: {
    brand: {
      primary: "var(--brand-primary)",
      hover: "var(--brand-primary-hover)",
      secondary: "var(--brand-secondary)",
    },
    bg: {
      dark: "var(--bg-dark)",
      light: "var(--bg-light)",
    },
    text: {
      dark: "var(--text-dark)",
      light: "var(--text-light)",
    },
  },

  components: {
    Button: {
      variants: {
        primary: {
          bg: "var(--color-primary)",
          fontSize: "14px",
          color: "white",
          _hover: {
            bg: "brand.hover",
            borderColor: "white",
            border: "1px solid white",
          },
        },
        nav: {
          fontSize: "15px",
          padding: "0 var(--chakra-space-2)",
          color: "var(--color-text-faded) !important",
          _hover: {
            color: "var(--color-text-light)",
            background: "transparent",
          },
        },
        outline: {
          _hover: {
            color: "black",
          },
        },
        outlineDark: {
          border: "1px solid",
          borderColor: "var(--color-primary-dark)",
          color: "var(--color-primary-dark)",
        },
        outlineBrand: {
          border: "1px solid",
          borderColor: "var(--color-primary)",
          color: "brand.primary",
          _hover: {
            bg: "brand.primary",
            color: "white",
          },
        },
      },
    },
  },
});

export default theme;
