import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="w-full p-2 text-white">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div>
          <input
            type="search"
            id="default-search"
            className="block w-full max-w-sm p-3 pl-10 text-sm text-gray-900 border border-gray-300 border-none rounded-full bg-gray-50 focus:ring-0 focus:outline-none placeholder:text-gray-500"
            placeholder="Artist, Song, etc."
            required
          />
        </div>
      </div>
      <div>Search Results</div>
    </div>
  );
};

export default Home;
