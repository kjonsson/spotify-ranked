import Sidebar from './Sidebar';
import Header from './Header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: JSX.Element }) {
    const { data: session } = useSession();
    const { pathname } = useRouter();

    const hasSession = !!session;

    const hasSidebar = !pathname.includes('login');

    return (
        <>
            <div className="h-screen overflow-hidden bg-black">
                <main className="flex h-screen">
                    {hasSidebar && (
                        <div className="h-screen">
                            <Sidebar></Sidebar>
                        </div>
                    )}
                    <div className="relative flex-grow bg-zinc-900">
                        {hasSession && <Header />}
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
