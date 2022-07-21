import Sidebar from "./Sidebar";
import Player from "./Player";
import Header from "./Header";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <div className="h-screen overflow-hidden bg-black">
        <main className="flex">
          <div className="w-[200px]">
            <Sidebar></Sidebar>
          </div>
          <div className="w-full">
            <Header />
            {children}
          </div>
        </main>

        <div className="sticky bottom-0">
          <Player />
        </div>
      </div>
    </>
  );
}
