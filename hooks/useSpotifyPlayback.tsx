import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

export const useSpotifyPlayback = () => {
    const { data: session } = useSession();

    const playbackState = useQuery<{
        currentPlayingTrack: SpotifyApi.CurrentPlaybackResponse;
    }>(
        ['playback', session?.user.accessToken],
        ({ queryKey: [_, accessToken] }) => {
            return fetch(`/api/playback?accessToken=${accessToken}`).then(
                (response) => response.json()
            );
        },
        {
            // refetchInterval: 5000,
            refetchOnReconnect: false,
            refetchOnMount: false,
        }
    );

    return { playbackState: playbackState.data };
};
