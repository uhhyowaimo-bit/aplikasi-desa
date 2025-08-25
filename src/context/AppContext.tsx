'use client';

import { createContext, useState, useContext, useEffect } from "react";

// Definisikan tipe untuk konteks kita
interface AppContextType {
  dark: boolean;
  toggleDark: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);

  // Mengambil state dari localStorage saat aplikasi dimuat
  useEffect(() => {
    const savedDark = localStorage.getItem("dark") === "true";
    setDark(savedDark);
  }, []);

  // Menyimpan perubahan di localStorage
  useEffect(() => {
    localStorage.setItem("dark", dark.toString());
    
    // Mengubah kelas 'dark-mode' atau 'light-mode' pada html
    if (dark) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [dark]);

  // Toggle dark mode
  const toggleDark = () => setDark((prev) => !prev);

  return (
    <AppContext.Provider value={{ dark, toggleDark }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
