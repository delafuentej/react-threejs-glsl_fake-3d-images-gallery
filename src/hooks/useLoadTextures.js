import { useEffect, useState } from "react";
import { TextureLoader } from "three";

export function useLoadTextures(mapImage, depthImage) {
  const [textures, setTextures] = useState(null);

  useEffect(() => {
    if (!mapImage || !depthImage) return;

    const loader = new TextureLoader();

    const load = (url) =>
      new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });

    Promise.all([load(mapImage), load(depthImage)])
      .then(([map, depth]) => setTextures({ map, depth }))
      .catch(console.error);
  }, [mapImage, depthImage]);

  return textures;
}
