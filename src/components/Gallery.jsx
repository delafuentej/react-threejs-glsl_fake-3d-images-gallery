import { useState } from "react";
import { galleryItems } from "../constants";
import ProjectPreview from "./ProjectPreview";
import BlurryBackground from "./BlurryBackground";

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  return (
    <div className="gallery-container relative w-full h-screen overflow-hidden">
      <BlurryBackground activeIndex={activeIndex} />

      <div className="content absolute inset-0 flex flex-col justify-center items-center text-white z-10">
        <ProjectPreview item={galleryItems[activeIndex]} />

        <div className="controls mt-6 flex gap-4">
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
