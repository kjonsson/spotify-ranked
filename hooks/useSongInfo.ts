import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

type SpotifyImageType = {
  url: string;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyTrackType = {
  album: {
    images?: SpotifyImageType[];
  };
  name?: string;
  artists?: SpotifyArtist[];
};

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState<null | SpotifyTrackType>(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      const trackInfo = await fetch(
        `https://api.spotify.com/v1/tracks/${currentTrackId}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        }
      ).then((res) => res.json() as Promise<SpotifyTrackType>);

      setSongInfo(trackInfo);
    };

    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
