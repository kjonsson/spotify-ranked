import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="relative z-50 flex items-end justify-end pt-5 pr-5  lg:absolute lg:top-0 lg:right-0">
      <div
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
      >
        <img
          className="w-10 h-10 rounded-full"
          src={session?.user?.image ?? ""}
        />
        <h2>{session?.user.name}</h2>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </header>
  );
};

export default Header;
