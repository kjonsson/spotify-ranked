import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

const Home: NextPage = () => {
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

export default Home;

export async function getServerSideProps() {
  const session = await getSession();

  return {
    props: {
      session,
    },
  };
}
