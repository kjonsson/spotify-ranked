import Song from "./Song";

const Songs = ({tracks}: { tracks: SpotifyApi.TrackObjectFull[]}) => {
  return (
    <div className="flex flex-col px-8 space-y-1 text-white pb-28">
      {tracks.map((track, i) => {
        return (
          <Song
            key={track.id + i}
            track={track}
            order={i}
            album={track.album}
            subtitle={track.artists[0].name}
          />
        );
      })}
    </div>
  );
};

export default Songs;
