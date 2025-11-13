import { galleryItems } from "./constants";

import React, { useEffect, useRef, useState } from "react";
// Mock data - reemplaza esto con tu archivo constant where texture breathes and stillness speaks."otherworldly calm."a whirlwind of carved clouds."

function App() {
  const galleryRef = useRef(null);
  const blurryPrevRef = useRef(null);
  const projectPreviewRef = useRef(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const isAnimatingRef = useRef(false);

  // Simple split text function without library
  const createSplitText = (element) => {
    if (!element) return;
    const text = element.textContent;
    const words = text.split(" ");
    element.innerHTML = "";

    words.forEach((word, index) => {
      const lineDiv = document.createElement("div");
      lineDiv.className = "line";
      lineDiv.style.overflow = "hidden";
      lineDiv.style.display = "inline-block";

      const lineSpan = document.createElement("span");
      lineSpan.textContent = word + (index < words.length - 1 ? " " : "");
      lineSpan.style.display = "inline-block";
      lineSpan.style.transition =
        "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";

      lineDiv.appendChild(lineSpan);
      element.appendChild(lineDiv);
    });
  };

  useEffect(() => {
    const initialInfoText = document.querySelector(".info p");
    if (initialInfoText) {
      createSplitText(initialInfoText);
    }
  }, []);

  const animateOut = (elements, onComplete) => {
    let completed = 0;
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.transform = "translateY(-60px)";
        el.style.opacity = "0";
        completed++;
        if (completed === elements.length && onComplete) {
          setTimeout(onComplete, 800);
        }
      }, index * 50);
    });
  };

  const animateIn = (elements) => {
    elements.forEach((el, index) => {
      el.style.transform = "translateY(40px)";
      el.style.opacity = "0";
      setTimeout(() => {
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";
      }, index * 50 + 100);
    });
  };

  const handleItemClick = (index) => {
    if (index === activeItemIndex || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const activeItem = galleryItems[index];

    setActiveItemIndex(index);

    const elementsToAnimate = document.querySelectorAll(
      ".title h1, .info p .line span"
    );

    const currentProjectImg = document.querySelector(".project-img");
    const currentProjectImgElem = currentProjectImg?.querySelector("img");

    // Blurry background animation
    const newBlurryImg = document.createElement("img");
    newBlurryImg.src = activeItem.fake3dImg;
    newBlurryImg.alt = activeItem.title;
    newBlurryImg.style.cssText = `
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 1s ease-in-out 0.5s;
    `;
    blurryPrevRef.current.insertBefore(
      newBlurryImg,
      blurryPrevRef.current.firstChild
    );

    setTimeout(() => {
      newBlurryImg.style.opacity = "1";
    }, 50);

    const currentBlurryImg =
      blurryPrevRef.current.querySelector("img:nth-child(2)");
    if (currentBlurryImg) {
      setTimeout(() => {
        currentBlurryImg.style.opacity = "0";
        setTimeout(
          () => blurryPrevRef.current.removeChild(currentBlurryImg),
          1000
        );
      }, 500);
    }

    // Animate out current elements
    animateOut(elementsToAnimate, () => {
      document.querySelector(".project-details")?.remove();
      currentProjectImg?.remove();

      // Create new project details
      const newProjectDetails = document.createElement("div");
      newProjectDetails.className = "project-details";

      const detailsHTML = `
        <div class="title"><h1>${activeItem.title}</h1></div>
        <div class="info"><p>${activeItem.description}</p></div>
      `;
      newProjectDetails.innerHTML = detailsHTML;

      const newProjectImg = document.createElement("div");
      newProjectImg.className = "project-img";
      newProjectImg.style.cssText = `
        transform: scale(0);
        bottom: -10em;
        transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
      `;
      newProjectImg.innerHTML = `<img src="${activeItem.fake3dImg}" alt="${activeItem.title}" style="transform: scale(2); transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);" />`;

      projectPreviewRef.current.appendChild(newProjectDetails);
      projectPreviewRef.current.appendChild(newProjectImg);

      const infoP = newProjectDetails.querySelector(".info p");
      createSplitText(infoP);

      const newElementsToAnimate = newProjectDetails.querySelectorAll(
        ".title h1, .info p .line span"
      );

      animateIn(newElementsToAnimate);

      setTimeout(() => {
        newProjectImg.style.transform = "scale(1)";
        newProjectImg.style.bottom = "1em";
        const img = newProjectImg.querySelector("img");
        img.style.transform = "scale(1)";
      }, 100);

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 1500);
    });

    // Animate current image out
    if (currentProjectImg) {
      currentProjectImg.style.transition =
        "all 1s cubic-bezier(0.76, 0, 0.24, 1)";
      currentProjectImg.style.transform = "scale(0)";
      currentProjectImg.style.bottom = "10em";

      if (currentProjectImgElem) {
        currentProjectImgElem.style.transition =
          "transform 1s cubic-bezier(0.76, 0, 0.24, 1)";
        currentProjectImgElem.style.transform = "scale(2)";
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="blurry-prev" ref={blurryPrevRef}>
          <img src={galleryItems[0].fake3dImg} alt="" />
          <div className="overlay"></div>
        </div>

        <div className="col site-info">
          <div className="project-details">
            <div className="title">
              <h1>{galleryItems[0].title}</h1>
            </div>
            <div className="info">
              <p>{galleryItems[0].description}</p>
            </div>
          </div>
        </div>

        {/* project preview */}
        <div className="col project-preview" ref={projectPreviewRef}>
          <div className="project-img">
            <img src={galleryItems[0].fake3dImg} alt={galleryItems[0].title} />
          </div>
        </div>

        <div className="gallery-wrapper">
          <div className="gallery" ref={galleryRef}>
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className={`item ${index === activeItemIndex ? "active" : ""}`}
                data-index={index}
                onClick={() => handleItemClick(index)}
              >
                <img src={item.fake3dImg} alt={item.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
