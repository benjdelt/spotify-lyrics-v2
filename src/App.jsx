import { Suspense, useEffect, useState } from 'react';

import { getUser, getNowPlaying } from './api';

import Layout from './components/Layout';
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

  const [user, setUser] = useState(defaultUser);
  const [song, setSong] = useState(defaultSong);
  const [loading, setLoading] = useState(defaultLoading);

  useEffect(() => {
    async function getInitialDatat() {
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
        const songData = await getNowPlaying();
        setSong(prevSong => ({
          ...prevSong, 
          title: songData.title,
          artist: songData.artist,
          album: songData.album,
          coverUrl: songData.coverUrl,
          lyrics: songData.lyrics,
        }));
        setLoading(prevLoading => ({
          ...prevLoading,
          song: false,
        }));
      }
    }
    getInitialDatat();
  }, []);

  const logout = () => {
    window.location.hash = "";
    setUser(defaultUser);
    setSong(defaultSong);
    setLoading({
      user: false,
      song: false,
    })
  }

  return (
    <Layout nav={<Nav />}>
      <>
        <Profile user={user} loading={loading.user} logout={logout} />
        {loading.song ? (
          <Loader />
        ) : (  
          user.name ? (
            <Song song={song} />
          ) : (
            <Disclaimer />
        ))}
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
