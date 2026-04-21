import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import logo1 from "../images/logoipsum-348.png";
import logo2 from "../images/logoipsum-377.png";
import logo3 from "../images/logoipsum-408.png";
import logo4 from "../images/logoipsum-418.png";
import logo5 from "../images/logoipsum-419.png";
import logo6 from "../images/logoipsum-420.png";
const LogoRow = ({ reverse = false }) => {
  const gallery = useSelector((s) => s.gallery.data);
  const country = useMemo(() => {
    return gallery.filter(
      (item) =>
        item?.media?.file_type === "image" && item?.tags === "countries",
    );
  }, [gallery]);
  // distribute images into columns
  const columns = [];

  country.forEach((img, index) => {
    columns.push(`${process.env.REACT_APP_API_URL}/${img?.media?.file_path}`);
  });

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6];
  const scrollingLogos = [...columns, ...columns];
  console.log("country logos", country, columns, scrollingLogos);

  return (
    <Box className="logo-slider">
      <Box className={`logo-track ${reverse ? "reverse" : ""}`}>
        {scrollingLogos.map((logo, index) => (
          <Box key={index} className="scrollContainer">
            <Image src={logo} maxH="50px" objectFit="contain" opacity={0.8} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LogoRow;
