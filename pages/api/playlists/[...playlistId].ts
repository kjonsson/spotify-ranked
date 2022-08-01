import { orderBy, sortBy } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { createSpotifyApi } from "../../../lib/spotify";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.accessToken) {
    return res.status(500).json({ error: "No accessToken" });
  }
  if (!req.query.playlistId) {
    return res.status(500).json({ error: "No playlistId" });
  }
  const accessToken = req.query.accessToken.toString();
  const playlistId = req.query.playlistId.toString();

  const spotifyApi = createSpotifyApi(accessToken);

  try {
    const playlistResponse = await spotifyApi.getPlaylist(playlistId)

    return res.status(200).json({ playlist: playlistResponse.body });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default handler;
