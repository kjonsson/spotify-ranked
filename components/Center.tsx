import { useSession } from "next-auth/react";
import Songs from "./Songs";
import useBackgroundColor from "../hooks/useBackgroundColor";
import { useSpotify } from "../hooks/useSpotify";

const Center = () => {
  const { playlist, playlistId } = useSpotify();
  const color = useBackgroundColor(playlistId ?? "");

  return (
    <div className="flex-grow h-screen overflow-y-scroll">
      <section
        className={`w-full flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img className="shadow-2xl h-44 w-44" src={playlist?.images[0]?.url} />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
