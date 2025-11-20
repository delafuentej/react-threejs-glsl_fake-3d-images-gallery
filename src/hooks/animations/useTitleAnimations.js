// /animations/useTitleAnimations.js

import { gsap, SplitText } from "./gsapSetup";
import { useGSAP } from "@gsap/react";

import { colorPalette } from "../../constants";

export const useTitleAnimations = (titleRef, item) => {
  useGSAP(async () => {
    if (!titleRef.current) return;

    await document.fonts.ready;

    const split = new SplitText(titleRef.current, { type: "chars" });

    const palette = colorPalette[item.type] || colorPalette.human;

    gsap.from(split.chars, {
      duration: 1.2,
      y: 50,
      opacity: 0,
      rotationX: -90,
      stagger: { each: 0.1, from: "start" },
      ease: "back.out(1.7)",
      onStart: () => {
        split.chars.forEach((char) => {
          char.style.color =
            palette[Math.floor(Math.random() * palette.length)];
        });
      },
    });

    split.chars.forEach((char) => {
      gsap.to(char, {
        color: () => palette[Math.floor(Math.random() * palette.length)],
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });
    });

    return () => split.revert();
  }, [item]);
};
