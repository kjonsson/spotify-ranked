import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Songs from "../../components/Songs";
import { useSpotify } from "../../hooks/useSpotify";

const PlaylistPage: NextPage = () => {
  const { playlist, playlistId } = useSpotify();

  if (!playlist) {
    return null;
  }

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
        <Songs />
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

