import { orderBy, sortBy } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSpotifyApi } from '../../../lib/spotify';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.accessToken) {
        return res.status(500).json({ error: 'No accessToken' });
    }
    if (!req.query.value) {
        return res.status(500).json({ error: 'No value in search' });
    }
    const accessToken = req.query.accessToken.toString();
    const value = req.query.value.toString();

    const spotifyApi = createSpotifyApi(accessToken);

    try {
        const searchResponse = await spotifyApi.search(
            value,
            ['album', 'artist', 'track'],
            { limit: 10 }
        );

        return res.status(200).json({
            albums: searchResponse.body.albums,
            artists: searchResponse.body.artists,
            tracks: searchResponse.body.tracks,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export default handler;
