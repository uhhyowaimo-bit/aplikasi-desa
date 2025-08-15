import React from "react";
import { AppContextProvider } from "@/context/AppContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      <html lang="id">
        <head />
        <body>{children}</body>
      </html>
    </AppContextProvider>
  );
}
