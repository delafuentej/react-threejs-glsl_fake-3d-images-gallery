import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { galleryItems } from "../constants";

const BlurryBackground = ({ activeIndex }) => {
  const [currentImage, setCurrentImage] = useState(galleryItems[activeIndex]);
  const [previousImage, setPreviousImage] = useState(null);
  const currentRef = useRef(null);
  const prevRef = useRef(null);

  // Actualiza imágenes cuando cambia el índice activo
  useEffect(() => {
    const newItem = galleryItems[activeIndex];
    if (!newItem) return;

    setPreviousImage(currentImage);
    setCurrentImage(newItem);
  }, [activeIndex]);

  // Animaciones GSAP
  useEffect(() => {
    if (currentRef.current) {
      gsap.fromTo(
        currentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.inOut" }
      );
    }
    if (prevRef.current) {
      gsap.to(prevRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [currentImage]);

  return (
    <div className="blurry-prev absolute inset-0 overflow-hidden">
      {currentImage && (
        <img
          ref={currentRef}
          src={currentImage.fake3dImg}
          alt={currentImage.title}
          className="absolute top-0 left-0 w-full h-full object-cover scale-[1.1] blur-[60px] brightness-[0.6] opacity-0"
        />
      )}
      {previousImage && (
        <img
          ref={prevRef}
          src={previousImage.fake3dImg}
          alt={previousImage.title}
          className="absolute top-0 left-0 w-full h-full object-cover scale-[1.1] blur-[60px] brightness-[0.6]"
        />
      )}
      <div className="overlay absolute inset-0 backdrop-blur-3xl"></div>
    </div>
  );
};

export default BlurryBackground;
