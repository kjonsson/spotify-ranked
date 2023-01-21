const Card = ({
    image,
    title,
    subtitle,
    onClick,
}: {
    image: string;
    title: string;
    subtitle: string;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className="m-3 flex max-w-[200px] cursor-pointer flex-col justify-between rounded-lg bg-[#181818] p-5 text-white shadow-md hover:bg-[#282828]"
        >
            <div className="flex items-center justify-center">
                <img
                    className="m-2 rounded-full aspect-square"
                    src={image}
                    alt=""
                />
            </div>
            <div className="cursor-default select-none pt-7">
                <h5 className="mb-2 text-sm font-bold tracking-tight text-white truncate">
                    {title}
                </h5>
                <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-400 truncate">
                    {subtitle}
                </h5>
            </div>
        </div>
    );
};

export default Card;
