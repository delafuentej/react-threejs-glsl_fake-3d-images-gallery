import { useEffect } from "react";

export function useRenderLoop(rendererRef, sceneRef, cameraRef, update) {
  useEffect(() => {
    let mounted = true;

    const animate = () => {
      if (!mounted) return;

      update?.();
      rendererRef.current?.render(sceneRef.current, cameraRef.current);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      mounted = false;
    };
  }, [cameraRef, rendererRef, sceneRef, update]);
}
