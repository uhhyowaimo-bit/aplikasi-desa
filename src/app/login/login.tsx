"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Contoh login simple
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("role", "admin");
      router.push("/admin");
    } else if (username === "staff" && password === "staff123") {
      localStorage.setItem("role", "staff");
      router.push("/beranda");
    } else {
      alert("Username atau password salah");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#5B2C91", color: "#fff", border: "none", borderRadius: "5px" }}>
          Login
        </button>
      </form>
    </div>
  );
}
