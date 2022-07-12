import {
  PlayIcon,
  FastForwardIcon,
  PauseIcon,
  RewindIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from "@heroicons/react/solid";
import useSongInfo from "../hooks/useSongInfo";
import { useSpotify } from "../hooks/useSpotify";

const Player = () => {
  const { isPlaying, volume, changeVolume, togglePlayPause } = useSpotify();

  const songInfo = useSongInfo();

  return (
    <div className="grid h-24 grid-cols-3 px-2 text-xs text-white md:text-base md:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="flex items-center space-x-4">
        <img
          className="w-10 h-10 md:inline"
          src={songInfo?.album?.images?.[0].url}
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <RewindIcon className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125" />
        {isPlaying ? (
          <PauseIcon
            onClick={togglePlayPause}
            className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125"
          />
        ) : (
          <PlayIcon
            onClick={togglePlayPause}
            className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125"
          />
        )}
        <FastForwardIcon className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125" />
      </div>

      <div className="flex items-center justify-end space-x-3 md:space-x-4">
        <VolumeOffIcon
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
        <VolumeUpIcon
          onClick={() => volume < 100 && changeVolume(volume + 10)}
          className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125"
        />
      </div>
    </div>
  );
};

export default Player;
