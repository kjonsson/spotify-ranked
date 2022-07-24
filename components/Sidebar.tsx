import { LibraryIcon, SearchIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSpotify } from "../hooks/useSpotify";

const Sidebar = () => {
  const { playlists } = useSpotify();

  return (
    <div className="h-screen p-5 overflow-y-scroll text-xs text-gray-500 pb-36">
      <div className="space-y-4">
        <Link href="/search" prefetch>
          <a className="flex items-center space-x-2 hover:text-white">
            <SearchIcon className="w-5 h-5" />
            <p>Search</p>
          </a>
        </Link>
        <Link href="/library" prefetch>
          <a className="flex items-center space-x-2 hover:text-white">
            <LibraryIcon className="w-5 h-5" />
            <p>Your Library</p>
          </a>
        </Link>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists?.map((playlist) => (
          <Link href={`/playlists/${playlist.id}`} prefetch>
            <a className="flex items-center space-x-2 hover:text-white">
              <p>{playlist.name}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
