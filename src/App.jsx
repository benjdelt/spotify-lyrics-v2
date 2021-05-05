import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Suspense, useEffect, useState } from 'react';

import { getUser, getNowPlaying } from './api';

import Layout from './components/Layout';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Song from './components/Song';
import Disclaimer from './components/Disclaimer';


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
          <Song song={song} />
        ) : (
          <Disclaimer />
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
