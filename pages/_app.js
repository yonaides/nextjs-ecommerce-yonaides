import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import { DataProvider } from "../store/GlobalState";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);

  return (
    <DataProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        />
      </Head>

      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}
        strategy="beforeInteractive"
        onError={(e) => {
          console.error("Script paypal failed to load", e);
        }}
      ></Script>

      <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></Script>
      <Script src="https://kit.fontawesome.com/a076d05399.js"></Script>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}

export default MyApp;
