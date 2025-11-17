import React from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import CircularText from "./CircularText";
import { useMediaQuery } from "react-responsive";

const ShowGalleryBtn = ({ showGallery, setShowGallery }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <div className="show-gallery">
      <button
        onClick={() => setShowGallery((prev) => !prev)}
        className="show-gallery-btn"
      >
        <div className="circular-text-wrapper">
          <CircularText
            text="GALLERY⋆"
            radius={isMobile ? 38 : 36}
            color={showGallery ? "#2ecc0d" : "#ff073a"}
            fontSize={isMobile ? 26 : 28}
          />
        </div>
        {showGallery ? (
          <IoEye
            className="icon gallery-on"
            fontSize={isMobile ? "1.4rem" : "2rem"}
          />
        ) : (
          <IoEyeOff
            className="icon gallery-off"
            fontSize={isMobile ? "1.4rem" : "2rem"}
          />
        )}
      </button>
    </div>
  );
};

export default ShowGalleryBtn;
