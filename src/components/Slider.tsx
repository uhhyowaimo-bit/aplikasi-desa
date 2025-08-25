"use client";
import { useState } from "react";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "Profil Desa", content: "Pemberian nama Kampale...", color: "#f97316" },
    { title: "Pemerintahn", content: "Struktur pemerintahan desa.", color: "#a3a3a3" },
    { title: "Data Desa", content: "Statistik dan data terkini.", color: "#4ade80" },
    { title: "Sejarah Desa", content: "Sejarah pembentukan dan perkembangan desa.", color: "#e43b89" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          minHeight: "300px",
          backgroundColor: slides[currentSlide].color,
          color: "#fff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].content}</p>
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={prevSlide}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Prev
        </button>
        <button
          onClick={nextSlide}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
