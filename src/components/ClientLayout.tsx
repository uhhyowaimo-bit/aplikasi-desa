'use client';
import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import LoginSheet from "@/components/LoginSheet";
import { useAppContext } from "@/context/AppContext";
import Draggable from 'react-draggable';  // Import Draggable
import LogoAndDate from "@/components/LogoAndDate";  // Import LogoAndDate
import Countdown from "@/components/Countdown";  // Import Countdown

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { dark } = useAppContext();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [mounted, setMounted] = useState(false);

  const [dragging, setDragging] = useState(false);  // State untuk mendeteksi apakah sedang di-drag
  const dragRef = useRef(null);  // Ref untuk elemen yang akan didrag

  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 }); // Track posisi awal drag
  const [dragThreshold, setDragThreshold] = useState(10); // Toleransi gerakan sebelum dianggap drag

  useEffect(() => {
    setMounted(true); // Set mounted menjadi true setelah komponen dimuat di client-side
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

 
  const handleLoginOpen = () => {
    setShowLogin(true);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    
    window.location.reload();
  };

  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => {
    if (!dragging) {  // Sidebar hanya muncul jika tidak sedang di-drag
      setSidebarOpen(!sidebarOpen);
    }
  };

  // Menggunakan event `onMouseDown` untuk PC dan `onTouchStart` untuk perangkat mobile
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.type === "mousedown") {
      setDragStartPosition({ x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY });
      setDragging(false);  // Reset drag status
    }
  };

  const handleDragStop = (e: React.MouseEvent | React.TouchEvent) => {
    const dragDistance = Math.sqrt(
      Math.pow((e as React.MouseEvent).clientX - dragStartPosition.x, 2) + Math.pow((e as React.MouseEvent).clientY - dragStartPosition.y, 2)
    );

    // Cek apakah drag lebih dari threshold
    if (dragDistance > dragThreshold) {
      setDragging(true);  // Jika lebih dari threshold, anggap sebagai drag
    } else {
      setDragging(false);  // Jika tidak, anggap sebagai klik
      toggleSidebar(); // Sidebar terbuka hanya jika tombol ditekan, bukan digerakkan
    }
  };

  return (
    <>
      {/* HEADER */}
      <header
        style={{
          border: "none", 
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: dark ? "linear-gradient(90deg, #444, #555)" : "linear-gradient(90deg, #6a11cb, #2575fc)",
          color: dark ? "#fff" : "#111",
          padding: "10px 15px",
          borderRadius: "0 0 8px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <LogoAndDate />  {/* Gunakan LogoAndDate di header */}
        <Countdown />  {/* Menampilkan Countdown */}
      </header>

      {/* BURGER BUTTON (Draggable) */}
      {!showLogin && !sidebarOpen && (
        <Draggable
          nodeRef={dragRef}
          onStart={handleDragStart}  // Menandakan mulai drag
          onStop={handleDragStop}   // Menandakan selesai drag
        >
          <button
            ref={dragRef}
            onClick={toggleSidebar}  // Sidebar hanya akan terbuka saat tombol ditekan
            style={{
              position: "fixed",  
              right: "20px",  
              top: "50%",  
              transform: "translateY(-50%)",  
              zIndex: 2000,
              background: dark ? "#444" : "#6a11cb",
              color: "#fff",
              border: "none",
              padding: "10px 15px",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
              cursor: "pointer",
              width: "40px",  
              height: "40px", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",  
            }}
          >
            🍔
          </button>
        </Draggable>
      )}

      {/* SIDEBAR */}
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      {/* MAIN CONTENT */}
      <main
        style={{
          backgroundColor: dark ? "#111" : "#fff",
          color: dark ? "#fff" : "#111",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",  
          flexGrow: 1,
          overflowX: "hidden", 
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

      {/* RESPONSIVE STYLES */}
      <style jsx>{`
        @media (min-width: 1024px) {
          header {
            padding: 20px;
          }

          main {
            padding: 40px;
          }

          button {
            width: auto;
            padding: 12px 20px;
          }
        }

        @media (max-width: 1024px) {
          header {
            padding: 15px;
          }

          main {
            padding: 30px;
          }

          button {
            width: 100%;
            padding: 12px;
          }
        }

        @media (max-width: 768px) {
          header {
            flex-direction: column;
            align-items: flex-start;
          }

          main {
            padding: 20px;
          }

          .sidebar {
            width: 100%;
          }

          button {
            width: 100%;
            padding: 12px;
          }
        }

        @media (max-width: 480px) {
          header {
            padding: 10px;
          }

          main {
            padding: 15px;
          }

          button {
            padding: 10px;
          }

          header img {
            width: 35px;
            height: 35px;
          }
        }
      `}</style>
    </>
  );
}
