"use client";
import React, { useState } from "react";

export default function UploadBerita() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("isi", isi);
    formData.append("kategori", kategori);
    if (gambar) formData.append("gambar", gambar);

    console.log("Berita siap diupload:", { judul, isi, kategori, gambar });
    alert("Berita berhasil disiapkan! (Integrasi ke API nanti di Step 2)");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Berita Baru</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "600px",
        }}
      >
        <input
          type="text"
          placeholder="Judul Berita"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
          required
        />
        <textarea
          placeholder="Isi Berita"
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", height: "200px" }}
          required
        />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="">Pilih Kategori</option>
          <option value="pemerintahan">Pemerintahan</option>
          <option value="prestasi">Prestasi</option>
          <option value="umum">Umum</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setGambar(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#5B2C91",
            color: "#fff",
            border: "none",
            fontSize: "16px",
          }}
        >
          Publish Berita
        </button>
      </form>
    </div>
  );
}
