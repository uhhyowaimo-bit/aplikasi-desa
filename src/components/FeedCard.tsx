"use client";

import Image from "next/image"; // Impor Image dari next/image

interface FeedCardProps {
  title: string;
  source: string;
  image: string;
  content: string;
}

export default function FeedCard({ title, source, image, content }: FeedCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        margin: "10px 0",  // Menambah jarak antar card
      }}
    >
      {/* Gunakan Image dari next/image untuk optimasi gambar */}
      <Image
        src={image}
        alt={title}
        width={500}  // Tentukan ukuran gambar
        height={180} // Tentukan ukuran gambar
        style={{ objectFit: "cover" }}
      />
      <div style={{ padding: "12px" }}>
        <h4 style={{ margin: "0 0 6px" }}>{title}</h4>
        <p style={{ color: "#666", fontSize: "13px", marginBottom: "8px" }}>Sumber: {source}</p>
        <p style={{ fontSize: "14px", lineHeight: "1.5" }}>{content}</p>
      </div>
    </div>
  );
}
