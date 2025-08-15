import React, { createContext, useState, useContext, ReactNode } from "react";

interface AppContextType {
  dark: boolean;
  toggleDark: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState(false); // Default state

  const toggleDark = (value: boolean) => {
    setDark(value);
    localStorage.setItem("darkMode", value.toString()); // Save to localStorage
  };

  return (
    <AppContext.Provider value={{ dark, toggleDark }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
