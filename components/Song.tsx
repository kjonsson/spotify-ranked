import { useSession } from 'next-auth/react';
import { useMutation } from 'react-query';
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
    const { data: session } = useSession();

    const playMutation = useMutation(
        async ({
            accessToken,
            trackUri,
        }: {
            accessToken: string;
            trackUri: string;
        }) => {
            const res = await fetch(
                `/api/playback/play?accessToken=${accessToken}&trackUri=${trackUri}`
            );
            return await res.json();
        }
    );

    return (
        <div
            onDoubleClick={() =>
                playMutation.mutate({
                    trackUri: track.uri,
                    accessToken: session?.user.accessToken ?? '',
                })
            }
            className="flex  select-none justify-between rounded-lg px-5 py-4 text-gray-500 hover:bg-[#282828]"
        >
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <div className="h-10 w-10">
                    <BlurImage imageSrc={track.album?.images[0]?.url} />
                </div>
                <div>
                    <p className="w-36 truncate text-white lg:w-64">
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
