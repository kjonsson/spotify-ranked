import { sample } from "lodash";
import { useEffect, useState } from "react";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const useBackgroundColor = (playlistId: string) => {
  const [colorIdx, setColorIdx] = useState(0);

  useEffect(() => {
    setColorIdx((colorIdx + 1) % colors.length);
  }, [playlistId]);

  return colors[colorIdx];
};

export default useBackgroundColor;
