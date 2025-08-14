"use client";
import React, { useState, useRef, useEffect } from "react";

export default function LayananPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  const menuItems = [
    { title: "Profil Desa", icon: "🏠", content: " Pemberian nama Kampale sudah terbentuk sejak pemerintahan Kepala Kampung Lamakkarennu Tahun 1930. Nama Kampale ini adalah hasil kesepakatan para kepala suku kampung saat itu. Kampale merupakan tempat pusat pemerintahan dari tahun 1930 sampai 1942. Tahun 1943 Kepala Kampung Lamakkarennu meninggal dunia lalu digantikan Andi Kancilu. Andi Kancilu saat itu bertempat tinggal di Kalosi, sehingga pusat pemerintahan pindah di Kalosi. Terjadinya pembentukan atau pemekaran desa, karena pada dasarnya masyarakat Kampale sudah memenuhi persyaratan untuk memisahkan diri dan membentuk satu desa, hal ini untuk memudahkan masyarakat Kampale mengurus segala keperluannya. Sehingga para pemuka agama dan masyarakat mengadakan rapat untuk mengusulkan kepada Desa Induk (Desa Kalosi) untuk rencana pemekaran desa. Jadi Kepala Desa Kalosi terpaksa mengadakan musyawarah dengan tokoh agama, masyarakat dan anggota BPD, lalu mengajukan usulan kepada Camat Dua Pitue sehingga terbitlah Surat Camat Dua Pitue No. 893../26/VII/PEM/Tanggal 31 Juli 2009.Terlampir Berita Acara rapat penetapan Kepala Desa Sementara dan SK Kepala Desa Terpilih (Defentif) Desa Kampale Kecamatan Dua Pitue, Kabupaten Sidenreng Rappang. Demikian sejarah terbentuknya Desa Kampale. ", color: "#f97316" },
    { title: "Pemerintahan", icon: "🏛️", content: "Struktur pemerintahan desa.", color: "#a3a3a3" },
    { title: "Data Desa", icon: "📊", content: "Statistik dan data terkini.", color: "#4ade80" },
    { title: "Regulasi", icon: "📜", content: "Peraturan dan kebijakan.", color: "#fde047" },
    { title: "Peta", icon: "🗺️", content: "Peta lokasi penting.", color: "#ef4444" },
    { title: "PPID", icon: "📑", content: "Layanan informasi publik.", color: "#60a5fa" },
    { title: "Prestasi Instansi", icon: "🏆", content: "Daftar prestasi desa.", color: "#8b5cf6" },
    { title: "Inovasi Desa", icon: "💡", content: "Program inovasi desa.", color: "#0f172a" },
    { title: "E-Paper DKA", icon: "📰", content: "Publikasi digital DKA.", color: "#b91c1c" },
    { title: "SDGS", icon: "🌱", content: "Pembangunan berkelanjutan.", color: "#facc15" },
    { title: "IDM 2023", icon: "📅", content: "Indeks Desa Membangun.", color: "#f59e0b" },
  ];

  const handleItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Close when clicking outside the layer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (layerRef.current && !layerRef.current.contains(event.target as Node)) {
        setActiveIndex(null);
      }
    };
    if (activeIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeIndex]);

  return (
    <div style={{ padding: "20px", position: "relative", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "15px", fontSize: "24px", fontWeight: "bold" }}>Menu Utama</h2>

      {/* Responsive Grid */}
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    width: "100%",
  }}
>
       {menuItems.map((item, index) => (
    <div
      key={index}
      onClick={() => handleItemClick(index)}
      style={{
        background: item.color,
        borderRadius: "12px",
        aspectRatio: "1 / 1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#fff",
        fontSize: "28px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        transition: "transform 0.2s ease",
        padding: "10px",
        textAlign: "center",
      }}
    >
           <div style={{ fontSize: "32px" }}>{item.icon}</div>
      <p style={{ marginTop: "10px", fontWeight: "600", fontSize: "14px" }}>{item.title}</p>
          </div>
        ))}
      </div>

      {/* Floating Layer */}
      {activeIndex !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            background: "rgba(0,0,0,0.4)",
            zIndex: 15,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "120px",
          }}
        >
          <div
            ref={layerRef}
            style={{
              background: menuItems[activeIndex].color,
              width: "90%",
              maxWidth: "900px",
              minHeight: "320px",
              borderRadius: "16px",
              padding: "50px",
              color: "#fff",
              position: "relative",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              animation: "popIn 0.3s ease",
            }}
          >
            {/* Floating Icon (baru, tidak mengganggu ikon asal) */}
            <div
              style={{
                position: "absolute",
                top: "-35px",
                left: "30px",
                fontSize: "40px",
                background: "#fff",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            >
              {menuItems[activeIndex].icon}
            </div>

            <h3 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "15px" }}>
              {menuItems[activeIndex].title}
            </h3>
            <p style={{ fontSize: "18px" }}>{menuItems[activeIndex].content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
