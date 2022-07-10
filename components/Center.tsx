import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import sample from "lodash/sample";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session } = useSession();
  const playlistId = useRecoilValue(playlistIdState);
  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(sample(colors) || colors[0]);
  });

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center p-1 pr-2 space-x-3 bg-red-300 rounded-full cursor-pointer opacity-90 hover:opacity-80">
          <img
            className="w-10 h-10 rounded-full"
            src={session?.user?.image ?? ""}
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`w-full flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8`}
      >
        <h1>Hello</h1>
      </section>
    </div>
  );
};

export default Center;
