"use client";
import { useState, useEffect, useRef } from "react"; // <-- Tambahkan useRef di sini
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
  const sidebarRef = useRef<HTMLDivElement>(null); // <-- Menggunakan useRef
  const { dark, lang } = useAppContext();
  const [stats, setStats] = useState({ daily: 0, weekly: 0, total: 0 });
  const [chartData, setChartData] = useState([
    { day: "Sen", visitors: 0 },
    { day: "Sel", visitors: 0 },
    { day: "Rab", visitors: 0 },
    { day: "Kam", visitors: 0 },
    { day: "Jum", visitors: 0 },
    { day: "Min", visitors: 0 },
  ]);
  const [selectedColor, setSelectedColor] = useState("#432874"); // Default color

  // Fungsi untuk menangani klik di luar sidebar dan ESC
  useEffect(() => {
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

  // Mengecek status login saat komponen dimuat
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus); // Update status login
  }, []);

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

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    // Update global CSS variable
    document.documentElement.style.setProperty("--primary-color", newColor);
  };

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
          background: dark ? "#333" : "#432874", // Dark mode pada sidebar
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "-3px 0 8px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        <h3>⚙️ Pengaturan</h3>
        <div style={{ marginBottom: "20px" }}>
          <p>Statistik Pengunjung</p>
          <p>Hari Ini: <b>{stats.daily}</b></p>
          <p>Minggu Ini: <b>{stats.weekly}</b></p>
          <p>Total: <b>{stats.total}</b></p>
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

        <div>
          <button
            onClick={handleLoginSuccess}
            style={{
              backgroundColor: "#5e3ea1",
              color: "#fff",
              padding: "12px",
              borderRadius: "6px",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
