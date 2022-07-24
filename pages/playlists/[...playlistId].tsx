import { NextPage } from "next";
import Songs from "../../components/Songs";
import useBackgroundColor from "../../hooks/useBackgroundColor";
import { useSpotify } from "../../hooks/useSpotify";

const PlaylistPage: NextPage = () => {
  const { playlist, playlistId } = useSpotify();
  const color = useBackgroundColor(playlistId ?? "");

  if (!playlist) {
    return null;
  }

  return (
    <div className="flex-grow h-screen overflow-y-scroll">
      <section
        className={`w-full flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white p-8`}
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

export default PlaylistPage;
