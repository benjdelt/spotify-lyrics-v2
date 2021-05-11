import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getUser, getNowPlaying, getInitialSong } from './api';

import Layout from './components/Layout';
import Error from './components/Error';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Song from './components/Song';
import Disclaimer from './components/Disclaimer';
import Loader from './components/Loader';


function App() {

  const defaultUser = {
    name: "",
    avatarUrl: "",
  };

  const defaultSong = {
    title: "",
    artist: "",
    album: "",
    coverUrl: "",
    lyrics: [],
  };

  const defaultLoading = {
    user: true,
    song: true,
  };

  const { t } = useTranslation();

  const [user, setUser] = useState(defaultUser);
  const [song, setSong] = useState(defaultSong);
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
        console.log(songData.lyrics)
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
            type: "noLyricsFound",
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
        type:"noCurrentlyPlaying",
        message: t('error.noCurrentlyPlaying'),
      });
    }
    setLoading({...loading, song: false});
  }

  const logout = () => {
    window.location.hash = "";
    setUser(defaultUser);
    setSong(defaultSong);
    setLoading({
      user: false,
      song: false,
    })
  }
  console.log(error.message)
  return (
    <Layout nav={<Nav setToCurrentlyPlaying={setToCurrentlyPlaying} />}>
      <>
        <Profile user={user} loading={loading.user} logout={logout} />
        {loading.song ? (
          <Loader />
        ) : (
          error.type === "noCurrentlyPlaying" ? (
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
