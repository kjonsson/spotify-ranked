import SpotifyWebApi from "spotify-web-api-node";

const scope = [
  "playlist-read-private",
  "streaming",
  "user-read-currently-playing",
  "user-read-playback-position",
  "user-read-playback-state",
  "user-library-read",
].join(",");

const params = {
  scope,
};

const queryParams = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };

export const createSpotifyApi = (accessToken: string) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  });

  spotifyApi.setAccessToken(accessToken);

  return spotifyApi;
};
