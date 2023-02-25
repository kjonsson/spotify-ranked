import { useSpotify } from '../hooks/useSpotify';
import { millisecondsToMinutesAndSeconds } from '../utils/time';
import BlurImage from './BlurImage';

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
            className="flex  select-none justify-between rounded-lg px-5 py-4 text-gray-500 hover:bg-[#282828]"
        >
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <div className="w-10 h-10">
                    <BlurImage imageSrc={track.album?.images[0]?.url} />
                </div>
                <div>
                    <p className="text-white truncate w-36 lg:w-64">
                        {track?.name}
                    </p>
                    <p className="w-40 truncate">{subtitle}</p>
                </div>
            </div>

            <div className="flex w-[500px] items-center justify-between">
                <p className="w-40">{track?.popularity}</p>
                <p className="w-40">{album?.name ?? null}</p>
                <p className="pr-10">
                    {millisecondsToMinutesAndSeconds(track?.duration_ms || 0)}
                </p>
            </div>
        </div>
    );
};

export default Song;
