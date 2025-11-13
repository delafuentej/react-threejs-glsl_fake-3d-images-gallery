import { useRef, useEffect } from "react";
import gsap from "gsap";

export const useGalleryAnimations = (projectPreviewRef, blurryPrevRef) => {
  const isAnimatingRef = useRef(false);

  // Animar salida de elementos
  const animateOut = (elements) => {
    return gsap.to(elements, {
      y: -60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.in",
    });
  };

  // Animar entrada de elementos
  const animateIn = (elements) => {
    return gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out" }
    );
  };

  // Animación inicial al cargar la página
  const animateInitial = () => {
    const initialElements = document.querySelectorAll(
      ".title h1, .info p .line span"
    );
    animateIn(initialElements);
  };

  // Función para manejar click en un item
  const handleItemClick = (
    index,
    activeItemIndex,
    setActiveItemIndex,
    galleryItems,
    createSplitText
  ) => {
    if (index === activeItemIndex || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const activeItem = galleryItems[index];
    setActiveItemIndex(index);

    const elementsToAnimate = document.querySelectorAll(
      ".title h1, .info p .line span"
    );

    const currentProjectImg = document.querySelector(".project-img");
    const currentProjectImgElem = currentProjectImg?.querySelector("img");

    // Imagen borrosa
    const newBlurryImg = document.createElement("img");
    newBlurryImg.src = activeItem.fake3dImg;
    newBlurryImg.alt = activeItem.title;
    newBlurryImg.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
    `;
    blurryPrevRef.current.insertBefore(
      newBlurryImg,
      blurryPrevRef.current.firstChild
    );

    const currentBlurryImg =
      blurryPrevRef.current.querySelector("img:nth-child(2)");

    const tl = gsap.timeline({
      onComplete: () => (isAnimatingRef.current = false),
    });

    // Animar elementos salientes
    tl.add(animateOut(elementsToAnimate));

    // Animar imagen borrosa entrante
    tl.to(
      newBlurryImg,
      { opacity: 1, duration: 1, ease: "power1.out" },
      "-=0.5"
    );

    // Animar imagen borrosa saliente
    if (currentBlurryImg) {
      tl.to(
        currentBlurryImg,
        {
          opacity: 0,
          duration: 1,
          ease: "power1.out",
          onComplete: () => blurryPrevRef.current.removeChild(currentBlurryImg),
        },
        "<"
      );
    }

    // Animar imagen principal saliente
    if (currentProjectImg) {
      tl.to(
        currentProjectImg,
        { scale: 0, y: 100, duration: 1, ease: "power3.inOut" },
        "<"
      );
      if (currentProjectImgElem) {
        tl.to(
          currentProjectImgElem,
          { scale: 2, duration: 1, ease: "power3.inOut" },
          "<"
        );
      }
    }

    // Cambiar contenido del proyecto
    tl.add(() => {
      document.querySelector(".project-details")?.remove();
      currentProjectImg?.remove();

      const newProjectDetails = document.createElement("div");
      newProjectDetails.className = "project-details";
      newProjectDetails.innerHTML = `
        <div class="title"><h1>${activeItem.title}</h1></div>
        <div class="info"><p>${activeItem.description}</p></div>
      `;

      const newProjectImg = document.createElement("div");
      newProjectImg.className = "project-img";
      newProjectImg.style.cssText = "transform: scale(0); position: relative;";
      newProjectImg.innerHTML = `<img src="${activeItem.fake3dImg}" alt="${activeItem.title}" />`;

      projectPreviewRef.current.appendChild(newProjectDetails);
      projectPreviewRef.current.appendChild(newProjectImg);

      const infoP = newProjectDetails.querySelector(".info p");
      createSplitText(infoP);
    });

    // Animar entrada de texto
    tl.add(() => {
      const newElementsToAnimate = document.querySelectorAll(
        ".project-details .title h1, .project-details .info p .line span"
      );
      animateIn(newElementsToAnimate);
    }, "-=0.5");

    // Animar entrada de imagen principal
    tl.fromTo(
      ".project-img",
      { scale: 0, y: 100 },
      { scale: 1, y: 0, duration: 1, ease: "power3.out" },
      "<"
    );
  };

  // Ejecutar animación inicial en mount
  useEffect(() => {
    animateInitial();
  }, []);

  return { handleItemClick };
};
