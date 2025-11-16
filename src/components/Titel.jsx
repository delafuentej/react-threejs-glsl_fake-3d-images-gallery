import { useEffect, useRef } from "react";
import gsap from "gsap";

import { SplitText } from "gsap/SplitText";
import { colorPalette } from "../constants";

gsap.registerPlugin(SplitText);

const Titel = ({ item }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Separar título en palabras y letras
    const split = new SplitText(titleRef.current, { type: "words, chars" });

    // Animación de entrada
    gsap.from(split.chars, {
      duration: 1.2,
      y: 50,
      opacity: 0,
      rotationX: -90,
      stagger: { each: 0.1, from: "start" },
      ease: "back.out(1.7)",
      onStart: () => {
        const palette = colorPalette[item.type] || colorPalette.human;
        split.chars.forEach((char) => {
          char.style.color =
            palette[Math.floor(Math.random() * palette.length)];
        });
      },
    });

    // Animación loop de colores
    split.chars.forEach((char) => {
      gsap.to(char, {
        color: () => {
          const palette = colorPalette[item.type] || colorPalette.human;
          return palette[Math.floor(Math.random() * palette.length)];
        },
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });
    });

    // Cleanup al desmontar
    return () => split.revert();
  }, [item.title, item.type]);

  return (
    <>
      <div className="title">
        {/* Usamos key para forzar que React remonte el h1 */}
        <h1 key={item.title} ref={titleRef}>
          {item.title}
        </h1>
      </div>
    </>
  );
};

export default Titel;
