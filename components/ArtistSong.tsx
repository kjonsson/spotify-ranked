import { useSpotify } from "../hooks/useSpotify";
import Song from "./Song";

const ArtistSongs = () => {
  const { artistSongs } = useSpotify();

  return (
    <div className="flex flex-col px-8 space-y-1 text-white pb-28">
      {artistSongs &&
        artistSongs.map((track, i) => {
          return <Song key={"artist" + i} track={track} order={i} />;
        })}
    </div>
  );
};

export default ArtistSongs;
