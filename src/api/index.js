import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';

import { emptyUser, emptySong } from '../utils/';

const spotifyApi = new SpotifyWebApi();

const getHashParams = (location = window.location) => {
  const q = location.hash.substring(2);

  // if the substring is non-empty, split it up based on hashes
  // return the parameters as an object
  if (q) {
    const qArray = q.split("/");
    const hashParams = {
      path: qArray[0],
      access_token: qArray[1],
      refresh_token: qArray[2],
      expires_in: qArray[3],
    };
    return hashParams;
  }
  return {};
};

const params = getHashParams();
const token = params.access_token;
if (token) {
  spotifyApi.setAccessToken(token);
}

export const getUser = async () => {
  try {
    const token = spotifyApi.getAccessToken();
    if (token) {
      const response = await spotifyApi.getMe();
      return {
        name: response.display_name, 
        avatar: response.images[0].url,
      };
    }
    return emptyUser;
  } catch (error) {
    return emptyUser;
  }
}

const getLyrics = async (artist, title) => {
  try {
    const lyrics = await axios.get(`/.netlify/functions/lyrics?artist=${artist}&title=${title}`);
    return lyrics.data.split("\n");
  } catch (error) {
    return [];
  }
}

export const getNowPlaying = async () => {
  const nowPlaying = await spotifyApi.getMyCurrentPlaybackState();
  if (nowPlaying) {
    const lyrics = await getLyrics(nowPlaying.item.artists[0].name, nowPlaying.item.name);
    return { 
      title: nowPlaying.item.name,
      artist: nowPlaying.item.artists[0].name,
      album: nowPlaying.item.album.name, 
      coverUrl: nowPlaying.item.album.images[0].url,
      lyrics: lyrics,
    };
  }
  return emptySong;
}

const getLastPlayed = async () => {
  const lastPlayed = await spotifyApi.getMyRecentlyPlayedTracks({"limit": 1})
  if (lastPlayed.items.length > 0) {
    const lyrics = await getLyrics(lastPlayed.items[0].track.artists[0].name, lastPlayed.items[0].track.name);
    return { 
      title: lastPlayed.items[0].track.name,
      artist: lastPlayed.items[0].track.artists[0].name,
      album: lastPlayed.items[0].track.album.name, 
      coverUrl: lastPlayed.items[0].track.album.images[0].url,
      lyrics: lyrics,
    };
  }
  return emptySong;
}

export const getInitialSong = async () => {
  const nowPlaying = await getNowPlaying();
  if (nowPlaying.title) {
    return nowPlaying;
  }
  const lastPlayed = await getLastPlayed();
  if (lastPlayed.title) {
    return lastPlayed;
  }
  return emptySong;
}

export const getTrackHistory = async (limit=25) => {
  const lastPlayed = await spotifyApi.getMyRecentlyPlayedTracks({"limit": limit})
  if (lastPlayed.items.length > 0) {
    return lastPlayed.items.map(item => ({ 
      title: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name, 
      coverUrl: item.track.album.images[0].url,
    }));
  }
  return [];
}
