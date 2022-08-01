import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Songs from "../../components/Songs";

const PlaylistPage: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const playlistId = router.query.playlistId?.toString();

  const playlistQuery = useQuery<{ playlist: SpotifyApi.SinglePlaylistResponse }>(
    ["playlist", playlistId, session?.user.accessToken],
    ({ queryKey: [_, playlistId, accessToken] }) => {
      return fetch(`/api/playlists/${playlistId}?accessToken=${accessToken}`).then(
        (response) => response.json()
      );
    }
  );

  if (!playlistQuery.data) {
    return <div>Loading ...</div>;
  }

  const playlist = playlistQuery.data.playlist;

  if (!playlist) {
    return null;
  }

  const tracks = playlist.tracks.items.map(item => item.track).filter(item => !!item) as SpotifyApi.TrackObjectFull[];

  return (
    <div className="flex-grow h-screen overflow-y-scroll">
      <section
        className={`w-full flex items-end space-x-7 h-80 text-white p-8`}
      >
        <img className="shadow-2xl h-44 w-44" src={playlist?.images[0]?.url} />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs tracks={tracks}/>
      </div>
    </div>
  );
};

export default PlaylistPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}

