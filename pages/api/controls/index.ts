import type { NextApiRequest, NextApiResponse } from 'next';
import { createSpotifyApi } from '../../../lib/spotify';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    let {
        query: { accessToken, action, trackId },
    } = req;

    if (!accessToken) {
        return res.status(500).json({ error: 'No accessToken' });
    }

    action = action?.toString();

    if (!action) {
        return res.status(500).json({ error: 'missing action' });
    }

    const spotifyApi = createSpotifyApi(accessToken.toString());

    if (action === 'PLAY') {
        await spotifyApi.play();
        return res.status(200).json({});
    } else if (action === 'PAUSE') {
        await spotifyApi.pause();
        return res.status(200).json({});
    }

    return res.status(500).json({});
}

export default handler;
