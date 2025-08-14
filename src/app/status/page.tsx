"use client";
import React, { useState } from "react";

export default function StatusPage() {
  const [kode, setKode] = useState<string>("");  // Tentukan tipe string untuk kode
  const [hasil, setHasil] = useState<{ error?: string, nama?: string, jenisSurat?: string, status?: string, createdAt?: string } | null>(null);  // Tentukan tipe hasil dengan properti yang sesuai
  const [loading, setLoading] = useState<boolean>(false);  // Tipe loading ditentukan sebagai boolean

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cek Status Pengajuan</h2>
      <form onSubmit={handleCek} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Masukkan kode verifikasi"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
          required
        />
        <button
          type="submit"
          style={{ marginLeft: "10px", padding: "8px 16px" }}
        >
          Cek
        </button>
      </form>

      {loading && <p>Mengecek...</p>}

      {hasil && (
        <div style={{ marginTop: "20px" }}>
          {hasil.error ? (
            <p style={{ color: "red" }}>{hasil.error}</p>
          ) : (
            <>
              <p><strong>Nama:</strong> {hasil.nama}</p>
              <p><strong>Jenis Surat:</strong> {hasil.jenisSurat}</p>
              <p><strong>Status:</strong> {statusMap[hasil.status as keyof typeof statusMap] || hasil.status}</p>
              <p><strong>Diajukan pada:</strong> {new Date(hasil.createdAt).toLocaleString()}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const statusMap: Record<string, string> = {
  belum_diterima: "Belum Diterima",
  sudah_diterima: "Sudah Diterima",
  selesai: "Selesai",
};
