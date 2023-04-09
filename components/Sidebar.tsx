import {
    BuildingLibraryIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';

const Sidebar = () => {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const playlistsQuery = useQuery<{
        playlists: SpotifyApi.PlaylistObjectSimplified[];
    }>(
        ['playlists', session?.user.accessToken],
        ({ queryKey: [_, accessToken] }) => {
            return fetch(`/api/playlists?accessToken=${accessToken}`).then(
                (response) => response.json()
            );
        },
        {
            // refetchInterval: 5000,
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    );

    if (!playlistsQuery.data?.playlists) {
        return null;
    }

    return (
        <div
            className="relative z-50 min-h-0 w-0 md:flex md:min-h-screen md:w-auto"
            data-dev-hint="container"
        >
            <header
                className="relative z-50 flex justify-between text-gray-100 md:hidden"
                data-dev-hint="mobile menu bar"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <label
                    htmlFor="menu-open"
                    id="mobile-menu-button"
                    className="m-2 rounded-md p-2 hover:cursor-pointer hover:bg-gray-700 hover:text-white focus:outline-none"
                >
                    {menuOpen ? (
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
                    ) : (
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
                    )}
                </label>
            </header>

            <aside
                id="sidebar"
                className={`${
                    menuOpen ? 'translate-x-0' : '-translate-x-full'
                } z-2 absolute inset-y-0 left-0 min-w-[250px] transform overflow-y-auto bg-black pt-10 text-gray-100 transition duration-200 ease-in-out md:relative md:flex  md:translate-x-0 md:flex-col md:justify-between md:pt-0`}
            >
                <div className="flex flex-col">
                    <nav data-dev-hint="main navigation">
                        <div className="h-screen overflow-y-scroll pb-36 text-xs text-gray-500">
                            <div className="">
                                <Link
                                    href="/search"
                                    className="flex items-center py-3 pl-4 hover:text-white active:bg-gray-700"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                    <p className="pl-2">Search</p>
                                </Link>
                                <Link
                                    href="/library"
                                    className="2 flex items-center py-3 pl-4 hover:text-white active:bg-gray-700"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <BuildingLibraryIcon className="h-5 w-5" />
                                    <p className="pl-2">Your Library</p>
                                </Link>
                                <hr className="border-t-[0.1px] border-gray-900" />

                                {playlistsQuery.data.playlists.map(
                                    (playlist) => (
                                        <Link
                                            key={playlist.id}
                                            href={`/playlists/${playlist.id}`}
                                            className="2 flex items-center py-3 pl-4 hover:text-white active:bg-gray-700"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <p>{playlist.name}</p>
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
