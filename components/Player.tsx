import {
  PlayIcon,
  FastForwardIcon,
  PauseIcon,
  RewindIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id ?? null);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

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
          <PauseIcon className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125" />
        ) : (
          <PlayIcon className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125" />
        )}
        <FastForwardIcon className="w-5 h-5 transition duration-100 ease-out transform cursor-pointer hover:scale-125" />
      </div>
    </div>
  );
};

export default Player;
