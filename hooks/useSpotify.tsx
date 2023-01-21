import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import useSpotifyApi from './useSpotifyApi';

type SpotifyContextType = {
    isPlaying: boolean;
    volume: number;
    currentTrackId: null | string;
    searchString: string;
    searchResult: null | SpotifyApi.SearchResponse;
    togglePlayPause: () => void;
    changeVolume: (volume: number) => void;
    playSong: (track: SpotifyApi.TrackObjectFull | null) => void;
    search: (searchString: string) => void;
};

const context = createContext<SpotifyContextType>({
    isPlaying: false,
    volume: 50,
    currentTrackId: null,
    searchString: '',
    searchResult: null,
    togglePlayPause: () => {},
    changeVolume: () => {},
    playSong: () => {},
    search: () => {},
});

export default context;

export const SpotifyProvider = ({ children }: { children: JSX.Element }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackId, setCurrentTrackId] = useState<null | string>(null);
    const [volume, setVolume] = useState<number>(50);
    const [searchString, setSearchString] = useState<string>('');
    const [searchResult, setSearchResult] =
        useState<null | SpotifyApi.SearchResponse>({});

    const spotifyApi = useSpotifyApi();

    const togglePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body?.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };

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
                setCurrentTrackId(track.id);
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

    const search = (searchString: string) => {
        if (searchString) {
            spotifyApi
                .search(searchString, ['album', 'artist', 'track'], {
                    limit: 10,
                })
                .then((data) => {
                    setSearchResult(data.body);
                });
        } else {
            setSearchResult({});
        }
        setSearchString(searchString);
    };

    return (
        <context.Provider
            value={{
                isPlaying,
                volume,
                currentTrackId,
                searchString,
                searchResult,
                togglePlayPause,
                changeVolume,
                playSong,
                search,
            }}
        >
            {children}
        </context.Provider>
    );
};

export const useSpotify = () => useContext(context);
