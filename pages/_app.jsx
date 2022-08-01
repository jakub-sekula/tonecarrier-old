import "../styles/globals.css";
import { Layout } from "../components/Layout";
import { AuthProvider } from "../components/contexts/AuthContext";
import App from "next/app";
import { useEffect } from "react";


function MyApp({ Component, pageProps, ...props }) {

  return (
    <AuthProvider>
      <Layout title={pageProps.title}>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
