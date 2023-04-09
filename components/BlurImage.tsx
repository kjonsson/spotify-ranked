import Image from 'next/legacy/image';
import { useState } from 'react';

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const BlurImage = ({
    imageSrc,
    durationType = 'long',
}: {
    imageSrc: string;
    durationType?: 'short' | 'long';
}) => {
    const [isLoading, setLoading] = useState(true);

    let durationString = 'duration-700';
    if (durationType === 'short') {
        durationString = 'duration-300';
    }

    return (
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
            <Image
                className={cn(
                    `${durationString} ease-in-out group-hover:opacity-50`,
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
