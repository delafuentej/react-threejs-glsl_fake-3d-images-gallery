import { useRef } from "react";
import { useTitleAnimations } from "../hooks/animations";

const Titel = ({ item }) => {
  const titleRef = useRef(null);

  useTitleAnimations(titleRef, item);
  return (
    <>
      <div className="title">
        {/* Usamos key para forzar que React remonte el h1 */}
        <h1 key={item.title} ref={titleRef}>
          {item.title}
        </h1>
      </div>
    </>
  );
};

export default Titel;
