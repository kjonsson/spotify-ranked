import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';
import BlurImage from '../components/BlurImage';

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}

const Login = ({
    providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (!providers) {
        return <div>No Providers Found</div>;
    }

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
            <div className="w-52 pb-4">
                <BlurImage
                    durationType="short"
                    imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
                />
            </div>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className="rounded-full bg-[#18D860] p-5 text-white"
                        onClick={() =>
                            signIn(provider.id, { callbackUrl: '/' })
                        }
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Login;
