import Image from 'next/legacy/image';
import { useState } from 'react';

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const BlurImage = ({ imageSrc }: { imageSrc: string }) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className="w-full overflow-hidden aspect-w-1 aspect-h-1">
            <Image
                className={cn(
                    'duration-700 ease-in-out group-hover:opacity-50',
                    isLoading
                        ? 'scale-110 blur-2xl grayscale'
                        : 'scale-100 blur-0 grayscale-0'
                )}
                src={imageSrc}
                alt=""
                layout="fill"
                objectFit="cover"
                onLoadingComplete={() => setLoading(false)}
            />
        </div>
    );
};

export default BlurImage;
