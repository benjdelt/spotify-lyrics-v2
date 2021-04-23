import SpotifyWebApi from 'spotify-web-api-js';

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
  const response = await spotifyApi.getMe();
  return {
    name: response.display_name, 
    avatar: response.images[0].url
  };
}

export const getNowPlaying = async () => {
  const nowPlaying = await spotifyApi.getMyCurrentPlaybackState();
  if (nowPlaying) {
    return { 
      title: nowPlaying.item.name,
      artist: nowPlaying.item.artists[0].name,
      album: nowPlaying.item.album.name, 
      coverUrl: nowPlaying.item.album.images[0].url,
    }
  }
  const lastPlayed = await spotifyApi.getMyRecentlyPlayedTracks({"limit": 1})
  console.log(lastPlayed)
  return { 
    title: lastPlayed.items[0].track.name,
    artist: lastPlayed.items[0].track.artists[0].name,
    album: lastPlayed.items[0].track.album.name, 
    coverUrl: lastPlayed.items[0].track.album.images[0].url,
  }
}
