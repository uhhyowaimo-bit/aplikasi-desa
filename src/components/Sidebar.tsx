"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { dark } = useAppContext();

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "100%",
            backgroundColor: dark ? "#333" : "#fff", // Sesuaikan warna dengan dark mode
            color: dark ? "#fff" : "#111", 
            padding: "10px",
            boxShadow: "3px 0px 10px rgba(0, 0, 0, 0.3)",
            zIndex: 2000,
            transition: "transform 0.3s ease",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              color: dark ? "#fff" : "#111",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>

          {/* Sidebar content */}
          <div style={{ marginTop: "50px" }}>
            <h3>Menu</h3>
            {/* Sidebar items here */}
          </div>
        </div>
      )}
    </>
  );
}
