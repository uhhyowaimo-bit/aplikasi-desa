// src/app/layout.tsx
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Tampilan layout global Anda */}
      <header>
        <h1>Welcome to Aplikasi Desa</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
