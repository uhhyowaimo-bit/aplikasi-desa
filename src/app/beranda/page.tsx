"use client";
import { useState, useEffect } from "react";
import FormTambahBerita from "@/components/FormTambahBerita";
import BeritaCarousel from "@/components/BeritaCarousel";
import Link from "next/link";
import Image from "next/image"; // Pastikan menggunakan next/image untuk gambar

// Tentukan tipe untuk berita
type Artikel = {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  mediaType: "image" | "video";
  thumbnail?: string;
  date: string;
  author: string;
  viewers: number;
};

export default function Beranda() {
  const [beritaData, setBeritaData] = useState<Artikel[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Ambil berita
  useEffect(() => {
    async function fetchBerita() {
      try {
        const res = await fetch("/api/berita");
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        setBeritaData(data);
      } catch (err: any) {
        console.error("Gagal mengambil data berita:", err);
        setError(err.message || "Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    }
    fetchBerita();
  }, []);

  // Cek login
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  // Hapus berita
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/berita/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Gagal menghapus berita. Status: ${res.status}`);
      const updatedBerita = beritaData.filter((berita) => berita.id !== id);
      setBeritaData(updatedBerita);
    } catch (err) {
      console.error("Gagal menghapus berita:", err);
      alert("Terjadi kesalahan saat menghapus berita.");
    }
  };

  if (loading) return <p>Memuat berita...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // Ambil hanya 3 artikel untuk tampilan ringkas di beranda
  const artikelPreview = beritaData.slice(0, 3);

  return (
    <div style={{ padding: "20px" }}>
      {/* ===== Carousel Berita Utama ===== */}
      <BeritaCarousel berita={beritaData} />

      {/* ===== Artikel Terkini ===== */}
      <h2 style={{ marginBottom: "20px" }}>Artikel Terkini</h2>
      {artikelPreview.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {artikelPreview.map((berita) => (
            <div
              key={berita.id}
              style={{
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              {/* Gunakan next/image */}
              <Image
                src={berita.mediaType === "video"
                  ? berita.thumbnail || "https://via.placeholder.com/400x200?text=Video+Preview"
                  : berita.image || "https://via.placeholder.com/400x200"}
                alt={berita.title}
                width={400}
                height={200}
                layout="responsive" // Untuk gambar responsif
                objectFit="cover" // Gambar tetap terpotong sesuai ukuran
              />

              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0" }}>
                  {/* Gunakan Link dengan passHref */}
                  <Link href={`/artikel/${berita.slug}`} passHref>
                    <a style={{ textDecoration: "none", color: "#4A3AFF" }}>
                      {berita.title}
                    </a>
                  </Link>
                </h3>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  {berita.description.slice(0, 100)}...
                </p>
                <div style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>
                  <span>{berita.date}</span> · <span>{berita.author || "Admin"}</span> ·{" "}
                  <span>{berita.viewers} kali dilihat</span>
                </div>

                {/* Tombol admin */}
                {isLoggedIn && (
                  <div style={{ marginTop: "10px" }}>
                    <button onClick={() => alert("Edit " + berita.title)} style={{ marginRight: "10px" }}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(berita.id)}
                      style={{ background: "red", color: "white" }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Belum ada berita.</p>
      )}

      {/* Tombol lihat semua artikel */}
      {beritaData.length > 3 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a
            href="/artikel"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "#4A3AFF",
              color: "#fff",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            Lihat Semua Artikel
          </a>
        </div>
      )}

      {/* Tombol tambah berita */}
      {isLoggedIn && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "green",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Tambah Berita
          </button>

          {showForm && (
            <div
              style={{
                background: "rgba(0,0,0,0.6)",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}>
                <h3>Tambah Berita</h3>
                <FormTambahBerita
                  onSuccess={() => {
                    setShowForm(false);
                    window.location.reload();
                  }}
                />
                <button onClick={() => setShowForm(false)} style={{ marginTop: "10px" }}>
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
