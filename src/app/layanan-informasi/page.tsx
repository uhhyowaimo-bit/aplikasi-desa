"use client";
import React, { useEffect, useState } from "react";
import BottomSheet from "@/components/BottomSheet";
import FormPengajuanSurat from "@/components/FormPengajuanSurat";
import FormCekStatus from "@/components/FormCekStatus";

export default function LayananPage() {
  const [selectedContent, setSelectedContent] = useState<React.ReactNode | null>(null); // Tipe sudah benar

  const openSheet = (content: React.ReactNode) => {
    setSelectedContent(content);
  };

  const closeSheet = () => {
    setSelectedContent(null);
  };

  // Data untuk ikon aplikasi
  const layanan = [
    { name: "Aplikasi 1", icon: "📄", color: "#f97316" },
    { name: "Aplikasi 2", icon: "🏠", color: "#60a5fa" },
    { name: "Aplikasi 3", icon: "💼", color: "#4ade80" },
    { name: "Aplikasi 4", icon: "📋", color: "#ef4444" },
    { name: "Aplikasi 5", icon: "📅", color: "#eab308" },
    { name: "Aplikasi 6", icon: "🛠️", color: "#10b981" },
  ];

  // Menyimpan index ikon yang aktif
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Tipe state yang lebih spesifik

  // Auto slide setiap 3 detik untuk mengganti ikon
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % layanan.length); // Berganti secara otomatis
    }, 3000); // Ganti setiap 3 detik

    return () => clearInterval(interval); // Clear interval saat komponen di-unmount
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Layanan</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {/* Pengajuan Surat */}
        <div
          onClick={() => openSheet(<FormPengajuanSurat onSuccess={closeSheet} />)}
          style={kotakStyle}
        >
          <span style={{ fontSize: "40px" }}>📄</span>
          <p style={titleStyle}>Pengajuan Surat</p>
        </div>

        {/* Status */}
        <div
          onClick={() => openSheet(<FormCekStatus />)}
          style={kotakStyle}
        >
          <span style={{ fontSize: "40px" }}>📊</span>
          <p style={titleStyle}>Status</p>
        </div>

        {/* Layanan Lainnya */}
        <div
          onClick={() =>
            openSheet(
              <div>
                <h3>Layanan Lainnya</h3>
                <p>Akses layanan lainnya untuk warga di sini.</p>
              </div>
            )
          }
          style={kotakStyle}
        >
          {/* Tampilkan 1 ikon yang berganti */}
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: layanan[currentIndex].color,
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "opacity 0.5s ease", // Animasi transisi perubahan ikon
            }}
          >
            <div style={{ fontSize: "30px" }}>{layanan[currentIndex].icon}</div>
            <p>{layanan[currentIndex].name}</p>
          </div>
        </div>
      </div>

      {/* BottomSheet */}
      {selectedContent && (
        <BottomSheet content={selectedContent} onClose={closeSheet} />
      )}
    </div>
  );
}

const kotakStyle: React.CSSProperties = {
  height: "200px",
  background: "#f3f3f3",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  cursor: "pointer",
};

const titleStyle: React.CSSProperties = {
  marginTop: "10px",
  fontWeight: "bold",
  textAlign: "center",
};
