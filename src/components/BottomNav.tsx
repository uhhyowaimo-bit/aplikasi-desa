"use client";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const menu = [
    { href: "/beranda", label: "Beranda", icon: "🏠" },
    { href: "/layanan-informasi", label: "Layanan Desaku", icon: "📄" },
    { href: "/profil-desa", label: "Profil Desa", icon: "🏡" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "500px",
        background: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "space-around",
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
          }}
        >
          <div style={{ fontSize: "22px" }}>{item.icon}</div>
          <div>{item.label}</div>
        </a>
      ))}
    </nav>
  );
}
