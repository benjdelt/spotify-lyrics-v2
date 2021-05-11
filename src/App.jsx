import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getUser, getNowPlaying, getInitialSong } from './api';
import { errorTypes, emptyUser, emptySong, defaultLoading } from './utils';

import Layout from './components/Layout';
import Error from './components/Error';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Song from './components/Song';
import Disclaimer from './components/Disclaimer';
import Loader from './components/Loader';


function App() {

  const { t } = useTranslation();

  const [user, setUser] = useState(emptyUser);
  const [song, setSong] = useState(emptySong);
  const [loading, setLoading] = useState(defaultLoading);
  const [error, setError] = useState({type: "", message: ""});

  useEffect(() => {
    setLoading({user: false, song: false});
    async function setInitialDatat() {
      setLoading({user: true, song: true});
      const userData = await getUser();
      setUser(prevUser => ({
        ...prevUser,
        name: userData.name,
        avatarUrl: userData.avatar,
      }));
      setLoading(prevLoading => ({
        ...prevLoading,
        user: false,
      }));
      if (userData.name) {
        const songData = await getInitialSong();
        setSong(prevSong => ({
          ...prevSong, 
          title: songData.title,
          artist: songData.artist,
          album: songData.album,
          coverUrl: songData.coverUrl,
          lyrics: songData.lyrics,
        }));
        if (!songData.lyrics.length) {
          setError({
            type: errorTypes.noLyricsFound,
            message: t('error.noLyricsFound'),
          });
        }
      }
      setLoading(prevLoading => ({
        ...prevLoading,
        song: false,
      }));
    }
    setInitialDatat();
  }, []);

  const setToCurrentlyPlaying = async () => {
    setLoading({...loading, song: true});
    const nowPlaying = await getNowPlaying();
    if (nowPlaying.title) {
      setSong(nowPlaying);
    } else {
      setError({
        type: errorTypes.noCurrentlyPlaying,
        message: t('error.noCurrentlyPlaying'),
      });
    }
    setLoading({...loading, song: false});
  }

  const logout = () => {
    window.location.hash = "";
    setUser(emptyUser);
    setSong(emptySong);
    setLoading({
      user: false,
      song: false,
    })
  }

  return (
    <Layout nav={<Nav setToCurrentlyPlaying={setToCurrentlyPlaying} />}>
      <>
        <Profile user={user} loading={loading.user} logout={logout} />
        {loading.song ? (
          <Loader />
        ) : (
          error.type === errorTypes.noCurrentlyPlaying ? (
            <Error error={error.message} />
          ) : ( 
            user.name ? (
              <Song song={song} error={error}/>
            ) : (
              <Disclaimer />
          )))}
      </>
    </Layout>
  )
}

function LoadingPage() {
  return (
    <Layout nav="" >
      <Loader />
    </Layout>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <App />
    </Suspense>
  )
}
