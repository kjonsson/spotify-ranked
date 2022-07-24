import Sidebar from "./Sidebar";
import Player from "./Player";
import Header from "./Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: JSX.Element }) {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  console.log("layout session", session);

  const hasSession = !!session;

  const hasSidebar = !pathname.includes("login");

  return (
    <>
      <div className="h-screen overflow-hidden bg-black">
        <main className="flex">
          {hasSidebar && (
            <div className="w-[200px]">
              <Sidebar></Sidebar>
            </div>
          )}
          <div className="w-full">
            {hasSession && <Header />}
            {children}
          </div>
        </main>

        <div className="sticky bottom-0">{hasSession && <Player />}</div>
      </div>
    </>
  );
}
