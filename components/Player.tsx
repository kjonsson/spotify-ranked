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

function isTrackObjectFull(data: any): data is SpotifyApi.TrackObjectFull {
    return (data as SpotifyApi.TrackObjectFull).album !== undefined;
}

const Player = () => {
    const { volume, changeVolume, togglePlayPause } = useSpotify();

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
                            <img
                                className="w-10 h-10 md:inline"
                                src={songInfo?.album?.images?.[0].url}
                            />
                            <div>
                                <h3>{songInfo?.name}</h3>
                                <p>{songInfo?.artists?.[0].name}</p>
                            </div>
                        </>
                    )}
            </div>

            <div className="flex items-center justify-evenly">
                <BackwardIcon className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125" />
                {!!currentPlayingTrack && currentPlayingTrack.is_playing ? (
                    <button
                        onClick={() => pause()}
                        disabled={controlStatus === 'loading'}
                    >
                        <PauseIcon className="w-10 h-10 transition duration-100 ease-out transform cursor-pointer hover:scale-125" />
                    </button>
                ) : (
                    <button
                        onClick={() => play()}
                        disabled={controlStatus === 'loading'}
                    >
                        <PlayIcon className="w-10 h-10 transition duration-100 ease-out transform cursor-pointer hover:scale-125" />
                    </button>
                )}
                <ForwardIcon className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125" />
            </div>

            <div className="flex items-center justify-end space-x-3 md:space-x-4">
                <SpeakerXMarkIcon
                    onClick={() => volume > 0 && changeVolume(volume - 10)}
                    className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125"
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
                    className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125"
                />
            </div>
        </div>
    );
};

export default Player;
