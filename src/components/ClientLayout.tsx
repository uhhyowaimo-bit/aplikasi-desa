'use client';
import { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import LoginSheet from "@/components/LoginSheet";
import { useAppContext } from "@/context/AppContext";
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable'; // ⬅️ types dari lib
import LogoAndDate from "@/components/LogoAndDate";

const DRAG_THRESHOLD = 10; // px

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { dark } = useAppContext();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLButtonElement | null>(null);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // toggle sidebar hanya kalau BUKAN drag
  const handleIconClick = () => {
    if (isDragging) return;
    setSidebarOpen((v) => !v);
  };

  const onStart = (_e: DraggableEvent, data: DraggableData) => {
    dragStart.current = { x: data.x, y: data.y };
    setIsDragging(true);
  };

  const onStop = (_e: DraggableEvent, data: DraggableData) => {
    const dx = data.x - dragStart.current.x;
    const dy = data.y - dragStart.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // kalau gerak < threshold, anggap klik (biar nyaman di laptop/pc)
    if (dist < DRAG_THRESHOLD) {
      setIsDragging(false);
      setSidebarOpen((v) => !v);
      return;
    }

    // benar2 drag → jangan buka sidebar
    setIsDragging(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    window.location.reload();
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
        <LogoAndDate />
      </header>

      {/* BURGER BUTTON (Draggable) */}
      {!showLogin && !sidebarOpen && (
        <Draggable nodeRef={dragRef} onStart={onStart} onStop={onStop} bounds="body">
          <button
            ref={dragRef}
            onClick={handleIconClick}
            style={{
              position: "fixed",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2000,
              background: dark ? "#444" : "#6a11cb",
              color: "#fff",
              border: "none",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            aria-label="Open sidebar"
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
