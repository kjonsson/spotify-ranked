import Sidebar from "./Sidebar";
import Player from "./Player";
import Header from "./Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: JSX.Element }) {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  const hasSession = !!session;

  const hasSidebar = !pathname.includes("login");

  return (
    <>
      <div className="h-screen overflow-hidden bg-black">
        <main className="flex h-screen">
          {hasSidebar && (

              <Sidebar></Sidebar>

          )}
          <div className="w-full bg-black">
            {hasSession && <Header />}
            {children}
          </div>
        </main>

        <div className="sticky bottom-0">{hasSession && <Player />}</div>
      </div>
    </>
  );
}
