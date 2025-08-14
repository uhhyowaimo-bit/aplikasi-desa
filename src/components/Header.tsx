"use client";

export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#5B2C91",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <img
        src="/logo.png"
        alt="Logo Desa"
        style={{ height: "40px", marginRight: "10px" }}
      />
      <div>
        <h2 style={{ margin: 0, fontSize: "20px" }}>Desa Kalosi Alau</h2>
        <p style={{ margin: 0, fontSize: "13px" }}>Kec. Dua Pitue</p>
      </div>
    </header>
  );
}
