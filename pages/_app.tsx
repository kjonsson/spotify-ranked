import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SpotifyProvider } from "../hooks/useSpotify";
import Layout from "../components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const client = new QueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        <SpotifyProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SpotifyProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
