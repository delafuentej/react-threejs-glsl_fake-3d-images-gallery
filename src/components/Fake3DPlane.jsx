export default function Fake3DPlane({ previewRef, canvasRef, isReady }) {
  return (
    <div className="project-preview" ref={previewRef}>
      <div className="canvas-wrapper">
        {!isReady && <div>Loading...</div>}
        <canvas className="canvas" ref={canvasRef} />
      </div>
    </div>
  );
}
