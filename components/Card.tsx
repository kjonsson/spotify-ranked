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
      className="max-w-[200px] flex flex-col justify-between p-5 m-3 text-white bg-[#181818] hover:bg-[#282828] rounded-lg shadow-md cursor-pointer"
    >
      <div className="flex items-center justify-center">
        <img className="m-2 rounded-full aspect-square" src={image} alt="" />
      </div>
      <div className="pt-7">
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
