"use client";
import React, { useState } from "react";

interface HasilStatus {
  error?: string;
  nama?: string;
  jenisSurat?: string;
  status?: string;
  createdAt?: string;
}

export default function FormCekStatus() {
  const [kode, setKode] = useState<string>(""); // Tipe string untuk kode
  const [hasil, setHasil] = useState<HasilStatus | null>(null); // Tipe state lebih spesifik
  const [loading, setLoading] = useState<boolean>(false); // Tipe boolean untuk loading

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

  const statusMap: Record<string, string> = {
    belum_diterima: "Belum Diterima",
    sudah_diterima: "Sudah Diterima",
    selesai: "Selesai",
  };

  return (
    <div>
      <h3>Cek Status Pengajuan</h3>
      <form onSubmit={handleCek} style={{ marginTop: "15px" }}>
        <input
          type="text"
          placeholder="Masukkan kode verifikasi"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          required
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Cek
        </button>
      </form>

      {loading && <p>Mengecek...</p>}

      {hasil && (
        <div style={{ marginTop: "15px" }}>
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
