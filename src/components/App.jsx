import { Suspense, useEffect, useState } from 'react';

import { getUser, getLyrics, getNowPlaying, getInitialSong, getTrackHistory } from '../api';
import { errorTypes, emptyUser, emptySong, defaultLoading } from '../utils';

import Layout from './Layout';
import Error from './Error';
import Nav from './Nav';
import Profile from './Profile';
import Song from './Song';
import Disclaimer from './Disclaimer';
import Loader from './Loader';

import '../styles/App.css';


function App() {

  const [user, setUser] = useState(emptyUser);
  const [song, setSong] = useState(emptySong);
  const [trackHistory, setTrackHistory] = useState([]);
  const [loading, setLoading] = useState(defaultLoading);
  const [errorType, setErrorType] = useState("");

  useEffect(() => {
    setLoading({user: false, song: false});
    async function setInitialData() {
      setLoading({user: true, song: true});
      const userData = await getUser();
      setUser(prevUser => ({
        ...prevUser,
        name: userData.name,
        avatarUrl: userData.avatarUrl,
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
          setErrorType(errorTypes.noLyricsFound);
        }
        setLoading(prevLoading => ({
          ...prevLoading,
          history: true,
        }));
        const trackHistory = await getTrackHistory();
        setTrackHistory(trackHistory);
        setLoading(prevLoading => ({
          ...prevLoading,
          history: false,
        }));
      }
      setLoading(prevLoading => ({
        ...prevLoading,
        song: false,
      }));     
    }
    setInitialData();
  }, []);

  const setToCurrentlyPlaying = async () => {
    setLoading({...loading, song: true});
    setErrorType("");
    const nowPlaying = await getNowPlaying();
    if (nowPlaying.title) {
      setSong(nowPlaying);
      if (!nowPlaying.lyrics.length) {
        setErrorType(errorTypes.noLyricsFound);
      }
    } else {
      setErrorType(errorTypes.noCurrentlyPlaying);
    }
    setLoading({...loading, song: false});
  }

  const setToHistoryTrack = async track => {
    setLoading({...loading, song: true});
    setErrorType("");
    const lyrics = await getLyrics(track.artist, track.title);
    console.log(lyrics)
    setSong({
      title: track.title,
      artist: track.artist,
      album: track.album,
      coverUrl: track.coverUrl,
      lyrics: lyrics,
    })
    if (!lyrics.length) {
      setErrorType(errorTypes.noLyricsFound);
    }
    setLoading({...loading, song: false});
  }

  const logout = () => {
    window.location.hash = "";
    setUser(emptyUser);
    setSong(emptySong);
    setTrackHistory([]);
    setLoading({
      user: false,
      song: false,
      history: false,
    })
  }

  return (
    <Layout 
      nav={<Nav
        loggedIn={!!user.name}
        setToCurrentlyPlaying={setToCurrentlyPlaying}
        trackHistory={trackHistory}
        setToHistoryTrack={setToHistoryTrack}
        loadingHistory={loading.history} 
      />}
    >
      <>
        <Profile user={user} loading={loading.user} logout={logout} />
        {loading.song ? (
          <Loader />
        ) : (
          !user.name ? (
            <Disclaimer />
          ) : ( 
            errorType === errorTypes.noCurrentlyPlaying ? (
              <Error errorType={errorType} />
            ) : (
              <Song song={song} errorType={errorType} />
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
