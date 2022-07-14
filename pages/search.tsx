import type { NextPage } from "next";
import Card from "../components/Card";
import { useSpotify } from "../hooks/useSpotify";

const Home: NextPage = () => {
  const { playSong, searchString, search, searchResult } = useSpotify();

  return (
    <div className="w-full h-screen p-2 overflow-y-scroll text-white">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div>
          <input
            type="search"
            id="default-search"
            className="block w-full max-w-sm p-3 pl-10 text-sm text-gray-900 border border-gray-300 border-none rounded-full bg-gray-50 focus:ring-0 focus:outline-none placeholder:text-gray-500"
            placeholder="Artist, Song, etc."
            required
            value={searchString}
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </div>
      <div className="pb-24 mb-24">
        {!!searchResult?.tracks && (
          <div className="py-5">
            <h2>Songs</h2>
            <div className="grid grid-cols-5">
              {searchResult.tracks.items.map((track) => (
                <Card
                  image={track.album.images[0].url}
                  title={track.name}
                  subtitle={track.artists[0].name}
                  onClick={() => {
                    playSong(track);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {!!searchResult?.artists && (
          <div className="py-5">
            <h2>Artists</h2>
            <div className="grid grid-cols-5">
              {searchResult.artists.items.map((artist) => (
                <Card
                  image={artist?.images[0]?.url}
                  title={artist.name}
                  subtitle={"Artist"}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
