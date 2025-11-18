import { useEffect, useRef } from "react";

export function useMouseLerp() {
  const cursor = useRef({ x: 0, y: 0, lerpX: 0, lerpY: 0 });

  useEffect(() => {
    const move = (e) => {
      cursor.current.x = e.clientX / window.innerWidth - 0.5;
      cursor.current.y = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const updateLerp = () => {
    cursor.current.lerpX += (cursor.current.x - cursor.current.lerpX) * 0.1;
    cursor.current.lerpY += (cursor.current.y - cursor.current.lerpY) * 0.1;
    return cursor.current;
  };

  return { cursor, updateLerp };
}
