import { orderBy, sortBy } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { createSpotifyApi } from "../../../lib/spotify";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { accessToken, artistId } = req.query;

  if (!accessToken) {
    return res.status(500).json({ error: "No accessToken" });
  }
  if (!artistId) {
    return res.status(500).json({ error: "No artistId" });
  }
  accessToken = accessToken.toString();
  artistId = artistId.toString();

  const spotifyApi = createSpotifyApi(accessToken);

  try {
    const artistAlbumResponse = await spotifyApi.getArtistAlbums(artistId);

    const albumIds = artistAlbumResponse.body.items.flatMap((item) => item.id);
    const albumsResponse = await spotifyApi.getAlbums(albumIds);

    const trackIds = albumsResponse.body.albums.flatMap((album) =>
      album.tracks.items.map((item) => item.id)
    );

    const promises = [];
    const sliceSize = 30;
    let i = 0;

    while (i < trackIds.length) {
      promises.push(spotifyApi.getTracks(trackIds.slice(i, i + sliceSize)));
      i += sliceSize;
    }

    const tracksResponse = await Promise.all(promises);

    const tracks = tracksResponse.flatMap((res) => res.body.tracks);

    return res
      .status(200)
      .json({ tracks: orderBy(tracks, ["popularity"], ["desc"]) });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default handler;
