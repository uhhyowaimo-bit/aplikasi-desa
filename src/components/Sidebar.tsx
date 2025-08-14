"use client";

import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import LoginSheet from "@/components/LoginSheet";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { dark, lang, toggleDark, toggleLang } = useAppContext();
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
  const [selectedColor, setSelectedColor] = useState("#432874");

  // Handle outside click and ESC key
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

  // Fetch visitor stats
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
        console.error("Failed to fetch data:", err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    window.location.reload();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
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
          background: "#432874",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "-3px 0 8px rgba(0,0,0,0.4)",
          overflow: "hidden",
          transform: "translateX(0)",
        }}
      >
        {/* Color Palette */}
        <div>
          <h3>Choose Color Palette</h3>
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            style={{ padding: "5px", cursor: "pointer" }}
          />
        </div>

        {/* Sidebar Content */}
        <div style={{ flex: 1, overflowY: "auto", marginBottom: "20px" }}>
          <h2>⚙️ {lang === "id" ? "Pengaturan" : "Settings"}</h2>
          <div>
            <label>
              <input type="checkbox" checked={dark} onChange={toggleDark} /> Dark Mode
            </label>
          </div>
          <div>
            Translate:
            <button onClick={toggleLang} style={{ marginLeft: "8px" }}>
              {lang.toUpperCase()}
            </button>
          </div>
          <div>
            <a href="/help" style={{ color: "#fff", textDecoration: "underline" }}>
              ❓ {lang === "id" ? "Bantuan" : "Help"}
            </a>
          </div>

          <h3 style={{ fontSize: "16px", marginTop: "20px" }}>
            📈 {lang === "id" ? "Statistik Pengunjung" : "Visitor Stats"}
          </h3>
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

        {/* Login/Logout Button */}
        <div>
          {!isLoggedIn ? (
            <button
              onClick={() => setShowLogin(true)}
              style={{
                color: "#fff",
                textDecoration: "none",
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
                textDecoration: "none",
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

          {/* LoginSheet */}
          {showLogin && (
            <LoginSheet
              onClose={() => {
                setShowLogin(false);
                onClose();
              }}
              onLogin={handleLoginSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}
