import React, { createContext, useState, useContext, ReactNode } from "react";

// Tipe untuk Context
interface AppContextType {
  dark: boolean;
  toggleDark: (value: boolean) => void;
}

// Membuat context dengan nilai default null
const AppContext = createContext<AppContextType | null>(null);

// Provider untuk AppContext
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState(false); // Status default untuk mode gelap

  const toggleDark = (value: boolean) => {
    setDark(value);
    localStorage.setItem("darkMode", value.toString()); // Simpan ke localStorage
  };

  return (
    <AppContext.Provider value={{ dark, toggleDark }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook untuk menggunakan context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
