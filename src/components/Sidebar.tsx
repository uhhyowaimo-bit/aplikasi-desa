"use client";

import { useState, useEffect, FC } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import LoginSheet from "@/components/LoginSheet"; // Import LoginSheet

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setDarkMode: (value: boolean) => void; // Terima props setDarkMode
  isLoggedIn: boolean;
  setShowLogin: (value: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, setDarkMode, isLoggedIn, setShowLogin }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
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
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    setIsDarkMode(false);
    setDarkMode(false); // Update global dark mode state
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  if (!isOpen) return null; // Do not render sidebar if not open

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
        style={{
          height: "100%",
          width: "300px",
          background: isDarkMode ? "#333" : "#432874",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "-3px 0 8px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        {/* Dark mode toggle */}
        <button
          onClick={() => {
            setIsDarkMode(!isDarkMode);
            setDarkMode(!isDarkMode); // Update global dark mode state
          }}
          style={{
            fontSize: "24px",
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {isDarkMode ? "🌙" : "🌞"}
        </button>

        {/* Statistik Pengunjung */}
        <h3>📈 Statistik Pengunjung</h3>
        <p>Hari Ini: <b>{stats.daily}</b></p>
        <p>Minggu Ini: <b>{stats.weekly}</b></p>
        <p>Total: <b>{stats.total}</b></p>

        {/* Grafik Pengunjung */}
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

        {/* Login/Logout */}
        <div>
          {!isLoggedIn ? (
            <button
              onClick={() => setShowLogin(true)} // Show Login Form
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
        </div>

        {/* LoginSheet */}
        {setShowLogin && (
          <LoginSheet
            onClose={() => {
              setShowLogin(false);
              onClose(); // Close sidebar after login
            }}
            onLogin={() => { setIsLoggedIn(true); }} // Handle login success
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
