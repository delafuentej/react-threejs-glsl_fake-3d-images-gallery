import React from "react";
import AppLayout from "./components/AppLayout";
import { usePreloadGallery } from "./hooks/usePreloadGallery";
import { galleryItems } from "./constants";

const App = () => {
  const isPreloaded = usePreloadGallery(galleryItems);

  if (!isPreloaded) {
    return <div className="loading-screen">Cargando galería...</div>;
  }

  return <AppLayout />;
};

export default App;
