// /animations/useAppAnimations.js
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useAppAnimations = (canvasRef, isReady, activeIndex) => {
  useGSAP(() => {
    if (!canvasRef.current || !isReady) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blurry-img",
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.out" }
      );

      gsap.fromTo(
        "h1",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        canvasRef.current,
        {
          scaleX: 0,
          scaleY: 0,
          y: 80,
          opacity: 0,
        },
        {
          scaleX: 1,
          scaleY: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert();
  }, [activeIndex, isReady]);
};
