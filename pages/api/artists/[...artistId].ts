import { orderBy, sortBy } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { createSpotifyApi } from "../../../lib/spotify";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.accessToken) {
    return res.status(500).json({ error: "No accessToken" });
  }
  if (!req.query.artistId) {
    return res.status(500).json({ error: "No artistId" });
  }
  const accessToken = req.query.accessToken.toString();
  const artistId = req.query.artistId.toString();

  const spotifyApi = createSpotifyApi(accessToken);

  try {
    const artistAlbumResponse = await spotifyApi.getArtistAlbums(artistId, {
      limit: 50,
    });

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

    const sortedTracks = orderBy(tracks, ["popularity"], ["desc"]).filter(
      (track) => track.artists.map((artist) => artist.id).includes(artistId)
    );

    return res.status(200).json({ tracks: sortedTracks });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default handler;
