import Sidebar from "./Sidebar";
import Player from "./Player";
import Header from "./Header";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: JSX.Element }) {
  const { data: session } = useSession();

  const hasSession = !!session;

  return (
    <>
      <div className="h-screen overflow-hidden bg-black">
        <main className="flex">
          {hasSession && (
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
