const errorTypes = {
  noLyricsFound: "noLyricsFound",
  noCurrentlyPlaying: "noCurrentlyPlaying",
}

const emptyUser = {
  name: "",
  avatarUrl: "",
};

const emptySong = {
  title: "",
  artist: "",
  album: "",
  coverUrl: "",
  lyrics: [],
};

const defaultLoading = {
  user: true,
  song: true,
  history: true,
};

export {
  errorTypes,
  emptyUser,
  emptySong,
  defaultLoading,
}
