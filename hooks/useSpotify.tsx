import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  playlistIdState,
  playlistsState,
  playlistState,
} from "../atoms/playlistAtom";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "./useSongInfo";
import useSpotifyApi from "./useSpotifyApi";

type SpotifyContextType = {
  isPlaying: boolean;
  playlist: SpotifyApi.SinglePlaylistResponse | null;
  playlists: SpotifyApi.PlaylistObjectSimplified[] | null;
  playlistId: string | null;
  volume: number;
  selectPlaylist: (id: string) => void;
  togglePlayPause: () => void;
  changeVolume: (volume: number) => void;
};

const context = createContext<SpotifyContextType>({
  isPlaying: false,
  playlist: null,
  playlists: null,
  playlistId: null,
  volume: 50,
  selectPlaylist: () => {},
  togglePlayPause: () => {},
  changeVolume: () => {},
});

export default context;

export const SpotifyProvider = ({ children }: { children: JSX.Element }) => {
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [playlists, setPlaylists] = useRecoilState(playlistsState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const spotifyApi = useSpotifyApi();
  const { data: session } = useSession();
  const songInfo = useSongInfo();
  const [volume, setVolume] = useState<number>(50);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id ?? null);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  const selectPlaylist = (id: string) => {
    setPlaylistId(id);
  };

  const accessToken = spotifyApi.getAccessToken();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((error) =>
          console.log("Something went wrong fetching playlist", error)
        );
    }
  }, [accessToken, spotifyApi, playlistId]);

  const togglePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const changeVolume = (volume: number) => {
    setVolume(volume);
    debounceAdjustVolume(volume);
  };

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi
        .setVolume(volume)
        .catch((err) => console.log("err setting volume", err));
    }, 500),
    []
  );

  return (
    <context.Provider
      value={{
        isPlaying,
        playlist,
        playlistId,
        playlists,
        volume,
        selectPlaylist,
        togglePlayPause,
        changeVolume,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useSpotify = () => useContext(context);
