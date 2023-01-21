import type { NextApiRequest, NextApiResponse } from 'next';
import { createSpotifyApi } from '../../../lib/spotify';

type SpotifyImageType = {
    url: string;
};

type SpotifyArtist = {
    name: string;
};

type SpotifyTrackType = {
    album: {
        images?: SpotifyImageType[];
    };
    name?: string;
    artists?: SpotifyArtist[];
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
    let {
        query: { accessToken, action },
    } = req;

    if (!accessToken) {
        return res.status(500).json({ error: 'No accessToken' });
    }

    const spotifyApi = createSpotifyApi(accessToken.toString());

    const currentPlayingTrackResponse =
        await spotifyApi.getMyCurrentPlaybackState();
    const currentPlayingTrack = currentPlayingTrackResponse.body;

    res.status(200).json({
        currentPlayingTrack,
    });
}

export default handler;
