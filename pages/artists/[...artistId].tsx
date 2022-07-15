import { ChevronDownIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "react-query";
import Song from "../../components/Song";
import useBackgroundColor from "../../hooks/useBackgroundColor";
import { useSpotify } from "../../hooks/useSpotify";

const ArtistsPage: NextPage = () => {
  const { data: session } = useSession();
  const { artistId, artistSongs } = useSpotify();
  const color = useBackgroundColor(artistId ?? "");

  const artistQuery = useQuery<{ tracks: SpotifyApi.TrackObjectFull[] }>(
    ["artists", artistId, session?.user.accessToken],
    ({ queryKey: [_, artistId, accessToken] }) => {
      return fetch(`/api/artists/${artistId}?accessToken=${accessToken}`).then(
        (response) => response.json()
      );
    }
  );

  if (!artistQuery.data) {
    return <div>Loading ...</div>;
  }

  console.log("artistQuery", artistQuery);

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
        <img
          className="shadow-2xl h-44 w-44"
          src={artistQuery.data?.tracks?.[0].album.images[0].url}
        />
        <div>
          <p>ARTIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">
            {artistQuery.data?.tracks?.[0].artists[0].name}
          </h1>
        </div>
      </section>

      <div>
        {artistQuery.data?.tracks?.map((song, i) => (
          <Song
            key={song.artists[0].name + song.name + i}
            track={song}
            order={i}
            subtitle={song.album.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;
