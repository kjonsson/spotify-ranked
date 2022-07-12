import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import spotifyApi from "../lib/spotify";

const useSpotify = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    if (session.error === "RefreshAccessTokenError") {
      signIn();
    }

    spotifyApi.setAccessToken(session.user.accessToken);
  }, [session]);

  return spotifyApi;
};

export default useSpotify;

/*
  What do we want to have make
  - playlistIdState
  - playlistState
  - currentTrackIdState
  - isPlayingState

  - get playlist
  - getMyCurrentPlayingTrack
  - getMyCurrentPlaybackState
  - getUserPlaylists
*/
