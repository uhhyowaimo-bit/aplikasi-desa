"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Periksa status login dari localStorage
    if (localStorage.getItem("isLoggedIn") !== "true") {
      router.push("/admin/login"); // Redirect ke halaman login jika belum login
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  return (
    <div style={{ padding: "20px" }}>
      {isLoggedIn ? (
        <div>
          <h2>Dashboard Admin</h2>
          <p>Selamat datang, admin!</p>
          {/* Konten dashboard admin di sini */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
