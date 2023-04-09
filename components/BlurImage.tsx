import Image from 'next/legacy/image';
import { useState } from 'react';

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const BlurImage = ({
    imageSrc,
    durationType = 'long',
    rounded = undefined,
}: {
    imageSrc: string;
    durationType?: 'short' | 'long';
    rounded?: 'full';
}) => {
    const [isLoading, setLoading] = useState(true);

    let durationString = 'duration-700';
    if (durationType === 'short') {
        durationString = 'duration-300';
    }

    const roundedString = rounded === 'full' ? 'rounded-full' : '';

    return (
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
            <Image
                className={cn(
                    `${durationString} ease-in-out group-hover:opacity-50`,
                    roundedString,
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
