import "../styles/globals.css";
import { Layout } from "../components/Layout";
import { AuthProvider, getUser } from "../components/contexts/AuthContext";
import App from "next/app";
import { useEffect } from "react";


function MyApp({ Component, pageProps, auth }) {

  return (
    <AuthProvider myAuth={auth}>
      <Layout title={pageProps.title}>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  let auth = await getUser(appContext.ctx)
  return { ...appProps, auth: auth }
}

export default MyApp;
