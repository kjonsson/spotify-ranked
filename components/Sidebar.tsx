import { LibraryIcon, SearchIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";

const Sidebar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const playlistsQuery = useQuery<{
    playlists: SpotifyApi.PlaylistObjectSimplified[];
  }>(
    ["playlists", session?.user.accessToken],
    ({ queryKey: [_, accessToken] }) => {
      return fetch(
        `/api/playlists?accessToken=${accessToken}`
      ).then((response) => response.json());
    }
  );

  if (!playlistsQuery.data) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="z-50 relative md:min-h-screen md:flex" data-dev-hint="container">
      <input type="checkbox" id="menu-open" className="hidden" />

      <label
        htmlFor="menu-open"
        className="bg-red-500 absolute right-2 bottom-2 shadow-lg rounded-full p-2 text-gray-600 md:hidden"
        data-dev-hint="floating action button"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>

      <header
        className="text-gray-100 flex justify-between md:hidden z-50 relative"
        data-dev-hint="mobile menu bar"
      >
        <label
          htmlFor="menu-open"
          id="mobile-menu-button"
          className="m-2 p-2 focus:outline-none hover:cursor-pointer hover:text-white hover:bg-gray-700 rounded-md"
        >
          <svg
            id="menu-open-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            id="menu-close-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </header>

      <aside
        id="sidebar"
        className="z-2 bg-black min-w-[250px] md:pt-0 pt-10 text-gray-100 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto"
      >
        <div className="flex flex-col space-y-6">
          <nav data-dev-hint="main navigation">
            <div className="h-screen p-5 overflow-y-scroll text-xs text-gray-500 pb-36">
              <div className="space-y-4">
                <Link href="/search">
                  <a className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="w-5 h-5" />
                    <p>Search</p>
                  </a>
                </Link>
                <Link href="/library">
                  <a className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="w-5 h-5" />
                    <p>Your Library</p>
                  </a>
                </Link>
                <hr className="border-t-[0.1px] border-gray-900" />

                {playlistsQuery.data.playlists.map((playlist) => (
                  <Link key={playlist.id} href={`/playlists/${playlist.id}`}>
                    <a className="flex items-center space-x-2 hover:text-white">
                      <p>{playlist.name}</p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
