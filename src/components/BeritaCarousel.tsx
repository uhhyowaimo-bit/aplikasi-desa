"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function BeritaCarousel({ berita }: { berita: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (berita.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % berita.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [berita.length]);

  if (berita.length === 0) return <p>Belum ada berita.</p>;

  const current = berita[currentIndex];

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "30px",
      }}
    >
      {/* Thumbnail untuk video */}
      <img
        src={
          current.mediaType === "video"
            ? current.thumbnail || "/video-placeholder.gif"
            : current.image || "/placeholder.jpg"
        }
        alt={current.title}
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      {/* Judul */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          background: "rgba(0,0,0,0.6)",
          color: "#fff",
          padding: "15px",
          width: "100%",
        }}
      >
        <Link href={`/artikel/${current.slug}`} style={{ textDecoration: "none", color: "white" }}>
          <h2 style={{ margin: 0 }}>{current.title}</h2>
        </Link>
      </div>

      {/* Prev & Next */}
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + berita.length) % berita.length)
        }
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        ‹
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % berita.length)}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        ›
      </button>
    </div>
  );
}
