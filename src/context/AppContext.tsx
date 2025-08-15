import { AppContextProvider } from "@/context/AppContext"; // Sesuaikan path sesuai kebutuhan

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
