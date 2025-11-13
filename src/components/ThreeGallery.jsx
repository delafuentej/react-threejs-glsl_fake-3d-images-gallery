import React, { useState } from "react";
import { useFake3DPlane } from "../hooks/useFake3DPlane";
import { galleryItems } from "../data/galleryItems";

export default function ThreeGallery() {
  const [index, setIndex] = useState(0);
  const { canvasRef, isReady } = useFake3DPlane(
    galleryItems[index].fake3dImg,
    galleryItems[index].depthImg,
    { xDepth: 7, yDepth: 7 }
  );

  return (
    <div style={{ position: "relative" }}>
      {!isReady && <div style={{ position: "absolute", top: 20, left: 20 }}>Loading...</div>}
      <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh", display: "block" }} />
      
      {/* Controles de galería */}
      <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)" }}>
        {galleryItems.map((item, i) => (
          <button key={i} onClick={() => setIndex(i)} style={{ margin: 5 }}>
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}
