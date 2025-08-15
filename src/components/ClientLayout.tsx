"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import LoginSheet from "@/components/LoginSheet";
import { useAppContext } from "@/context/AppContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { dark } = useAppContext(); // Global dark mode context
  const [countdown, setCountdown] = useState("");
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(dark); // Local state for dark mode, initialize from context

  useEffect(() => {
    setMounted(true);
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }

    // Auto-set dark mode based on system preference
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(systemPreference); // Set dark mode based on system preference
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Countdown logic
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
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    setCountdown("");
    setDarkMode(false);
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
          background: darkMode ? "linear-gradient(90deg, #444, #555)" : "linear-gradient(90deg, #6a11cb, #2575fc)",
          color: darkMode ? "#fff" : "#111",
          padding: "10px 15px",
          borderRadius: "0 0 8px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
        <div style={{ textAlign: "right" }}>
          {mounted && (
            <>
              <p style={{ margin: 0, fontSize: "14px" }}>Proklamasi Kemerdekaan R.I.</p>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>{countdown}</p>
            </>
          )}
        </div>
      </header>

      {/* BURGER BUTTON */}
      {!showLogin && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            position: "fixed",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2000,
            background: darkMode ? "#444" : "#6a11cb",
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
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        setDarkMode={setDarkMode} 
        isLoggedIn={isLoggedIn} 
        setShowLogin={setShowLogin} 
      />

      {/* MAIN CONTENT */}
      <main
        style={{
          backgroundColor: darkMode ? "#111" : "#fff",
          color: darkMode ? "#fff" : "#111",
          padding: "20px",
        }}
      >
        {children}
      </main>

      {/* LOGIN SHEET */}
      {showLogin && <LoginSheet onClose={() => setShowLogin(false)} onLogin={() => setIsLoggedIn(true)} />}

      {/* BOTTOM NAV */}
      <BottomNav />

      {/* LOGOUT BUTTON */}
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
