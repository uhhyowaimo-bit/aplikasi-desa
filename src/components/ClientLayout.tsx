"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext"; // Import context dari AppContext

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { dark, toggleDark } = useAppContext(); // Ambil `dark` dan `toggleDark` dari context
  const [mounted, setMounted] = useState(false); // Untuk memastikan komponen sudah dimuat

  useEffect(() => {
    setMounted(true); // Menandakan komponen sudah dimuat
  }, []);

  if (!mounted) return null; // Jangan render jika komponen belum dimuat

  return (
    <div
      style={{
        backgroundColor: dark ? "#111" : "#fff", // Mode gelap
        color: dark ? "#fff" : "#111", // Warna teks
        height: "100vh", // Mengisi layar
        padding: "20px", // Padding
      }}
    >
      <h1>Selamat datang di aplikasi dengan Dark Mode!</h1>
      <button onClick={() => toggleDark(!dark)}>
        {dark ? "Matikan Mode Gelap" : "Aktifkan Mode Gelap"}
      </button>
      <div>{children}</div>
    </div>
  );
}
