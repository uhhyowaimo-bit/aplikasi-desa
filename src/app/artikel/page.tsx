"use client";
import { useEffect, useState } from "react";
import Image from "next/image";  // Impor komponen Image dari Next.js

// Tentukan tipe untuk berita
type Artikel = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export default function ArtikelPage() {
  const [beritaData, setBeritaData] = useState<Artikel[]>([]);  // Tentukan tipe state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBerita() {
      const res = await fetch("/api/berita");
      const data = await res.json();
      setBeritaData(data);
      setLoading(false);
    }
    fetchBerita();
  }, []);

  if (loading) return <p>Memuat artikel...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Semua Artikel</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {beritaData.map((berita) => (
          <div
            key={berita.id}
            style={{
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <Image
              src={berita.image || "https://via.placeholder.com/400x200"}
              alt={berita.title}
              width={400}  // Tentukan ukuran gambar
              height={200} // Tentukan ukuran gambar
              style={{ objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3>{berita.title}</h3>
              <p>{berita.description.slice(0, 120)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
