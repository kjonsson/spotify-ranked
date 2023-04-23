import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const client = new QueryClient();

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={client}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
        </SessionProvider>
    );
}

export default MyApp;
