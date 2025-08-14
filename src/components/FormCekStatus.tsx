"use client";
import React, { useState } from "react";

// Tipe data untuk hasil status pengajuan
interface HasilStatus {
  error?: string;
  nama?: string;
  jenisSurat?: string;
  status?: string;
  createdAt?: string;
}

export default function FormCekStatus() {
  const [kode, setKode] = useState<string>("");  // Tipe kode sebagai string
  const [hasil, setHasil] = useState<HasilStatus | null>(null);  // Tipe hasil yang lebih spesifik
  const [loading, setLoading] = useState<boolean>(false);  // Tipe boolean untuk loading

  // Fungsi untuk menangani pengecekan status berdasarkan kode
  const handleCek = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setHasil(null);

    try {
      const res = await fetch(`/api/status?kode=${kode}`);
      if (res.ok) {
        const data = await res.json();
        setHasil(data);
      } else {
        setHasil({ error: "Kode tidak ditemukan." });
      }
    } catch {
      setHasil({ error: "Terjadi kesalahan saat cek status." });
    } finally {
      setLoading(false);
    }
  };

  // Mapping status dengan nilai deskriptif
  const statusMap: Record<string, string> = {
    belum_diterima: "Belum Diterima",
    sudah_diterima: "Sudah Diterima",
    selesai: "Selesai",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Cek Status Pengajuan</h3>

      {/* Formulir untuk input kode verifikasi */}
      <form onSubmit={handleCek} style={{ marginTop: "15px" }}>
        <input
          type="text"
          placeholder="Masukkan kode verifikasi"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          required
          style={{
            padding: "8px",
            width: "100%",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cek
        </button>
      </form>

      {/* Menampilkan status loading */}
      {loading && <p style={{ color: "#666" }}>Mengecek...</p>}

      {/* Menampilkan hasil */}
      {hasil && (
        <div style={{ marginTop: "15px", color: "#333" }}>
          {hasil.error ? (
            <p style={{ color: "red" }}>{hasil.error}</p>
          ) : (
            <>
              <p><strong>Nama:</strong> {hasil.nama}</p>
              <p><strong>Jenis Surat:</strong> {hasil.jenisSurat}</p>
              <p><strong>Status:</strong> {statusMap[hasil.status || ""] || hasil.status}</p>
              <p><strong>Diajukan:</strong> {hasil.createdAt ? new Date(hasil.createdAt).toLocaleString() : "N/A"}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
