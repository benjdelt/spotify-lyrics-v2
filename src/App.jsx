import Layout from './components/Layout';
import Nav from './components/Nav';
import Dropdown from './components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Suspense, useEffect, useState } from 'react';

import { getUser, getNowPlaying } from './api';


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

  const [user, setUser] = useState(defaultUser);
  const [song, setSong] = useState(defaultSong);

  useEffect(() => {
    async function getInitialDatat() {
      const userData = await getUser();
      setUser({...user, name: userData.name, avatarUrl: userData.avatar});
      const songData = await getNowPlaying();
      setSong({
        ...song, 
        title: songData.title,
        artist: songData.artist,
        album: songData.album,
        coverUrl: songData.coverUrl,
        lyrics: songData.lyrics
      })
    }
    getInitialDatat();
  }, []);

  const { t } = useTranslation();

  const logout = () => {
    window.location.hash = "";
    setUser(defaultUser);
    setSong(defaultSong);
  }

  return (
    <Layout nav={<Nav />}>
      <>
        <section className="profile">
          {user.name ?
              <Dropdown options={[t('user.logout')]} optionHandler={logout}>
                <>
                  <img src={user.avatarUrl} alt="avatar" className="avatar"/>
                  <span className="user text">
                    {user.name}
                  </span>
                </>
              </Dropdown>
            :
              <a href="/.netlify/functions/login" className="login">{ t('login.button') }</a>
          }
        </section>
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
