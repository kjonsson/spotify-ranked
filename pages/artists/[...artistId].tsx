import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useQuery } from "react-query";
import Song from "../../components/Song";
import { useSpotify } from "../../hooks/useSpotify";

const ArtistsPage: NextPage = () => {
  const { data: session } = useSession();
  const { artistId } = useSpotify();

  const artistQuery = useQuery<{ tracks: SpotifyApi.TrackObjectFull[] }>(
    ["artists", artistId, session?.user.accessToken],
    ({ queryKey: [_, artistId, accessToken] }) => {
      return fetch(`/api/artists/${artistId}?accessToken=${accessToken}`).then(
        (response) => response.json()
      );
    }
  );

  if (!artistQuery.data) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="flex-grow h-screen overflow-y-scroll">
      <section className="flex items-end w-full p-8 text-white h-80 space-x-7">
        <div>
          <p>ARTIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">
            {artistQuery.data?.tracks?.[0].artists[0].name}
          </h1>
        </div>
      </section>

      <div>
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
