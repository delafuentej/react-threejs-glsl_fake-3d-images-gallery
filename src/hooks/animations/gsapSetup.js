import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Esto se ejecuta UNA sola vez cuando este archivo se importa por primera vez.
gsap.registerPlugin(SplitText, useGSAP);

export { gsap, SplitText };
