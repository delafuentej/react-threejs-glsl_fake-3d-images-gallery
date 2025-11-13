import { useState } from "react";
import BlurryBackground from "./BlurryBackground";

import ProjectPreview from "./ProjectPreview";
import Gallery from "./Gallery";
import { galleryItems } from "../constants";

const AppLayout = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="container relative w-full h-screen overflow-hidden flex">
      {/* Fondo difuminado */}
      <BlurryBackground activeIndex={activeIndex} />

      {/* Columna central (proyecto actual) */}
      <ProjectPreview activeItem={galleryItems[activeIndex]} />

      {/* Columna derecha (galería miniaturas) */}
      <Gallery
        items={galleryItems}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
    </div>
  );
};

export default AppLayout;
