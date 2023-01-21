import type { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Song from '../../components/Song';

const ArtistsPage: NextPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const artistId = router.query.artistId?.toString();

    const artistQuery = useQuery<{
        artist: SpotifyApi.SingleArtistResponse;
        tracks: SpotifyApi.TrackObjectFull[];
    }>(
        ['artists', artistId, session?.user.accessToken],
        ({ queryKey: [_, artistId, accessToken] }) => {
            return fetch(
                `/api/artists/${artistId}?accessToken=${accessToken}`
            ).then((response) => response.json());
        }
    );

    if (!artistQuery.data) {
        return <div>Loading ...</div>;
    }

    return (
        <div className="flex-grow h-screen overflow-y-scroll">
            <section className="flex h-80 w-full items-end space-x-7 bg-gradient-to-b from-lime-800 to-[#121212] p-8 text-white">
                <img
                    className="shadow-2xl h-44 w-44"
                    src={artistQuery.data.artist?.images[0]?.url}
                />
                <div className="cursor-default select-none">
                    <p>ARTIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl">
                        {artistQuery.data.artist?.name}
                    </h1>
                </div>
            </section>

            <div className="bg-[#121212]">
                {artistQuery.data?.tracks?.map((song, i) => (
                    <Song
                        key={song.artists[0].name + song.name + i}
                        track={song}
                        order={i}
                        subtitle={song.album.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArtistsPage;

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
