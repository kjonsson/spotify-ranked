import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import BlurImage from './BlurImage';

const Header = () => {
    const { data: session } = useSession();

    return (
        <header className="relative z-30 flex items-end justify-end pt-5 pr-5 lg:absolute lg:top-0 lg:right-0">
            <div
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80"
            >
                <div className="h-10 w-10">
                    <BlurImage
                        rounded="full"
                        imageSrc={session?.user?.image ?? ''}
                    />
                </div>
                <h2>{session?.user.name}</h2>
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </div>
        </header>
    );
};

export default Header;
