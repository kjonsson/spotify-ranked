import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Card from "../components/Card";

const Home: NextPage = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const libraryQuery = useQuery<{
    albums: SpotifyApi.PlaylistObjectSimplified[];
  }>(
    ["library", session?.user.accessToken],
    ({ queryKey: [_, accessToken] }) => {
      return fetch(`/api/library?accessToken=${accessToken}`).then((response) =>
        response.json()
      );
    }
  );

  if (!libraryQuery.data) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="w-full h-screen p-5 pt-20 text-white">
      <div className="h-screen overflow-y-scroll">
        <div className="pb-24 mb-24">
          {!!libraryQuery?.data?.albums && (
            <div className="py-5">
              <h2>Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {libraryQuery.data.albums.map((album) => (
                  <Card
                    image={album?.images[0]?.url}
                    title={album.name}
                    subtitle={"Album"}
                    onClick={() => {
                      router.push(`/playlists/${album.id}`);
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
