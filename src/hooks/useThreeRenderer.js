import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useThreeRenderer(canvasRef) {
  const rendererRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(
    new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const camera = cameraRef.current;
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return { rendererRef, sceneRef, cameraRef };
}
