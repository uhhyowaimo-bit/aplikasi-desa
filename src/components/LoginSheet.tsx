"use client";
import { useState } from "react";

interface LoginSheetProps {
  onClose: () => void;
  onLogin: () => void; // Properti untuk menangani login sukses
}

export default function LoginSheet({ onClose, onLogin }: LoginSheetProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fungsi untuk menangani form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi login
    if (username === "admin" && password === "admin123") {
      // Simpan status login ke localStorage
      localStorage.setItem("isLoggedIn", "true");

      // Tutup sheet setelah login
      onClose();

      // Panggil onLogin untuk memberitahu parent bahwa login berhasil
      onLogin();

      // Refresh halaman setelah login berhasil
      window.location.reload();  // Halaman akan di-refresh setelah login
    } else {
      setError("Username atau password salah.");
    }
  };

  // Fungsi untuk menangani tombol Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          bottom: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "400px",
          background: "#fff",
          zIndex: 2000,
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
          padding: "20px",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Login Admin</h3>
        {error && <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              display: "block",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              display: "block",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#5B2C91",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}