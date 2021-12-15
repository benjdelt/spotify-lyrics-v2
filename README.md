[Français](./README.fr.md)

# Spotify Lyrics

A full stack web app built with React and Netlify Functions. It connects to the Spotify
API and a lyric web scrapper to automatically get the information and the lyrics of the track
currently being played on the user's Spotify account. Users can also see information
and lyrics for the more recently played tracks on their account. It is available in
English and French.

## Getting Started

- Clone this repository and cd into it
- Install the dependencies
```
yarn
```
- Install Netlify CLI globally:
```
npm install netlify-cli -g
```
- Sign into your Netlify account from the command line:
```
netlify login
```
- Initiliaze the project with Netlify CLI:
```
netlify init
```
Launch the development environment:
```
netlify dev
```
The app is available on [http://localhost:8888].

## Testing

To run the tests:
```
yarn test
```
