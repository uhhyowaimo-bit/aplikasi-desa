"use client";
import React, { useEffect, useState } from "react";

interface Props {
  onSuccess?: () => void;
}

export default function FormPengajuanSurat({ onSuccess }: Props) {
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    jenisSurat: "Surat Keterangan",
    alasan: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedKode, setGeneratedKode] = useState<string | null>(null);

  // ⬇️ Ambil kode dari localStorage saat komponen pertama dimuat
  useEffect(() => {
    const saved = localStorage.getItem("kodeTerakhir");
    if (saved) {
      setGeneratedKode(saved);
      setSuccess(true);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedKode(data.kodeVerifikasi);
        localStorage.setItem("kodeTerakhir", data.kodeVerifikasi);
        setSuccess(true);
        if (onSuccess) onSuccess();
      } else {
        alert("Gagal mengirim data.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("kodeTerakhir"); // 🧹 hapus kode dari localStorage
    setSuccess(false);                       // reset tampilan
    setGeneratedKode(null);                 // hapus state kode
    setForm({
      nama: "",
      nik: "",
      jenisSurat: "Surat Keterangan",
      alasan: "",
    }); // reset isian
  };

  return success ? (
    <div>
      <p>✅ Pengajuan berhasil dikirim!</p>
      <p>Kode Verifikasi Anda:</p>
      <h3 style={{ fontSize: "28px", margin: "10px 0" }}>{generatedKode}</h3>
      <p>Simpan kode ini untuk mengecek status pengajuan Anda nanti.</p>

      <button
        onClick={handleReset}
        style={{
          marginTop: "15px",
          padding: "8px 16px",
          background: "#e11d48",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Selesai
      </button>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "12px" }}>
        <label>Nama Lengkap</label>
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>NIK</label>
        <input
          type="text"
          name="nik"
          value={form.nik}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Jenis Surat</label>
        <select
          name="jenisSurat"
          value={form.jenisSurat}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="Surat Keterangan">Surat Keterangan</option>
          <option value="Surat Domisili">Surat Domisili</option>
          <option value="Surat Usaha">Surat Keterangan Usaha</option>
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Alasan / Keterangan</label>
        <textarea
          name="alasan"
          value={form.alasan}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", minHeight: "80px" }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          background: "#1d4ed8",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Mengirim..." : "Kirim Pengajuan"}
      </button>
    </form>
  );
}
