const lyricsSearcher = require("lyrics-searcher");

exports.handler = async function(event, context) {
  
  function cleanTitle(title) {
    const regex = /^(.+)\s-+?.*$/i; // Grabs everything before space + dash
    const result = title.match(regex);
    if (result) {
        return result[1];
    }
    return title;
  }

  const artist = event.queryStringParameters.artist;
  const title = cleanTitle(event.queryStringParameters.title);

  try {
    const lyrics = await lyricsSearcher(artist, title);
    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": event.multiValueHeaders.cookie,
      },
      body: JSON.stringify(lyrics),
    };
  } catch (error) {
      console.error(error.message);
      return {
        statusCode: 404,
        headers: {
          "Set-Cookie": event.multiValueHeaders.cookie,
        },
      };
  }
}
