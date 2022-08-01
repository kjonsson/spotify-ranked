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
  playlists: SpotifyApi.PlaylistObjectSimplified[] | null;
  volume: number;
  currentTrackId: null | string;
  searchString: string;
  searchResult: null | SpotifyApi.SearchResponse;
  artistSongs: null | SpotifyApi.TrackObjectFull[];
  artistId: string | null;
  togglePlayPause: () => void;
  changeVolume: (volume: number) => void;
  playSong: (track: SpotifyApi.TrackObjectFull | null) => void;
  search: (searchString: string) => void;
};

const context = createContext<SpotifyContextType>({
  isPlaying: false,
  playlists: null,
  volume: 50,
  currentTrackId: null,
  searchString: "",
  searchResult: null,
  artistSongs: null,
  artistId: null,
  togglePlayPause: () => {},
  changeVolume: () => {},
  playSong: () => {},
  search: () => {},
});

export default context;

export const SpotifyProvider = ({ children }: { children: JSX.Element }) => {
  const [playlists, setPlaylists] = useState<
    null | SpotifyApi.PlaylistObjectSimplified[]
  >(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<null | string>(null);
  const [searchString, setSearchString] = useState<string>("");
  const [searchResult, setSearchResult] =
    useState<null | SpotifyApi.SearchResponse>({});
  const [artistId, setArtistId] = useState<null | string>(null);
  const [artistSongs, setArtistSongs] = useState<
    null | SpotifyApi.TrackObjectFull[]
  >(null);

  const spotifyApi = useSpotifyApi();
  const { data: session } = useSession();
  const songInfo = useSongInfo();
  const [volume, setVolume] = useState<number>(50);
  const router = useRouter();

  useEffect(() => {
    if (router.query.artistId) {
      setArtistId(router.query.artistId?.toString());
    }
  }, [router.query.artistId]);

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

  const accessToken = spotifyApi.getAccessToken();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !!artistId) {
      spotifyApi
        .getArtistAlbums(artistId)
        .then((data) => {
          const ids = data.body.items.flatMap((item) => item.id);
          return spotifyApi.getAlbums(ids);
        })
        .then((data) => {
          const ids = data.body.albums.flatMap((album) =>
            album.tracks.items.map((item) => item.id)
          );
          return Promise.all(
            ids.slice(0, 10).map((id) => spotifyApi.getTrack(id))
          );
        })
        .then((data) => {
          setArtistSongs(data.map((d) => d.body));
        })
        .catch((error) =>
          console.log("Something went wrong fetching artist songs", error)
        );
    }
  }, [accessToken, spotifyApi, artistId]);

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

  const playSong = (track: SpotifyApi.TrackObjectFull | null) => {
    if (!track) {
      return;
    }

    if (!track?.id || !track.uri) {
      console.log("unable to play due to missing id", track?.id, track?.uri);
      return;
    }

    spotifyApi
      .play({
        uris: [track?.uri],
      })
      .then(() => {
        setCurrentTrackId(track.id);
        setIsPlaying(true);
      })
      .catch((e) => {
        console.log("Error playing", e);
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

  const search = (searchString: string) => {
    if (searchString) {
      spotifyApi
        .search(searchString, ["album", "artist", "track"], { limit: 10 })
        .then((data) => {
          setSearchResult(data.body);
        });
    } else {
      setSearchResult({});
    }
    setSearchString(searchString);
  };

  return (
    <context.Provider
      value={{
        isPlaying,
        playlists,
        volume,
        currentTrackId,
        searchString,
        searchResult,
        artistSongs,
        artistId,
        togglePlayPause,
        changeVolume,
        playSong,
        search,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useSpotify = () => useContext(context);
