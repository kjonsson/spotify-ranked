import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null as null | string,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
