"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar"; // Sesuaikan path
import BottomNav from "@/components/BottomNav"; // Sesuaikan path
import BurgerButton from "@/components/BurgerButton"; // Sesuaikan path
import { useAppContext } from "@/context/AppContext"; // Mengimpor useAppContext
import LoginSheet from "@/components/LoginSheet"; // Sesuaikan path
import { useAuth } from "@/context/AuthContext"; // Import useAuth

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { rtl, dark, lang, toggleRtl, toggleDark, toggleLang } = useAppContext(); // Mengakses context global
  const [countdown, setCountdown] = useState("");
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // Menyimpan state untuk login sheet
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Mengecek apakah sudah ada status login di localStorage
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const targetDate = new Date("2025-08-17T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance <= 0) {
        setCountdown("Hari Proklamasi Telah Tiba!");
        clearInterval(interval);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`${days} Hari : ${hours} Jam : ${minutes} Menit : ${seconds} Detik`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginOpen = () => {
    setShowLogin(true);
    setSidebarOpen(false); // Menutup sidebar saat login sheet dibuka
  };

  const handleLogout = () => {
    // Hapus status login dari localStorage
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    // Refresh halaman
    window.location.reload();
  };

  return (
    <>
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "linear-gradient(90deg, #6a11cb, #2575fc)",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "0 0 8px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Kiri: Logo + Nama */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="Logo Desa"
            style={{
              width: "45px",
              height: "45px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          <h3 style={{ margin: 0, fontSize: "20px" }}>Website Desa</h3>
        </div>

        {/* Kanan: Countdown */}
        <div style={{ textAlign: "right" }}>
          {mounted && (
            <>
              <p style={{ margin: 0, fontSize: "14px" }}>Proklamasi Kemerdekaan R.I.</p>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>{countdown}</p>
            </>
          )}
        </div>
      </header>

      {/* TOMBOL BURGER */}
      {/* Tombol burger hanya muncul jika sidebar tidak terbuka */}
      {!showLogin && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            position: "fixed",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2000,
            background: "#6a11cb",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
            cursor: "pointer",
          }}
        >
          🍔
        </button>
      )}

      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* KONTEN */}
      <main
        style={{
          direction: rtl ? "rtl" : "ltr", // Mengaktifkan RTL jika mode aktif
          backgroundColor: dark ? "#111" : "#fff", // Mengaktifkan Dark mode
          color: dark ? "#fff" : "#111", // Menyesuaikan warna teks
        }}
      >
        {children}
      </main>

      {/* LOGIN SHEET */}
      {showLogin && <LoginSheet onClose={() => setShowLogin(false)} onLogin={() => setIsLoggedIn(true)} />}

      {/* BOTTOM NAV */}
      <BottomNav />

      {/* TOMBOL LOGOUT */}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            background: "#f44336",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}
    </>
  );
}
