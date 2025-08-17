import { AppProvider } from "@/context/AppContext";
import ClientLayout from "@/components/ClientLayout";
import 'ol/ol.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <title>Aplikasi Desa</title>
      </head>
      <body
        style={{
          margin: 0,  // Menghapus margin pada body
          padding: 0, // Menghapus padding pada body
          border: "none",  // Menghapus border
          backgroundColor: "#111", // Set background default
        }}
      >
        <AppProvider>
          <ClientLayout>{children}</ClientLayout>
        </AppProvider>
      </body>
    </html>
  );
}
