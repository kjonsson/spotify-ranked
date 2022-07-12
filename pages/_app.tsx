import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { SpotifyProvider } from "../hooks/useSpotify";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <SpotifyProvider>
          <Component {...pageProps} />
        </SpotifyProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
