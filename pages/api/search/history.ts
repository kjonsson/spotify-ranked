import type { NextApiRequest, NextApiResponse } from "next";
import { createSpotifyApi } from "../../../lib/spotify";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.accessToken) {
    return res.status(500).json({ error: "No accessToken" });
  }

  const accessToken = req.query.accessToken.toString();

  const spotifyApi = createSpotifyApi(accessToken);

  try {
    const recentlyPlayedResponse = await spotifyApi.getMyRecentlyPlayedTracks();

    return res
      .status(200)
      .json({ recentlyPlayedTracks: recentlyPlayedResponse.body.items });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default handler;
