import { AppProvider } from "@/context/AppContext"; // Import AppProvider
import ClientLayout from "@/components/ClientLayout"; // Import ClientLayout

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <title>Aplikasi Desa</title> {/* Menambahkan title untuk aplikasi */}
      </head>
      <body>
        <AppProvider> {/* Membungkus aplikasi dengan AppProvider */}
          <ClientLayout>{children}</ClientLayout> {/* Konten halaman akan berada di sini */}
        </AppProvider>
      </body>
    </html>
  );
}
