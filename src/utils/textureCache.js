// utils/textureCache.js
import { TextureLoader } from "three";

const loader = new TextureLoader();
const cache = {};

export function loadTextureCached(url) {
  if (cache[url]) return Promise.resolve(cache[url]);

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (tex) => {
        cache[url] = tex;
        resolve(tex);
      },
      undefined,
      reject
    );
  });
}

export function preloadTextures(urls = []) {
  return Promise.all(urls.map(loadTextureCached)).then(() => undefined);
}

export const textureCache = cache;
