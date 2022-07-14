import { ChevronDownIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Song from "../../components/Song";
import useBackgroundColor from "../../hooks/useBackgroundColor";
import { useSpotify } from "../../hooks/useSpotify";

const ArtistsPage: NextPage = () => {
  const { data: session } = useSession();
  const { artistId, artistSongs } = useSpotify();
  const color = useBackgroundColor(artistId ?? "");

  return (
    <div className="flex-grow h-screen overflow-y-scroll">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={session?.user?.image ?? ""}
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`w-full flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img className="shadow-2xl h-44 w-44" src={""} />
        <div>
          <p>ARTIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{""}</h1>
        </div>
      </section>

      <div>
        {artistSongs?.map((song, i) => (
          <Song track={song} order={i} />
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;
