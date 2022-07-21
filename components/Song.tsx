import { useSpotify } from "../hooks/useSpotify";
import { millisecondsToMinutesAndSeconds } from "../utils/time";

const Song = ({
  order,
  track,
  album,
  subtitle,
}: {
  order: number;
  track: SpotifyApi.TrackObjectFull;
  album?: SpotifyApi.AlbumObjectSimplified;
  subtitle: string;
}) => {
  const { playSong } = useSpotify();

  return (
    <div
      onDoubleClick={() => playSong(track)}
      className="flex justify-between px-5 py-4 text-gray-500 rounded-lg hover:bg-gray-900"
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="w-10 h-10" src={track.album?.images[0]?.url} />
        <div>
          <p className="text-white truncate w-36 lg:w-64">{track?.name}</p>
          <p className="w-40 truncate">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden w-40 md:inline">{track?.popularity}</p>
        <p className="hidden w-40 md:inline">{album?.name ?? null}</p>
        <p>{millisecondsToMinutesAndSeconds(track?.duration_ms || 0)}</p>
      </div>
    </div>
  );
};

export default Song;
