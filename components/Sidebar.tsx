import { SearchIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSpotify } from "../hooks/useSpotify";

const Sidebar = () => {
  const { playlists, selectPlaylist } = useSpotify();

  return (
    <div className="h-screen p-5 overflow-y-scroll text-xs text-gray-500 pb-36">
      <div className="space-y-4">
        <Link href="/search">
          <a className="flex items-center space-x-2 hover:text-white">
            <SearchIcon className="w-5 h-5" />
            <p>Search</p>
          </a>
        </Link>
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
