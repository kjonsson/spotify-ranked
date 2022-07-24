import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";
import useSpotifyApi from "./useSpotifyApi";

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
  const spotifyApi = useSpotifyApi();
  const { currentTrackId } = useSpotify();
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

    if (currentTrackId) {
      fetchSongInfo();
    }
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
