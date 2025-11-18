import { useRef, useState, useEffect } from "react";
import materialVertexShader from "../shaders/material/vertex.glsl";
import materialFragmentShader from "../shaders/material/fragment.glsl";

import { useThreeRenderer } from "./useThreeRenderer";
import { useMouseLerp } from "./useMouseLerp";
import { useLoadTextures } from "./useLoadTextures";
import { useResponsivePlane } from "./useResponsivePlane";
import { useRenderLoop } from "./useRenderLoop";

export function useFake3DPlane(
  mapImage,
  depthImage,
  params = { xDepth: 7, yDepth: 7 }
) {
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const { rendererRef, sceneRef, cameraRef } = useThreeRenderer(canvasRef);
  const { updateLerp } = useMouseLerp();
  const textures = useLoadTextures(mapImage, depthImage);

  const planeRef = useResponsivePlane(sceneRef, cameraRef, textures, params, {
    vertexShader: materialVertexShader,
    fragmentShader: materialFragmentShader,
  });

  // render loop actualizando uniform
  useRenderLoop(rendererRef, sceneRef, cameraRef, () => {
    if (!planeRef.current) return;

    const c = updateLerp();
    planeRef.current.material.uniforms.uMouse.value.set(c.lerpX, c.lerpY);
  });

  // listo cuando hay texturas y plane creado
  useEffect(() => {
    if (textures && planeRef.current) setIsReady(true);
  }, [textures, planeRef]);

  return { canvasRef, isReady };
}
