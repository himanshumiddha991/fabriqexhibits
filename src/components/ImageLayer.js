import React from "react";
import "../styles/imageLayer.css";
const ImageLayer = ({
  image,
  alt,
  bottom,
  layerHeight,
  layerWidth,
  imageHeight,
  imageWidth,
  gap,
  instanceCss = {},
  layerCss = {},
}) => {
  return (
    <div
      className="image-large"
      style={{ height: layerHeight, width: layerWidth }}
    >
      <div
        className="image-instance"
        style={{
          width: `calc(${layerWidth} - ${gap}px)`,
          ...instanceCss,
        }}
      ></div>
      <img
        className="layer"
        src={image}
        alt={alt}
        style={{
          height: imageHeight,
          width: imageWidth,
          ...(bottom
            ? {
                bottom: 0,
                top: "auto",
                transform: "translate(-50%, 0%)",
              }
            : {
                top: "50%",
                bottom: "auto",
                transform: "translate(-50%, -50%)",
              }),
          ...layerCss,
        }}
      />
    </div>
  );
};

export default ImageLayer;
