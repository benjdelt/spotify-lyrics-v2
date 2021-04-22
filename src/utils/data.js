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
  return {name: response.display_name, avatar: response.images[0].url};
}
