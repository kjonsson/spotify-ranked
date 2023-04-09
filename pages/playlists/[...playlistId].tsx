import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import BlurImage from '../../components/BlurImage';
import { LoadingPage, LoadingSpinner } from '../../components/Loading';
import Songs from '../../components/Songs';

const PlaylistPage: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const playlistId = router.query.playlistId?.toString();

    if (!playlistId) {
        return null;
    }

    const playlistQuery = useQuery<{
        playlist: SpotifyApi.SinglePlaylistResponse;
    }>(
        ['playlist', playlistId, session?.user.accessToken],
        ({ queryKey: [_, playlistId, accessToken] }) => {
            return fetch(
                `/api/playlists/${playlistId}?accessToken=${accessToken}`
            ).then((response) => response.json());
        },
        {
            // refetchInterval: 5000,
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    );

    if (!playlistQuery.data) {
        return <LoadingPage />;
    }

    const playlist = playlistQuery.data.playlist;

    if (!playlist) {
        return null;
    }

    const tracks = playlist.tracks.items
        .map((item) => item.track)
        .filter((item) => !!item) as SpotifyApi.TrackObjectFull[];

    return (
        <div className="h-screen flex-grow overflow-y-scroll">
            <section
                className={`flex h-80 w-full items-end space-x-7 bg-gradient-to-b from-lime-800 to-[#121212] p-8 text-white`}
            >
                <div className="h-52 w-52">
                    <BlurImage imageSrc={playlist?.images[0]?.url} />
                </div>
                <div className="select-none ">
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl">
                        {playlist?.name}
                    </h1>
                </div>
            </section>

            <div className="bg-[#121212]">
                <Songs tracks={tracks} />
            </div>
        </div>
    );
};

export default PlaylistPage;

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
