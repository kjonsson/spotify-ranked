import { useSpotify } from "../hooks/useSpotify";
import { millisecondsToMinutesAndSeconds } from "../utils/time";

const Song = ({
  order,
  track,
}: {
  order: number;
  track: SpotifyApi.PlaylistTrackObject;
}) => {
  const { playSong } = useSpotify();

  return (
    <div
      onClick={() => playSong(track)}
      className="grid grid-cols-2 px-5 py-4 text-gray-500 rounded-lg hover:bg-gray-900"
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="w-10 h-10" src={track.track?.album?.images[0]?.url} />
        <div>
          <p className="text-white truncate w-36 lg:w-64">
            {track.track?.name}
          </p>
          <p className="w-40">{track.track?.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden w-40 md:inline">{track.track?.album.name}</p>
        <p>{millisecondsToMinutesAndSeconds(track.track?.duration_ms || 0)}</p>
      </div>
    </div>
  );
};

export default Song;
