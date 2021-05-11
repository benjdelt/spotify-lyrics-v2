import Error from './Error';
import '../styles/Song.css';

function Song({song, error}) {

  return (
    <section className="song">
      <header className="song-header">
        <img src={song.coverUrl} alt="cover" className="cover"/>
        <section className="song-info">
          <h2>{song.title}</h2>
          <h5>{song.artist}</h5>
          <p>{song.album}</p>
        </section>
      </header>
      {error.type === "noLyricsFound" ? (
        <Error error={error.message} />
      ) : (
        <section className="song-main">
          <p>
            {song.lyrics.map((lyric, ind) => <span key={ind} >{lyric}<br /></span>)}
          </p>
        </section>
      )}
    </section>
  );
}

export default Song;
