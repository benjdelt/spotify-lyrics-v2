import Error from './Error';
import { errorTypes } from '../utils';
import '../styles/Song.css';

function Song({song, errorType}) {

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
      {errorType === errorTypes.noLyricsFound ? (
        <Error errorType={errorType} />
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
