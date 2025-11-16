//depth images: https://app.artificialstudio.ai/tools/image-depth-map-generator

export const colorPalette = {
  human: [
    // rostros humanos / mujeres / aspecto artístico
    "#F5F5F5", // Mármol más cálido / piel clara
    "#FFD633", // Oro más suave y brillante
    "#C86B40", // Cobre cálido y elegante
    "#FF5C2E", // Llama viva con un toque más rosado
    "#FF9987", // Coral pastel más vibrante y armonioso
  ],
  fantasy: [
    // dragones / criaturas míticas
    "#FF4500", // rojo fuego
    "#FFD700", // dorado
    "#1E90FF", // azul intenso
    "#32CD32", // verde vibrante
    "#9400D3", // púrpura intenso
  ],
  majestic: [
    // animales majestuosos
    "#DAA520", // dorado cálido
    "#8B4513", // marrón tierra
    "#C19A6B", // arena / beige
    "#FF8C00", // naranja intenso
    "#A0522D", // marrón rojizo
  ],
  playful: [
    // animales lúdicos / coloridos / manualidades
    "#00FF9F", // Esmeralda neón brillante
    "#00F0FF", // Cyan neón intenso
    "#005BFF", // Azul mar brillante
    "#9A00FF", // Violeta neón
    "#C600FF", // Morado intenso
  ],
  robot: [
    // robots / mecánicos
    "#C0C0C0", // plata metálica
    "#808080", // gris
    "#A9A9A9", // gris oscuro
    "#00CED1", // cian tecnológico
    "#4682B4", // azul acero
  ],
  cosmic: [
    // alienígenas / bebés espaciales
    "#FF00FF", // magenta neón
    "#00FFFF", // cyan neón
    "#FF8C00", // naranja espacial
    "#7B68EE", // lila cósmico
    "#7FFF00", // verde brillante
  ],
};

export const galleryItems = [
  // Mujeres expresivas / humanas
  {
    title: "Ethereal Awakening",
    type: "human",
    depthImg: "/images/depth/woman_depth.webp",
    fake3dImg: "/images/fake3d/woman_fake3d.webp",
  },
  {
    title: "Ethereal Glow",
    type: "human",
    fake3dImg: "/images/fake3d/woman2_fake3d.webp",
    depthImg: "/images/depth/woman2_depth.webp",
  },
  {
    title: "Inferno Woman",
    type: "human",
    fake3dImg: "/images/fake3d/human_fake3d.webp",
    depthImg: "/images/depth/human_depth.webp",
  },
  {
    title: "Sweet Slumber",
    type: "human",
    fake3dImg: "/images/fake3d/human2_fake3d.webp",
    depthImg: "/images/depth/human2_depth.webp",
  },
  {
    title: "Ancient Reverie",
    type: "human",
    depthImg: "/images/depth/ancient_depth.webp",
    fake3dImg: "/images/fake3d/ancient_fake3d.webp",
  },

  // Fantasía / criaturas míticas
  {
    title: "Draconic Soul",
    type: "fantasy",
    depthImg: "/images/depth/dragon_depth.webp",
    fake3dImg: "/images/fake3d/dragon_fake3d.webp",
  },

  // Animales majestuosos
  {
    title: "Stoneborn Beast",
    type: "majestic",
    depthImg: "/images/depth/lion_depth.webp",
    fake3dImg: "/images/fake3d/lion_fake3d.webp",
  },
  {
    title: "Majestic Lion",
    type: "majestic",
    fake3dImg: "/images/fake3d/lion2_fake3d.webp",
    depthImg: "/images/depth/lion2_depth.webp",
  },

  // Animales lúdicos / coloridos
  {
    title: "Rainbow Unicorn",
    type: "playful",
    fake3dImg: "/images/fake3d/unicorn_fake3d.webp",
    depthImg: "/images/depth/unicorn_depth.webp",
  },
  {
    title: "Frog Beats",
    type: "playful",
    fake3dImg: "/images/fake3d/frog_fake3d.webp",
    depthImg: "/images/depth/frog_depth.webp",
  },
  {
    title: "Papercraft Pup",
    type: "playful",
    fake3dImg: "/images/fake3d/dog_fake3d.webp",
    depthImg: "/images/depth/dog_depth.webp",
  },
  {
    title: "Crafted Kitty",
    type: "playful",
    fake3dImg: "/images/fake3d/cat2_fake3d.webp",
    depthImg: "/images/depth/cat2_depth.webp",
  },
  {
    title: "Whimsical Zebra",
    type: "playful",
    fake3dImg: "/images/fake3d/zebra2_fake3d.webp",
    depthImg: "/images/depth/zebra2_depth.webp",
  },

  // Robots / mecánicos
  {
    title: "Nimbus Eye",
    type: "robot",
    depthImg: "/images/depth/robot_depth.webp",
    fake3dImg: "/images/fake3d/robot_fake3d.webp",
  },

  // Cosmo / alienígenas
  {
    title: "Cosmic Cuteness",
    type: "cosmic",
    fake3dImg: "/images/fake3d/baby_stelar_fake3d.webp",
    depthImg: "/images/depth/baby_stelar_depth.webp",
  },
  {
    title: "Rainbow Alien",
    type: "cosmic",
    fake3dImg: "/images/fake3d/alien_fake3d.webp",
    depthImg: "/images/depth/alien_depth.webp",
  },
  {
    title: "Pink Alien",
    type: "cosmic",
    fake3dImg: "/images/fake3d/alien2_fake3d.webp",
    depthImg: "/images/depth/alien2_depth.webp",
  },
];
