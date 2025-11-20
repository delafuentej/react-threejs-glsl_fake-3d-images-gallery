export default function BlurryBackground({ blurryRef, imgSrc }) {
  return (
    <div className="blurry-prev" ref={blurryRef}>
      <img
        src={imgSrc}
        className="blurry-img"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="overlay"></div>
    </div>
  );
}
