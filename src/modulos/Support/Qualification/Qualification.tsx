import React, { useState } from "react";

const Qualification = () => {
  const [selected, setSelected] = useState(0);

  const getWidth = () => `${selected * 10}%`;

  const getGradient = () => {
    if (selected <= 3) {
      return "linear-gradient(90deg, #FF6B6B 100%, #FF8E53 100%)"; // Rojo dominante
    } else if (selected <= 7) {
      return "linear-gradient(90deg, #FF6B6B 0%, #FF8E53 50%,#FFD93D 100%)";
    } else {
      return "linear-gradient(90deg, #FF6B6B 0%, #FFD93D 50%, #6BCB77 100%)"; // Amarillo/Verde
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 8,
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            onClick={() => setSelected(i + 1)}
            style={{
              padding: "8px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              backgroundColor:
                i + 1 === selected ? "var(--cInfo)" : "var(--cHover)",
              color: i + 1 === selected ? "var(--cWhite)" : "var(--cBlackV2)",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "var(--cHover)",
          borderRadius: 10,
          height: 16,
        }}
      >
        <div
          style={{
            width: getWidth(),
            height: 16,
            borderRadius: 10,
            background: getGradient(),
            transition: "width 0.3s ease-in-out, background 0.3s ease-in-out",
          }}
        />
      </div>
    </div>
  );
};

export default Qualification;
