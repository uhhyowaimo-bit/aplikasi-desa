import { AppContextProvider } from "@/context/AppContext"; // Import AppContextProvider
import ClientLayout from "@/components/ClientLayout"; // Import ClientLayout

function App() {
  return (
    <AppContextProvider>
      <ClientLayout>
        {/* Konten aplikasi */}
      </ClientLayout>
    </AppContextProvider>
  );
}

export default App;
