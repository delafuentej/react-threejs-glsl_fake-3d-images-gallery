import { useThreeScene } from "../hooks/useThreeScene";

export default function ThreeCanvas({
  vertexShader,
  fragmentShader,
  mapImage,
  depthImage,
}) {
  const { canvasRef } = useThreeScene(
    vertexShader,
    fragmentShader,
    mapImage,
    depthImage
  );
  return <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />;
}
