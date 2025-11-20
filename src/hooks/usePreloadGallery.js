// hooks/usePreloadGallery.js
import { useEffect, useState } from "react";
import { preloadTextures } from "../utils/textureCache";

export function usePreloadGallery(galleryItems) {
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    if (!galleryItems || galleryItems.length === 0) return;

    const urls = galleryItems.flatMap((item) => [
      item.fake3dImg,
      item.depthImg,
    ]);

    preloadTextures(urls)
      .then(() => setIsPreloaded(true))
      .catch(console.error);
  }, [galleryItems]);

  return isPreloaded;
}
