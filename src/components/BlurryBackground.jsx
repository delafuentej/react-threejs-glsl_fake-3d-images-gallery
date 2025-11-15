export default function BlurryBackground({ blurryRef, imgSrc }) {
  return (
    <div className="blurry-prev" ref={blurryRef}>
      <img src={imgSrc} className="blurry-img" alt="" />
      <div className="overlay"></div>
    </div>
  );
}
