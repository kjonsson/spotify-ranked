import Image from 'next/legacy/image';
import { useState } from 'react';

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Card = ({
    image,
    title,
    subtitle,
    onClick,
    onClickSubtitle,
}: {
    image: string;
    title: string;
    subtitle: string;
    onClick: () => void;
    onClickSubtitle?: () => void;
}) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className="group hover:cursor-pointer">
            <div
                onClick={onClick}
                className="w-full overflow-hidden aspect-w-1 aspect-h-1"
            >
                <Image
                    className={cn(
                        'duration-700 ease-in-out group-hover:opacity-50',
                        isLoading
                            ? 'scale-110 blur-2xl grayscale'
                            : 'scale-100 blur-0 grayscale-0'
                    )}
                    src={image}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    onLoadingComplete={() => setLoading(false)}
                />
            </div>
            <div className="select-none pt-7">
                <h5
                    onClick={onClick}
                    className="mb-2 text-sm font-bold tracking-tight text-white truncate"
                >
                    {title}
                </h5>
                <h5
                    className="mb-2 text-sm font-bold tracking-tight text-gray-400 truncate"
                    onClick={() =>
                        typeof onClickSubtitle !== 'undefined' &&
                        onClickSubtitle()
                    }
                >
                    {subtitle}
                </h5>
            </div>
        </div>
    );
};

export default Card;
