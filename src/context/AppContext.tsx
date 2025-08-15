// src/context/AppContext.tsx

"use client"; // Pastikan kita menggunakan client-side

import React, { createContext, useState, useContext, useEffect } from "react";

// Membuat konteks untuk dark mode
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    setDark((prevDark) => {
      const newDark = !prevDark;
      localStorage.setItem("darkMode", newDark.toString());
      return newDark;
    });
  };

  return (
    <AppContext.Provider value={{ dark, toggleDark }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
