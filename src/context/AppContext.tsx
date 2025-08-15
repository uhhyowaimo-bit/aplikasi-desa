"use client"; // Tambahkan ini di bagian paling atas file

import React, { createContext, useState, useContext, useEffect } from "react";

// Rest of your AppContext code...
const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem("darkMode", newDark ? "true" : "false");
  };

  return (
    <AppContext.Provider value={{ dark, toggleDark }}>
      {children}
    </AppContext.Provider>
  );
};
