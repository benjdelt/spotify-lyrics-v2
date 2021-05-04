import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Suspense, useEffect, useState } from 'react';

import { getUser, getNowPlaying } from './api';

import Layout from './components/Layout';
import Nav from './components/Nav';
import Profile from './components/Profile';


function App() {

  const defaultUser = {
    name: "",
    avatarUrl: ""
  };

  const defaultSong = {
    title: "",
    artist: "",
    album: "",
    coverUrl: "",
    lyrics: [],
  };

  const { t } = useTranslation();

  const [user, setUser] = useState(defaultUser);
  const [song, setSong] = useState(defaultSong);

  useEffect(() => {
    async function getInitialDatat() {
      const userData = await getUser();
      setUser(prevUser => ({
        ...prevUser,
        name: userData.name,
        avatarUrl: userData.avatar
      }));
      if (userData.name) {
        const songData = await getNowPlaying();
        setSong(prevSong => ({
          ...prevSong, 
          title: songData.title,
          artist: songData.artist,
          album: songData.album,
          coverUrl: songData.coverUrl,
          lyrics: songData.lyrics
        }));
      }
    }
    getInitialDatat();
  }, []);

  const logout = () => {
    window.location.hash = "";
    setUser(defaultUser);
    setSong(defaultSong);
  }

  return (
    <Layout nav={<Nav />}>
      <>
        <Profile user={user} logout={logout} />
        {user.name ? (
          <section className="song">
            <header className="song-header">
              <img src={song.coverUrl} alt="cover" className="cover"/>
              <section className="song-info">
                <h2>{song.title}</h2>
                <h5>{song.artist}</h5>
                <p>{song.album}</p>
              </section>
            </header>
            <section className="song-main">
              <p>
                {song.lyrics.map((lyric, ind) => <span key={ind} >{lyric}<br /></span>)}
              </p>
            </section>
          </section>
        ) : (
          <section className="disclaimer">
            <h2>{ t('disclaimer.header') }</h2>
            <p>
              { t('disclaimer.p1') }
            </p>
            <p>
              { t('disclaimer.p2') }
            </p>
            <p>
                { t('disclaimer.p3') }
            </p>
          </section>
        )}
      </>
    </Layout>
  )
}

function Loader() {
  return (
    <Layout nav="" >
      <section className="loading">
        <FontAwesomeIcon icon={faSpinner} pulse />
      </section>
    </Layout>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  )
}
