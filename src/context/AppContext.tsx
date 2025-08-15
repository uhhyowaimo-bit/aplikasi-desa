import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);

  // Mengambil mode gelap dari localStorage saat aplikasi dimuat
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDark(true);
    }
  }, []);

  // Fungsi untuk mengubah dark mode
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
