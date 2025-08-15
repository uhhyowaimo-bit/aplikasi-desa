"use client";

import { useState, useEffect, FC } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setDarkMode: (value: boolean) => void;
  isLoggedIn: boolean;
  setShowLogin: (value: boolean) => void; // Passed setShowLogin from ClientLayout
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, setDarkMode, isLoggedIn, setShowLogin }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Local state for dark mode

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

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
        <div>
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              setDarkMode(!isDarkMode);
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
        </div>

        {/* Login/Logout buttons */}
        <div>
          {!isLoggedIn ? (
            <button
              onClick={() => setShowLogin(true)} // Use setShowLogin passed from ClientLayout
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
              onClick={() => {
                // Handle logout logic here
              }}
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
      </div>
    </div>
  );
};

export default Sidebar;
