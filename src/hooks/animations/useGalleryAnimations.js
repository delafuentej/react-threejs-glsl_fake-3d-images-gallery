// /animations/useGalleryAnimations.js
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useGalleryAnimations = (wrapperRef, showGallery) => {
  useGSAP(() => {
    if (!wrapperRef.current) return;

    if (showGallery) {
      gsap.fromTo(
        wrapperRef.current,
        { y: 80, opacity: 0, display: "none" },
        { y: 0, opacity: 1, display: "block", duration: 0.7 }
      );
    } else {
      gsap.to(wrapperRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          if (wrapperRef.current) wrapperRef.current.style.display = "none";
        },
      });
    }
  }, [showGallery]);
};
