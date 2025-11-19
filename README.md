# Fake 3D Images Gallery

Explore an interactive fake-3D image slider with WebGL parallax, depth-map distortion and ultra-smooth transitions driven by custom shaders and real-time mouse input. A WebGL gallery built with **React + Vite** that simulates real depth using a combination of:

- Depth maps
- Custom GLSL shaders
- Mouse-driven parallax
- Texture displacement
- Mirrored UV mapping to avoid texture clipping

The result is a lightweight "fake-3D" effect with smooth interaction and high performance.

This project was inspired by **Victor Costa (𝘃𝘄𝗟𝗮𝗯-𝗖𝗿𝗲𝗮𝘁𝗶𝘃𝗲 𝗖𝗼𝗱𝗲)** course.

The images displayed in the gallery were generated using **Canva AI** prompts, obtained from the **𝘃𝘄𝗟𝗮𝗯-𝗖𝗿𝗲𝗮𝘁𝗶𝘃𝗲 𝗖𝗼𝗱𝗲** course.

Depth maps for the images were created either with a **custom Python script** or using [Artificial Studio Depth Map Generator](https://app.artificialstudio.ai/tools/image-depth-map-generator).

---

## 📸 Demo

**🌐 Live Demo:** [fake-3d-images-gallery](https://react-threejs-glsl-fake-3d-images-g.vercel.app/)

<p align="center" width="100%">
<img src="public/images/app/app1.png" width="30%" />
<img src="public/images/app/app2.png" width="30%" />
<img src="public/images/app/app3.png" width="30%" />
</p>

---

## 🚀 Features

- Fake-3D effect using depth-map–based displacement
- Mouse-driven **parallax interactions** for immersive visual experience.
- Mirrored UV wrapping to prevent edge artifacts
- Smooth mouse interaction (optionally animated with GSAP)
- Smooth **GSAP animations** for gallery transitions and UI elements.
- Modular architecture with GLSL files loaded as ES modules
- Zero geometry manipulation — all displacement occurs in the shader
- Blurry background effects using CSS `backdrop-filter`.

---

## 🎨 Fake-3D Shader Architecture

The Fake-3D Images Gallery leverages WebGL and Three.js combined with custom GLSL shaders to create an immersive, interactive 3D effect on 2D images. This architecture allows images to respond to mouse input, creating depth-based parallax and smooth real-time displacement.

### 1.Depth Map

    - Grayscale image encoding pixel distances.

    - Lighter → closer, darker → further.

    - Drives pixel displacement.

### 2.Fragment Shader

    - Displaces pixels using depth map + mouse input (uMouse).

    - mirrored() avoids tearing at edges.

    - Renders the displaced image for fake-3D effect.

### 3.Vertex Shader

    - Passes UV coordinates to fragment shader.

    - Projects mesh to screen space.

### 4.Mouse-driven Parallax

    - Pixels move proportionally to depth.

    - Closer pixels move more → realistic 3D illusion.

### 5.Render Loop & Uniforms

    - Updates uMouse each frame.

    - Shader applied to plane mesh.

    - Smooth real-time interaction and dynamic depth effects.

## 🛠 Technologies Used

This project is built with modern frontend, 3D graphics, and animation tools to deliver a smooth and immersive **fake-3D image gallery** experience.

### 🌐 Frontend

- **⚛️ React 19** – Component-based UI library for dynamic rendering.
- **🚀 Vite 7** – Fast development server and build tool for modern web projects.

### 🎨 Styling & Fonts

- **🎨 CSS3** – Custom styling for layout, responsive design, hover effects, and gallery transitions.
- **🖋 Google Fonts (Fredoka)** – Clean, modern font used across the UI for titles and buttons.
- **💎 Backdrop & Blur Effects** – CSS `backdrop-filter` for immersive blurry background effects.
- **⚡ Responsive Layouts** – Media queries and dynamic sizing to adapt gallery and canvas for mobile and desktop.

### 🎨 3D & WebGL

- **🖼 Three.js 0.181** – 3D rendering engine for WebGL, handling meshes, cameras, and scenes.
- **🟪 vite-plugin-glsl 1.5** – Import `.glsl` shaders as ES modules for modular shader development.
- **⏱ vite-plugin-preload 0.4** – Preloads assets like textures efficiently for high-performance WebGL.

### ✨ Animations

- **💫 GSAP 3.13** – Advanced animations for DOM and WebGL objects.
- **🌀 @gsap/react 2.1** – React hooks integration for GSAP timelines and transitions.

### 📱 UI & Responsiveness

- **🎨 react-icons 5.5** – Ready-to-use vector icons for interactive UI components.
- **📏 react-responsive 10.0** – Media query hooks for adapting layout on mobile and desktop.

### 🧰 Development & Linting

- **✅ ESLint 9.39 + @eslint/js** – Ensures code quality and consistency.
- **⚡ eslint-plugin-react-hooks 5.2** – Verifies correct usage of React hooks.
- **🔄 eslint-plugin-react-refresh 0.4** – Supports fast refresh in development mode.
- **📜 Type Definitions** – `@types/react` & `@types/react-dom` for type checking in JS.

---

🧠 How the Fake-3D Works:

1. The fragment shader samples a depth map.

2. Depth values are normalized around 0.5.

3. Mouse movement is fed through uniforms (uMouse) to displace UVs.

4. The UVs are mirrored to avoid texture clipping.

5. The original texture is sampled at displaced UV coordinates.

6. The final result appears to bend reactively in pseudo-3D.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/delafuentej/react-threejs-glsl_fake-3d-images-gallery.git
   ```
2. Navigate to the project directory:
   ```bash
   cd react-three-glsl_fake-3d-images-gallery
   ```
3. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
    yarn install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

---

📄 License

This project is licensed under the MIT License.

---
