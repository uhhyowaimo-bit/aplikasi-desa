"use client";
import React from "react";

export default function BeritaListCard({ berita }: { berita: any }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        overflow: "hidden",
        marginBottom: "20px",
      }}
    >
      <img
        src={berita.image || "https://via.placeholder.com/400x200"}
        alt={berita.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "15px" }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#4A3AFF" }}>{berita.title}</h3>
        <p style={{ fontSize: "14px", color: "#666" }}>
          {berita.description.slice(0, 100)}...
        </p>
        <div style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>
          <span>{berita.date}</span> · <span>{berita.author}</span> ·{" "}
          <span>{berita.viewers} kali dilihat</span>
        </div>
      </div>
    </div>
  );
}
