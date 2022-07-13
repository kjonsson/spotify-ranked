import Sidebar from "./Sidebar";
import Player from "./Player";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <div className="h-screen overflow-hidden bg-black">
        <main className="flex">
          <Sidebar></Sidebar>
          {children}
        </main>

        <div className="sticky bottom-0">
          <Player />
        </div>
      </div>
    </>
  );
}
