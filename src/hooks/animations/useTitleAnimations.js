// /animations/useTitleAnimations.js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { colorPalette } from "../../constants";
gsap.registerPlugin(SplitText);

export const useTitleAnimations = (titleRef, item) => {
  useGSAP(() => {
    if (!titleRef.current) return;
    const split = new SplitText(titleRef.current, { type: "chars" });

    const palette = colorPalette[item.type] || colorPalette.human;

    gsap.from(split.chars, {
      y: 50,
      opacity: 0,
      rotationX: -90,
      duration: 1.2,
      stagger: 0.1,
      ease: "back.out(1.7)",
      onStart: () => {
        split.chars.forEach((c) => {
          c.style.color = palette[Math.floor(Math.random() * palette.length)];
        });
      },
    });

    split.chars.forEach((c) => {
      gsap.to(c, {
        color: () => palette[Math.floor(Math.random() * palette.length)],
        repeat: -1,
        yoyo: true,
        duration: 2,
      });
    });

    return () => split.revert();
  }, [item]);
};
