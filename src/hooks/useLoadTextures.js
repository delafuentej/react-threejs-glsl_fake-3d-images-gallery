import { useEffect, useState } from "react";
import { loadTextureCached } from "../utils/textureCache";

export function useLoadTextures(mapImage, depthImage) {
  const [textures, setTextures] = useState(null);

  useEffect(() => {
    if (!mapImage || !depthImage) return;

    Promise.all([loadTextureCached(mapImage), loadTextureCached(depthImage)])
      .then(([map, depth]) => setTextures({ map, depth }))
      .catch(console.error);
  }, [mapImage, depthImage]);

  return textures;
}
