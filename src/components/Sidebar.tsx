"use client";

import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import LoginSheet from "@/components/LoginSheet"; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FC } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setDarkMode: (value: boolean) => void; // Function to change dark mode
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, setDarkMode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Local state for dark mode

  // Apply dark mode to the whole page
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

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
    const interval = setInterval(fetchData, 30000); // Refresh data setiap 30 detik
    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = () => {
    // Handle login success
  };

  const handleLogout = () => {
    setIsDarkMode(false);
    setDarkMode(false); // Update global dark mode state
    window.location.reload(); // Refresh the page after logout
  };

  if (!isOpen) return null; // Do not render if sidebar is not open

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
          background: isDarkMode ? "#333" : "#432874", // Background color based on dark mode
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
        <div>
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={() => {
                setIsDarkMode(!isDarkMode); // Toggle local dark mode
                setDarkMode(!isDarkMode); // Update global dark mode context
              }}
              style={{
                fontSize: "24px",
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {isDarkMode ? "🌙" : "🌞"} {/* Toggle between moon and sun */}
            </button>
          </div>

          {/* Visitor Stats */}
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

        {/* Login/Logout buttons */}
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

          {showLogin && (
            <LoginSheet
              onClose={() => {
                setShowLogin(false);
                onClose(); // Close sidebar after login
              }}
              onLogin={handleLoginSuccess} // Handle login success
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
