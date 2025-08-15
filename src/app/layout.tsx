import { AppProvider } from "@/context/AppContext"; // Import AppProvider
import ClientLayout from "@/components/ClientLayout"; // Import ClientLayout

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <title>Aplikasi Desa</title>
      </head>
      <body>
        <AppProvider>
          <ClientLayout>{children}</ClientLayout>
        </AppProvider>
      </body>
    </html>
  );
}
