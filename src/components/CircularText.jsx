import React from "react";

const CircularText = ({
  text,
  radius = 40,
  color = "white",
  fontSize = 14,
}) => {
  const letters = text.split("");

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(50,50)">
        {letters.map((letter, i) => {
          const angleOffset = -150; // Noroeste aproximado
          const angle = (i / letters.length) * 360 - angleOffset; // empezar desde arriba
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${angle + 90}, ${x}, ${y})`}
              fill={color}
              fontSize={fontSize}
              fontWeight="900"
              fontFamily="Arial, sans-serif"
            >
              {letter}
            </text>
          );
        })}
      </g>
    </svg>
  );
};

export default CircularText;
