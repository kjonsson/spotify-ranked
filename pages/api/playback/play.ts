import type { NextApiRequest, NextApiResponse } from 'next';
import { createSpotifyApi } from '../../../lib/spotify';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    let {
        query: { accessToken, trackUri },
    } = req;

    if (!accessToken) {
        return res.status(500).json({ error: 'No accessToken' });
    }

    const spotifyApi = createSpotifyApi(accessToken.toString());

    // check that trackuri is a string
    if (typeof trackUri !== 'string') {
        return res.status(500).json({ error: 'No trackUri' });
    }

    try {
        await spotifyApi.play({
            uris: [trackUri],
        });
    } catch (e) {
        return res.status(500).json({ error: 'Error playing track' });
    }

    res.status(200).json({});
}

export default handler;
