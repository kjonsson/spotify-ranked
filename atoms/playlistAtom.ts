import { atom } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "42kLXH7WausmW027Yr6bbP",
});

export const playlistState = atom({
  key: "playlistState",
  default: null as null | SpotifyApi.SinglePlaylistResponse,
});

export const playlistsState = atom({
  key: "playlistsState",
  default: null as null | SpotifyApi.PlaylistObjectSimplified[],
});
