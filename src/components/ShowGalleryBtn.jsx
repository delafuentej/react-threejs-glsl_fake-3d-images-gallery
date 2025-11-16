import React from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const ShowGalleryBtn = ({ showGallery, setShowGallery }) => {
  return (
    <div className="show-gallery">
      <button
        onClick={() => setShowGallery((prev) => !prev)}
        className="show-gallery-btn"
      >
        {showGallery ? (
          <IoEye className="icon gallery-on" />
        ) : (
          <IoEyeOff className="icon gallery-off" />
        )}
      </button>
    </div>
  );
};

export default ShowGalleryBtn;
