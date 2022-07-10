import {
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="text-gray-500 p-5 text-sm">
      <div className="space-y-4">
      <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <p>PlayList X...</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <p>PlayList X...</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <p>PlayList X...</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <p>PlayList X...</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <p>PlayList X...</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
