import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout title={pageProps.title}>
      {/* <pre>
        {JSON.stringify(pageProps)}
      </pre> */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
