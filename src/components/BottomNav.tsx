'use client';
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext"; // Mengambil nilai dark mode

export default function BottomNav() {
  const pathname = usePathname();
  const { dark } = useAppContext(); // Mendapatkan status dark mode

  const menu = [
    { href: "/maintenance", label: "Beranda", icon: "🏠" },
    { href: "/maintenance", label: "Layanan Desaku", icon: "📄" },
    { href: "/profil-desa", label: "Profil Desa", icon: "🏡" },
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
        background: dark ? "#333" : "#ffffff", // Menggunakan dark mode untuk latar belakang
        color: dark ? "#fff" : "#111", // Menyesuaikan warna teks
        borderRadius: "15px",
        boxShadow: dark ? "0 4px 12px rgba(0,0,0,0.6)" : "0 4px 12px rgba(0,0,0,0.2)", // Menyesuaikan shadow dengan mode
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center", // Menyelaraskan item vertikal di tengah
        padding: "10px 0",
        zIndex: 1000,
      }}
    >
      {menu.map((item, index) => (
        <a
          key={item.href + index}  // Menambahkan index untuk memastikan key unik
          href={item.href}
          style={{
            textAlign: "center",
            textDecoration: "none",
            color: pathname === item.href ? "#5B2C91" : dark ? "#bbb" : "#555", // Menyesuaikan warna link
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
