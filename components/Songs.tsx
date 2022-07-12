import { useSpotify } from "../hooks/useSpotify2";
import Song from "./Song";

const Songs = () => {
  const { playlist } = useSpotify();

  console.log("playlist", playlist);
  return (
    <div className="flex flex-col px-8 space-y-1 text-white pb-28">
      {playlist?.tracks.items.map((track, i) => {
        return <Song key={track?.track?.id} track={track} order={i} />;
      })}
    </div>
  );
};

export default Songs;
