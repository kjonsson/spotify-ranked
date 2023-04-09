import {
    PlayIcon,
    ForwardIcon,
    PauseIcon,
    BackwardIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
} from '@heroicons/react/24/solid';
import { useSpotifyPlayback } from '../hooks/useSpotifyPlayback';
import { useSpotify } from '../hooks/useSpotify';
import BlurImage from './BlurImage';

function isTrackObjectFull(data: any): data is SpotifyApi.TrackObjectFull {
    return (data as SpotifyApi.TrackObjectFull).album !== undefined;
}

const Player = () => {
    const { volume, changeVolume } = useSpotify();

    const { playbackState, play, pause, controlStatus } = useSpotifyPlayback();

    const currentPlayingTrack = playbackState?.currentPlayingTrack;
    const songInfo = currentPlayingTrack?.item;

    console.log('songInfo', songInfo);

    return (
        <div className="grid h-24 grid-cols-3 bg-[#181818] px-2 text-xs text-white md:px-8 md:text-base">
            <div className="flex items-center space-x-4">
                {!!songInfo &&
                    isTrackObjectFull(songInfo) &&
                    songInfo?.album?.images?.[0].url && (
                        <>
                            <div className="h-10 w-10">
                                <BlurImage
                                    imageSrc={songInfo?.album?.images?.[0].url}
                                />
                            </div>
                            <div>
                                <h3>{songInfo?.name}</h3>
                                <p>{songInfo?.artists?.[0].name}</p>
                            </div>
                        </>
                    )}
            </div>

            <div className="flex items-center justify-evenly">
                <BackwardIcon className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />
                {!!currentPlayingTrack && currentPlayingTrack.is_playing ? (
                    <button
                        onClick={() => pause()}
                        disabled={controlStatus === 'loading'}
                    >
                        <PauseIcon className="h-10 w-10 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />
                    </button>
                ) : (
                    <button
                        onClick={() => play()}
                        disabled={controlStatus === 'loading'}
                    >
                        <PlayIcon className="h-10 w-10 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />
                    </button>
                )}
                <ForwardIcon className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />
            </div>

            <div className="flex items-center justify-end space-x-3 md:space-x-4">
                <SpeakerXMarkIcon
                    onClick={() => volume > 0 && changeVolume(volume - 10)}
                    className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
                />
                <input
                    className="w-14 md:w-28"
                    type="range"
                    value={volume}
                    min={0}
                    max={100}
                    onChange={(e) => changeVolume(Number(e.target.value))}
                />
                <SpeakerWaveIcon
                    onClick={() => volume < 100 && changeVolume(volume + 10)}
                    className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
                />
            </div>
        </div>
    );
};

export default Player;
