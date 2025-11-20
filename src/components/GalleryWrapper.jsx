import { useRef } from "react";
import { useGalleryAnimations } from "../hooks/animations";

const GalleryWrapper = ({
  galleryItems,
  activeIndex,
  setActiveIndex,
  showGallery,
}) => {
  const wrapperRef = useRef();

  useGalleryAnimations(wrapperRef, showGallery);

  return (
    <div className="gallery-wrapper" ref={wrapperRef}>
      <div className="gallery">
        {galleryItems.map((g, i) => (
          <div
            key={i}
            className={`item ${i === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(i)}
          >
            <img
              src={g.fake3dImg}
              alt={g.title}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryWrapper;
