import { useSpotify } from "../hooks/useSpotify";
import Song from "./Song";

const Songs = () => {
  const { playlist } = useSpotify();

  return (
    <div className="flex flex-col px-8 space-y-1 text-white pb-28">
      {playlist?.tracks.items.map((track, i) => {
        if (!track.track) {
          return null;
        }
        return (
          <Song
            key={playlist.id + i}
            track={track.track}
            order={i}
            album={track.track.album}
          />
        );
      })}
    </div>
  );
};

export default Songs;
