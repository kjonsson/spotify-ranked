import type { NextPage } from "next";
import Sidebar from "../../components/Sidebar";
import Center from "../../components/Center";
import Player from "../../components/Player";

const PlaylistPage: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex">
        <Sidebar></Sidebar>
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default PlaylistPage;
