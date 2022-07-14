import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useSongInfo from "./useSongInfo";
import useSpotifyApi from "./useSpotifyApi";

type SpotifyContextType = {
  isPlaying: boolean;
  playlist: SpotifyApi.SinglePlaylistResponse | null;
  playlists: SpotifyApi.PlaylistObjectSimplified[] | null;
  playlistId: string | null;
  volume: number;
  currentTrackId: null | string;
  selectPlaylist: (id: string) => void;
  togglePlayPause: () => void;
  changeVolume: (volume: number) => void;
  playSong: (track: SpotifyApi.PlaylistTrackObject) => void;
};

const context = createContext<SpotifyContextType>({
  isPlaying: false,
  playlist: null,
  playlists: null,
  playlistId: null,
  volume: 50,
  currentTrackId: null,
  selectPlaylist: () => {},
  togglePlayPause: () => {},
  changeVolume: () => {},
  playSong: () => {},
});

export default context;

export const SpotifyProvider = ({ children }: { children: JSX.Element }) => {
  const [playlistId, setPlaylistId] = useState<null | string>(null);
  const [playlist, setPlaylist] =
    useState<null | SpotifyApi.SinglePlaylistResponse>(null);
  const [playlists, setPlaylists] = useState<
    null | SpotifyApi.PlaylistObjectSimplified[]
  >(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<null | string>(null);

  const spotifyApi = useSpotifyApi();
  const { data: session } = useSession();
  const songInfo = useSongInfo();
  const [volume, setVolume] = useState<number>(50);
  const router = useRouter();

  useEffect(() => {
    if (router.query.playlistId) {
      setPlaylistId(router.query.playlistId?.toString());
    }
  }, [router.query.playlistId]);

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
    router.push(`/playlists/${id}`);
  };

  const accessToken = spotifyApi.getAccessToken();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !!playlistId) {
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
      console.log("data", data);
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const playSong = (track: SpotifyApi.PlaylistTrackObject) => {
    if (!track?.track?.id || !track?.track.uri) {
      console.log(
        "unable to play due to missing id",
        track.track?.id,
        track.track?.uri
      );
      return;
    }

    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track?.uri],
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
        currentTrackId,
        selectPlaylist,
        togglePlayPause,
        changeVolume,
        playSong,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useSpotify = () => useContext(context);
