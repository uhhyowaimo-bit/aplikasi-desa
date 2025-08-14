"use client";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext"; // Mengimpor useAppContext
import ClientLayout from "@/components/ClientLayout"; // Mengimpor ClientLayout

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { dark } = useAppContext(); // Mengambil status dark mode dari context

  return (
    <html lang="id">
      <head>
        <title>Aplikasi Desa</title>
      </head>
      <body
        style={{
          backgroundColor: dark ? "#111" : "#fff", // Menyesuaikan latar belakang sesuai dark mode
          color: dark ? "#fff" : "#111", // Menyesuaikan warna teks sesuai dark mode
        }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
