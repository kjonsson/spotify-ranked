import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { SpotifyProvider } from "../hooks/useSpotify";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <SpotifyProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SpotifyProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
