import type { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Card from '../components/Card';
import { LoadingPage } from '../components/Loading';

const Home: NextPage = () => {
    const router = useRouter();
    const [searchString, setSearchString] = useState<string | undefined>(
        undefined
    );

    const { data: session } = useSession();

    const playMutation = useMutation(
        async ({
            accessToken,
            trackUri,
        }: {
            accessToken: string;
            trackUri: string;
        }) => {
            const res = await fetch(
                `/api/playback/play?accessToken=${accessToken}&trackUri=${trackUri}`
            );
            return await res.json();
        }
    );

    const searchHistoryResponse = useQuery<{
        recentlyPlayedTracks: SpotifyApi.PlayHistoryObject[];
    }>(
        ['search', 'history', session?.user.accessToken],
        ({ queryKey: [_, __, accessToken] }) => {
            return fetch(`/api/search/history?accessToken=${accessToken}`).then(
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

    const searchMutation = useMutation<
        null | SpotifyApi.SearchResponse,
        Error,
        {
            accessToken: string;
            searchString: string;
        }
    >(
        async ({
            accessToken,
            searchString,
        }: {
            accessToken: string;
            searchString: string;
        }) => {
            const res = await fetch(
                `/api/search?accessToken=${accessToken}&value=${searchString}`
            );
            return await res.json();
        }
    );

    if (!searchHistoryResponse.data) {
        return <LoadingPage />;
    }

    return (
        <div className="h-screen w-full px-4 text-white">
            <div className="p-5">
                <div className="z-1 relative">
                    <div className="z-1 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            className="h-5 w-5 text-gray-500 dark:text-gray-400"
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
                        className="w-full rounded-full border border-none border-gray-300 bg-gray-50 p-3 pl-10 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0 sm:w-96"
                        placeholder="Artist or song"
                        required
                        value={searchString}
                        onChange={(e) => {
                            setSearchString(e.target.value);
                            searchMutation.mutate({
                                accessToken: session?.user.accessToken ?? '',
                                searchString: e.target.value,
                            });
                        }}
                    />
                </div>
            </div>
            <div className="h-screen overflow-y-scroll">
                {!searchString &&
                    !!searchHistoryResponse?.data?.recentlyPlayedTracks && (
                        <div className="mb-24 pb-24">
                            <div className="select-none py-5">
                                <h2>Recently Played Songs</h2>
                                <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-3 lg:grid-cols-5">
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
                                                    playMutation.mutate({
                                                        trackUri:
                                                            track.track.uri,
                                                        accessToken:
                                                            session?.user
                                                                .accessToken ??
                                                            '',
                                                    });
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                <div className="mb-24 pb-24">
                    {!!searchMutation.data?.tracks && (
                        <div className="py-5">
                            <h2>Songs</h2>
                            <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-3 lg:grid-cols-5">
                                {searchMutation.data.tracks.items.map(
                                    (track) => (
                                        <Card
                                            image={track.album.images[0].url}
                                            title={track.name}
                                            subtitle={track.artists[0].name}
                                            onClick={() => {
                                                playMutation.mutate({
                                                    trackUri: track.uri,
                                                    accessToken:
                                                        session?.user
                                                            .accessToken ?? '',
                                                });
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                    {!!searchMutation.data?.artists && (
                        <div className="py-5">
                            <h2>Artists</h2>
                            <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-3 lg:grid-cols-5">
                                {searchMutation.data.artists.items.map(
                                    (artist) => (
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
                                    )
                                )}
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
