import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useResponsivePlane(
  sceneRef,
  cameraRef,
  textures,
  params,
  shaders
) {
  const planeRef = useRef(null);

  useEffect(() => {
    if (!textures) return;

    const { map, depth } = textures;
    const { vertexShader, fragmentShader } = shaders;

    const aspectTex = map.image.width / map.image.height;
    const aspectView = window.innerWidth / window.innerHeight;

    let width, height;

    if (aspectView > aspectTex) {
      width = cameraRef.current.position.z * aspectView;
      height = width / aspectTex;
    } else {
      height = cameraRef.current.position.z;
      width = height * aspectTex;
    }

    const geometry = new THREE.PlaneGeometry(width, height);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        originalTexture: { value: map },
        depthTexture: { value: depth },
        uMouse: { value: new THREE.Vector2() },
        uDepth: { value: new THREE.Vector2(params.xDepth, params.yDepth) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const plane = new THREE.Mesh(geometry, material);
    planeRef.current = plane;
    sceneRef.current.add(plane);

    return () => {
      geometry.dispose();
      material.dispose();
      sceneRef.current.remove(plane);
    };
  }, [textures, params.xDepth, params.yDepth, cameraRef, sceneRef, shaders]);

  return planeRef;
}
