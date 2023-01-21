import type { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Card from '../components/Card';
import { useSpotify } from '../hooks/useSpotify';

const Home: NextPage = () => {
    const { playSong, searchString, search, searchResult } = useSpotify();
    const router = useRouter();

    const { data: session } = useSession();

    const searchHistoryResponse = useQuery<{
        recentlyPlayedTracks: SpotifyApi.PlayHistoryObject[];
    }>(
        ['search', 'history', session?.user.accessToken],
        ({ queryKey: [_, __, accessToken] }) => {
            return fetch(`/api/search/history?accessToken=${accessToken}`).then(
                (response) => response.json()
            );
        }
    );

    if (!searchHistoryResponse.data) {
        return <div>Loading ...</div>;
    }

    return (
        <div className="w-full h-screen pl-4 text-white">
            <div className="p-5">
                <div className="relative z-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-1">
                        <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 border-none rounded-full bg-gray-50 placeholder:text-gray-500 focus:outline-none focus:ring-0 sm:w-96"
                        placeholder="Artist or song"
                        required
                        value={searchString}
                        onChange={(e) => search(e.target.value)}
                    />
                </div>
            </div>
            <div className="h-screen overflow-y-scroll">
                {!searchResult?.tracks &&
                    !!searchHistoryResponse?.data?.recentlyPlayedTracks && (
                        <div className="pb-24 mb-24">
                            <div className="py-5 cursor-default select-none">
                                <h2>Recently Played Songs</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                    {searchHistoryResponse.data.recentlyPlayedTracks.map(
                                        (track) => (
                                            <Card
                                                image={
                                                    track.track.album.images[0]
                                                        .url
                                                }
                                                title={track.track.name}
                                                subtitle={
                                                    track.track.artists[0].name
                                                }
                                                onClick={() => {
                                                    playSong(track.track);
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                <div className="pb-24 mb-24">
                    {!!searchResult?.tracks && (
                        <div className="py-5">
                            <h2>Songs</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                {searchResult.artists.items.map((artist) => (
                                    <Card
                                        image={artist?.images[0]?.url}
                                        title={artist.name}
                                        subtitle={'Artist'}
                                        onClick={() => {
                                            router.push(
                                                `/artists/${artist.id}`
                                            );
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};
