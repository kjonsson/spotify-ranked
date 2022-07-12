import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import sample from "lodash/sample";
import useSpotify from "../hooks/useSpotifyApi";
import Songs from "./Songs";
import useBackgroundColor from "../hooks/useBackgroundColor";

const Center = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const color = useBackgroundColor(playlistId);

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
    <div className="flex-grow h-screen overflow-y-scroll">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={session?.user?.image ?? ""}
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`w-full flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img className="shadow-2xl h-44 w-44" src={playlist?.images[0].url} />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
