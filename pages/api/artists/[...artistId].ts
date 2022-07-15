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
    const artistAlbumResponse = await spotifyApi.getArtistAlbums(artistId, {
      limit: 50,
    });

    console.log(
      "artistAlbumResponse",
      artistAlbumResponse.body.items.map((item) => [
        item.release_date,
        item.name,
      ])
    );

    const albumIds = artistAlbumResponse.body.items.flatMap((item) => item.id);

    let promises = [];
    let sliceSize = 20;
    let i = 0;

    while (i < albumIds.length) {
      promises.push(spotifyApi.getAlbums(albumIds.slice(i, i + sliceSize)));
      i += sliceSize;
    }

    const albumsResponse = await Promise.all(promises);
    const albums = albumsResponse.flatMap((res) => res.body.albums);

    console.log("albums response 1", albums);

    const trackIds = albums.flatMap((album) =>
      album.tracks.items.map((item) => item.id)
    );

    promises = [];
    sliceSize = 30;
    i = 0;

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
