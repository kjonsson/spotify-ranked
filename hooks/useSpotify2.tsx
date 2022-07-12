import { createContext, useContext } from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";

type SpotifyContextType = {
  playlist: SpotifyApi.SinglePlaylistResponse | null;
};

const context = createContext<SpotifyContextType>({
  playlist: null,
});

export default context;

export const SpotifyProvider = ({ children }: { children: JSX.Element }) => {
  const playlist = useRecoilValue(playlistState);

  console.log("spot playlist", playlist);

  return <context.Provider value={{ playlist }}>{children}</context.Provider>;
};

export const useSpotify = () => useContext(context);
