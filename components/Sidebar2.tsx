import { LibraryIcon, SearchIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useQuery } from "react-query";

const Sidebar = () => {
  const { data: session } = useSession();

  const playlistsQuery = useQuery<{ playlists: SpotifyApi.PlaylistObjectSimplified[] }>(
    ["playlists", session?.user.accessToken],
    ({ queryKey: [_, accessToken] }) => {
      return fetch(`/api/playlists?accessToken=${accessToken}`).then(
        (response) => response.json()
      );
    }
  );

  if (!playlistsQuery.data) {
    return <div>Loading ...</div>;
  }


  return (
    <div className="h-screen p-5 overflow-y-scroll text-xs text-gray-500 pb-36">
      <div className="space-y-4">
        <Link href="/search" >
          <a className="flex items-center space-x-2 hover:text-white">
            <SearchIcon className="w-5 h-5" />
            <p>Search</p>
          </a>
        </Link>
        <Link href="/library" >
          <a className="flex items-center space-x-2 hover:text-white">
            <LibraryIcon className="w-5 h-5" />
            <p>Your Library</p>
          </a>
        </Link>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlistsQuery.data.playlists.map((playlist) => (
          <Link key={playlist.id} href={`/playlists/${playlist.id}`} >
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
