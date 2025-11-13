import { useEffect, useRef } from "react";
import materialVertexShader from "../shaders/material/vertex.glsl";
import materialFragmentShader from "../shaders/material/fragment.glsl";

// Lazy load de Three.js
const loadThree = async () => await import("three");

export function useThreeScene(
  vertexShader,
  fragmentShader,
  mapImage,
  depthImage
) {
  const canvasRef = useRef(null);
  const shaderMaterialRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let renderer;
    let resizeListener;
    let mouse = { x: 0, y: 0 };

    const initThree = async () => {
      const THREE = await loadThree();
      const {
        Scene,
        OrthographicCamera,
        WebGLRenderer,
        TextureLoader,
        Vector2,
        ShaderMaterial,
        Mesh,
        PlaneGeometry,
      } = THREE;

      if (!mounted || !canvasRef.current) return;

      // Escena y cámara
      const scene = new Scene();
      const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
      renderer = new WebGLRenderer({ canvas: canvasRef.current, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;

      // ShaderMaterial
      const shaderMaterial = new ShaderMaterial({
        uniforms: {
          originalTexture: { value: null },
          depthTexture: { value: null },
          uMouse: { value: new Vector2(0, 0) },
          uDepth: { value: new Vector2(7, 7) }, // igual que en tu clase Plane
        },
        vertexShader: materialVertexShader,
        fragmentShader: materialFragmentShader,
        transparent: true,
      });
      shaderMaterialRef.current = shaderMaterial;

      // Mesh
      const plane = new Mesh(new PlaneGeometry(2, 2), shaderMaterial);
      scene.add(plane);

      // Cargar texturas
      const loader = new TextureLoader();
      const [original, depth] = await Promise.all(
        [mapImage, depthImage].map(
          (img) =>
            new Promise((resolve) => {
              loader.load(img, (t) => {
                t.generateMipmaps = true;
                resolve(t);
              });
            })
        )
      );

      if (!mounted) return;

      shaderMaterial.uniforms.originalTexture.value = original;
      shaderMaterial.uniforms.depthTexture.value = depth;

      // Mouse
      const mouseMove = (e) => {
        mouse.x = e.clientX / window.innerWidth - 0.5;
        mouse.y = e.clientY / window.innerHeight - 0.5;
        shaderMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);
      };
      window.addEventListener("mousemove", mouseMove);

      // Render loop
      const render = () => {
        if (!mounted) return;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      };
      render();

      // Resize
      resizeListener = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", resizeListener);
    };

    initThree();

    return () => {
      mounted = false;
      if (renderer) renderer.dispose();
      if (resizeListener) window.removeEventListener("resize", resizeListener);
      window.removeEventListener("mousemove", (e) => {}); // cleanup mouse
    };
  }, [vertexShader, fragmentShader, mapImage, depthImage]);

  return { canvasRef, shaderMaterialRef, rendererRef };
}
