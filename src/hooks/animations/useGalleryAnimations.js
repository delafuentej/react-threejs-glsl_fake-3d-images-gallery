// /animations/useGalleryAnimations.js
import { useGSAP } from "@gsap/react";
import { gsap } from "./gsapSetup";

export const useGalleryAnimations = (wrapperRef, showGallery) => {
  useGSAP(() => {
    if (!wrapperRef.current) return;

    if (showGallery) {
      gsap.fromTo(
        wrapperRef.current,
        { y: 80, opacity: 0, display: "none" },
        {
          y: 0,
          opacity: 1,
          display: "block",
          duration: 0.7,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(wrapperRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
        onComplete: () => {
          if (wrapperRef.current) wrapperRef.current.style.display = "none";
        },
      });
    }
  }, [showGallery]);
};
