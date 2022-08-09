import "../styles/globals.css";
import { Layout } from "../components/Layout";
import { AuthProvider } from "../components/contexts/AuthContext";
import { CartProvider } from "../components/contexts/CartContext";
import App from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps, ...props }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout title={pageProps.title}>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
