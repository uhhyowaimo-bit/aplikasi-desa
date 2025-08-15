"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Membuat context
const AppContext = createContext(null);

// Provider untuk membungkus komponen
export const AppContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  const toggleDark = () => setDark((prevState) => !prevState);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDark(true);
    }
  }, []);

  return (
    <AppContext.Provider value={{ dark, toggleDark }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook untuk mengakses context
export const useAppContext = () => {
  return useContext(AppContext);
};
