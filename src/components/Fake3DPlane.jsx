export default function Fake3DPlane({ previewRef, canvasRef }) {
  return (
    <div className="project-preview" ref={previewRef}>
      <div className="canvas-wrapper">
        {<div>Loading...</div>}
        <canvas className="canvas" ref={canvasRef} />
      </div>
    </div>
  );
}
