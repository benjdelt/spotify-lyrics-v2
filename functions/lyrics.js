const axios = require('axios');

exports.handler = async function(event, context) {
  const artist = event.queryStringParameters.artist;
  const title = event.queryStringParameters.title;
  const uri = `https://api.lyrics.ovh/v1/${artist}/${title}`
  try {
    const response = await axios.get(uri)
    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": event.multiValueHeaders.cookie,
      },
      body: JSON.stringify(response.data.lyrics),
    };
  } catch (error) {
    return {
      statusCode: 404,
      headers: {
        "Set-Cookie": event.multiValueHeaders.cookie,
      },
    };
  }
}
