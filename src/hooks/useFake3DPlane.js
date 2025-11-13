import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import materialVertexShader from "../shaders/material/vertex.glsl";
import materialFragmentShader from "../shaders/material/fragment.glsl";

export function useFake3DPlane(
  mapImage,
  depthImage,
  params = { xDepth: 7, yDepth: 7 }
) {
  const canvasRef = useRef(null);
  const shaderMaterialRef = useRef(null);
  const rendererRef = useRef(null);
  const planeRef = useRef(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    let cursor = { x: 0, y: 0, lerpX: 0, lerpY: 0 };

    // Cargar texturas
    const loader = new THREE.TextureLoader();
    Promise.all([
      new Promise((resolve) => loader.load(mapImage, (t) => resolve(t))),
      new Promise((resolve) => loader.load(depthImage, (t) => resolve(t))),
    ]).then(([mapTex, depthTex]) => {
      if (!mounted) return;

      // Shader material
      const material = new THREE.ShaderMaterial({
        uniforms: {
          originalTexture: { value: mapTex },
          depthTexture: { value: depthTex },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uDepth: { value: new THREE.Vector2(params.xDepth, params.yDepth) },
        },
        vertexShader: materialVertexShader,
        fragmentShader: materialFragmentShader,
        transparent: true,
      });

      shaderMaterialRef.current = material;

      // Calcular geometría responsiva
      const aspectTexture = mapTex.image.width / mapTex.image.height;
      const aspectViewport = window.innerWidth / window.innerHeight;
      let width, height;
      if (aspectViewport > aspectTexture) {
        width = 5 * aspectViewport;
        height = width / aspectTexture;
      } else {
        height = 5;
        width = height * aspectTexture;
      }

      const geometry = new THREE.PlaneGeometry(width, height, 10, 10);
      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);
      planeRef.current = plane;

      setIsReady(true);

      // Mouse
      const handleMouse = (e) => {
        cursor.x = e.clientX / window.innerWidth - 0.5;
        cursor.y = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("mousemove", handleMouse);

      // Resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      // Render loop + GSAP para suavizar cursor
      const animate = () => {
        if (!mounted) return;

        gsap.to(cursor, {
          duration: 0.3,
          x: cursor.x,
          y: cursor.y,
          onUpdate: () => {
            if (planeRef.current) {
              planeRef.current.material.uniforms.uMouse.value.set(
                cursor.x,
                cursor.y
              );
            }
          },
        });

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      // Cleanup
      return () => {
        mounted = false;
        window.removeEventListener("mousemove", handleMouse);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        material.dispose();
        geometry.dispose();
      };
    });
  }, [mapImage, depthImage, params.xDepth, params.yDepth]);

  return { canvasRef, isReady };
}
