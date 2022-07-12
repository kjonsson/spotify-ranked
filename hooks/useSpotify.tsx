import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  playlistIdState,
  playlistsState,
  playlistState,
} from "../atoms/playlistAtom";
import useSpotifyApi from "./useSpotifyApi";

type SpotifyContextType = {
  playlist: SpotifyApi.SinglePlaylistResponse | null;
  playlists: SpotifyApi.PlaylistObjectSimplified[] | null;
  playlistId: string | null;
  selectPlaylist: (id: string) => void;
};

const context = createContext<SpotifyContextType>({
  playlist: null,
  playlists: null,
  playlistId: null,
  selectPlaylist: () => {},
});

export default context;

export const SpotifyProvider = ({ children }: { children: JSX.Element }) => {
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [playlists, setPlaylists] = useRecoilState(playlistsState);

  const spotifyApi = useSpotifyApi();
  const { data: session } = useSession();

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

  return (
    <context.Provider
      value={{ playlist, playlistId, playlists, selectPlaylist }}
    >
      {children}
    </context.Provider>
  );
};

export const useSpotify = () => useContext(context);
