import { AppProvider } from "@/context/AppContext"; // Pastikan pathnya benar

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
