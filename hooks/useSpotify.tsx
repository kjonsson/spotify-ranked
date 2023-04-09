import { debounce } from 'lodash';
import { createContext, useCallback, useContext, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import spotifyApi from '../lib/spotify';

const useSpotifyApi = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session) {
            return;
        }

        if (session.error === 'RefreshAccessTokenError') {
            signIn();
        }

        spotifyApi.setAccessToken(session.user.accessToken);
    }, [session]);

    return spotifyApi;
};

type SpotifyContextType = {
    isPlaying: boolean;
    volume: number;
    changeVolume: (volume: number) => void;
    playSong: (track: SpotifyApi.TrackObjectFull | null) => void;
};

const context = createContext<SpotifyContextType>({
    isPlaying: false,
    volume: 50,
    changeVolume: () => {},
    playSong: () => {},
});

export default context;

export const SpotifyProvider = ({ children }: { children: JSX.Element }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState<number>(50);

    const spotifyApi = useSpotifyApi();

    const playSong = (track: SpotifyApi.TrackObjectFull | null) => {
        if (!track) {
            return;
        }

        if (!track?.id || !track.uri) {
            console.log(
                'unable to play due to missing id',
                track?.id,
                track?.uri
            );
            return;
        }

        spotifyApi
            .play({
                uris: [track?.uri],
            })
            .then(() => {
                setIsPlaying(true);
            })
            .catch((e) => {
                console.log('Error playing', e);
            });
    };

    const changeVolume = (volume: number) => {
        setVolume(volume);
        debounceAdjustVolume(volume);
    };

    const debounceAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi
                .setVolume(volume)
                .catch((err) => console.log('err setting volume', err));
        }, 500),
        []
    );

    return (
        <context.Provider
            value={{
                isPlaying,
                volume,
                changeVolume,
                playSong,
            }}
        >
            {children}
        </context.Provider>
    );
};

export const useSpotify = () => useContext(context);
