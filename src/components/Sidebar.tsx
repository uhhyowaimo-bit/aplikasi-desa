"use client";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext"; // Mengimpor useAppContext
import LoginSheet from "@/components/LoginSheet"; // Sesuaikan path
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [showLogin, setShowLogin] = useState(false); // Untuk menampilkan modal LoginSheet
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { dark, toggleDark } = useAppContext(); // Mengambil status dark mode dan fungsi untuk toggle
  const [stats, setStats] = useState({ daily: 0, weekly: 0, total: 0 });
  const [chartData, setChartData] = useState([
    { day: "Sen", visitors: 0 },
    { day: "Sel", visitors: 0 },
    { day: "Rab", visitors: 0 },
    { day: "Kam", visitors: 0 },
    { day: "Jum", visitors: 0 },
    { day: "Sab", visitors: 0 },
    { day: "Min", visitors: 0 },
  ]);

  // Memastikan mode gelap tetap konsisten setelah refresh
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      toggleDark(true); // Jika ada, set mode gelap ke true
    } else {
      toggleDark(false); // Jika tidak, set mode gelap ke false
    }
  }, [toggleDark]);

  useEffect(() => {
    // Fungsi untuk menangani klik di luar sidebar dan ESC
    function handleClickOutside(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Fetch statistik pengunjung
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/visitors");
        const data = await res.json();
        setStats(data);
        setChartData((prev) =>
          prev.map((item) => ({
            ...item,
            visitors: Math.floor(Math.random() * 100 + 20),
          }))
        );
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh data setiap 30 detik
    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set status login ke true
    localStorage.setItem("isLoggedIn", "true"); // Simpan status login di localStorage
    setShowLogin(false); // Menutup LoginSheet
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set status login ke false
    localStorage.setItem("isLoggedIn", "false"); // Hapus status login di localStorage
    window.location.reload(); // Menyegarkan halaman setelah logout
  };

  // Pastikan untuk menambahkan return null jika sidebar tidak terbuka
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1100,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        ref={sidebarRef}
        style={{
          height: "100%",
          width: "300px",
          background: dark ? "#333" : "#432874", // Menggunakan warna gelap atau terang sesuai mode
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "-3px 0 8px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        {/* Dark Mode Toggle */}
        <div>
          <h2>⚙️ Pengaturan</h2>
          <div>
            <label>
              <input
                type="checkbox"
                checked={dark}
                onChange={() => {
                  toggleDark(!dark); // Toggle dark mode
                  localStorage.setItem("darkMode", !dark ? "true" : "false"); // Simpan mode
                }}
              />{" "}
              {dark ? "🌙 Mode Gelap" : "🌞 Mode Terang"}
            </label>
          </div>

          {/* Statistik Pengunjung */}
          <h3 style={{ fontSize: "16px", marginTop: "20px" }}>📈 Statistik Pengunjung</h3>
          <p>Hari Ini: <b>{stats.daily}</b></p>
          <p>Minggu Ini: <b>{stats.weekly}</b></p>
          <p>Total: <b>{stats.total}</b></p>
          <div style={{ marginTop: "10px" }}>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tombol Login/Logout */}
        <div>
          {!isLoggedIn ? (
            <button
              onClick={() => setShowLogin(true)}
              style={{
                color: "#fff",
                display: "block",
                padding: "12px",
                background: "#5e3ea1",
                borderRadius: "6px",
                textAlign: "center",
                width: "100%",
              }}
            >
              🔐 Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                color: "#fff",
                display: "block",
                padding: "12px",
                background: "#e74c3c",
                borderRadius: "6px",
                textAlign: "center",
                width: "100%",
              }}
            >
              🚪 Logout
            </button>
          )}

          {/* LoginSheet hanya muncul saat showLogin true */}
          {showLogin && (
            <LoginSheet
              onClose={() => {
                setShowLogin(false);
                onClose(); // Menutup sidebar ketika login sheet aktif
              }}
              onLogin={handleLoginSuccess} // Menandakan login berhasil
            />
          )}
        </div>
      </div>
    </div>
  );
}
