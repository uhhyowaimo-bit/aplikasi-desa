import React, { useState } from 'react';
import Image from "next/image";

// Data untuk Slide
const slides = [
  {
    title: "Profil Desa",
    color: "#f97316",
    content: "Pemberian nama Kampale, sejarah desa, dan informasi terkait lainnya...",
  },
  {
    title: "Pemerintahan",
    color: "#a3a3a3",
    content: "Struktur pemerintahan desa.",
  },
  {
    title: "Data Desa",
    color: "#4ade80",
    content: "Statistik dan data terkini.",
    image: "/images/data-desa.jpg", // ← gambar slide ini
  },
];

const ProfilDesa = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const s = slides[currentSlide];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div
      style={{
        padding: 20,
        background: s.color,
        borderRadius: 12,
        color: "#fff",
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
        position: "relative",
      }}
    >
      <h3 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 16 }}>
        {s.title}
      </h3>

      {/* Konten + Gambar disamping */}
      <div
        style={{
          display: "flex",
          flexDirection: s.image ? "row" : "column", // kalau ada gambar → sejajar
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <div style={{ flex: 1, fontSize: 16, textAlign: "justify" }}>{s.content}</div>

        {s.image && (
          <Image
            src={s.image}
            alt={s.title}
            style={{
              width: "45%",
              height: "auto",
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
        )}
      </div>

      {/* Tombol Navigasi */}
      <button
        onClick={prevSlide}
        aria-label="Sebelumnya"
        style={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.28)",
          border: "none",
          borderRadius: 8,
          padding: "6px 10px",
          color: "#fff",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        aria-label="Berikutnya"
        style={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.28)",
          border: "none",
          borderRadius: 8,
          padding: "6px 10px",
          color: "#fff",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default ProfilDesa;
