"use client"; // Tambahkan ini di bagian atas

import { createContext, useContext, useState, ReactNode } from "react";

// Mendefinisikan tipe untuk Context
interface AppContextProps {
  rtl: boolean;
  dark: boolean;
  lang: string;
  toggleRtl: () => void;
  toggleDark: () => void;
  toggleLang: () => void;
}

// Membuat Context
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Hook untuk mengakses AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Menyediakan context untuk aplikasi
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState(false); // Status dark mode
  const [rtl, setRtl] = useState(false); // Status RTL
  const [lang, setLang] = useState("id"); // Status bahasa

  // Toggle Dark mode
  const toggleDark = () => {
    setDark((prev) => !prev);
    document.documentElement.classList.toggle("dark", !dark); // Toggle class dark di root
  };

  // Toggle RTL
  const toggleRtl = () => {
    setRtl((prev) => !prev);
    document.documentElement.setAttribute("dir", rtl ? "ltr" : "rtl");
  };

  // Toggle bahasa
  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  return (
    <AppContext.Provider value={{ dark, rtl, lang, toggleDark, toggleRtl, toggleLang }}>
      {children}
    </AppContext.Provider>
  );
};
