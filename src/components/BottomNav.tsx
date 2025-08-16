"use client";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const menu = [
    { href: "/beranda", label: "Beranda", icon: "🏠" },
    { href: "/layanan-informasi", label: "Layanan Desaku", icon: "📄" },
    { href: "/maintenance", label: "Profil Desa", icon: "🏡" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "0",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "500px", // Batas lebar maksimum untuk bottom nav
        background: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center", // Menyelaraskan item vertikal di tengah
        padding: "10px 0",
        zIndex: 1000,
      }}
    >
      {menu.map((item) => (
        <a
          key={item.href}
          href={item.href}
          style={{
            textAlign: "center",
            textDecoration: "none",
            color: pathname === item.href ? "#5B2C91" : "#555",
            fontWeight: pathname === item.href ? "bold" : "normal",
            fontSize: "14px",
            display: "flex", 
            flexDirection: "column", // Menyusun icon dan label secara vertikal
            alignItems: "center", 
          }}
        >
          <div style={{ fontSize: "22px", marginBottom: "5px" }}>{item.icon}</div> {/* Memberikan jarak antara icon dan label */}
          <div>{item.label}</div>
        </a>
      ))}
    </nav>
  );
}
