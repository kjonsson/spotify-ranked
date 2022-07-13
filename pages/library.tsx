import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex">
        <Sidebar></Sidebar>
        <h1 className="text-white">Your Library</h1>
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Home;
