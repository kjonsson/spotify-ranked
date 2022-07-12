import { HomeIcon, LibraryIcon, SearchIcon } from "@heroicons/react/outline";
import { useSpotify } from "../hooks/useSpotify";

const Sidebar = () => {
  const { playlists, selectPlaylist } = useSpotify();

  return (
    <div className="pb-36 h-screen p-5 overflow-y-scroll text-xs text-gray-500 lg:text-sm sm:max-w-[12rem lg:max-w-[15rem]">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists?.map((playlist) => (
          <p
            className="cursor-pointer hover:text-white"
            key={playlist.id}
            onClick={() => {
              selectPlaylist(playlist.id);
            }}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
