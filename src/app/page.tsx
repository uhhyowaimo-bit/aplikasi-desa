"use client";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function Page() {
  const { dark } = useAppContext(); // Mengambil status dark mode dari context
  const [mounted, setMounted] = useState(false); // Menangani masalah SSR (Server-Side Rendering)

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Mencegah tampilan kosong pada saat halaman pertama kali dimuat
  }

  return (
    <div
      style={{
        backgroundColor: dark ? "#111" : "#fff", // Mengubah background halaman sesuai dark mode
        color: dark ? "#fff" : "#111", // Mengubah warna teks sesuai dark mode
        height: "100vh", // Memastikan halaman mengisi seluruh layar
        padding: "20px", // Memberikan padding pada halaman
      }}
    >
      <h1>Selamat datang di aplikasi Desa!</h1>
      <p>Ini adalah tampilan dasar untuk memastikan aplikasi berjalan dengan baik.</p>
    </div>
  );
}
