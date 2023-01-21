import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useSpotifyPlayback = () => {
    const { data: session } = useSession();

    const queryClient = useQueryClient();

    const playbackQuery = useQuery<{
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
            refetchOnWindowFocus: false,
        }
    );

    const { mutate: controlMutate, status: controlStatus } = useMutation(
        async ({
            action,
            accessToken,
        }: {
            action: string;
            accessToken: string;
        }) => {
            const res = await fetch(
                `/api/controls?accessToken=${accessToken}&action=${action}`
            );
            return await res.json();
        },
        {
            onSuccess: () => queryClient.invalidateQueries(['playback']),
        }
    );

    const play = async () => {
        console.log('play start');
        await controlMutate({
            action: 'PLAY',
            accessToken: session?.user.accessToken ?? '',
        });
        console.log('play done');
    };
    const pause = async () => {
        console.log('pause start');
        await controlMutate({
            action: 'PAUSE',
            accessToken: session?.user.accessToken ?? '',
        });
        console.log('pause done');
    };

    return { playbackState: playbackQuery.data, play, pause, controlStatus };
};
