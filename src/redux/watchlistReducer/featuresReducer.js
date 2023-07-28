import {
  ADD_TO_NOTES,
  ADD_TO_PLAYLIST,
  ADD_TO_WATCHLATER,
  ADD_VIDEO_TO_PLAYLIST,
  REMOVE_FROM_NOTES,
  REMOVE_FROM_PLAYLIST,
  REMOVE_FROM_WATCHLATER,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "./action-types";

export const featuresReducer = (state, { type, payload }) => {
  let newState;
  switch (type) {
    case ADD_TO_WATCHLATER: {
      newState = { ...state, watchLater: payload.watchLater };
      break;
    }

    case REMOVE_FROM_WATCHLATER: {
      newState = { ...state, watchLater: payload.watchLater };
      break;
    }

    case ADD_TO_PLAYLIST: {
      newState = { ...state, playlists: [...state.playlists, payload.playlists] };
      break;
    }

    case REMOVE_FROM_PLAYLIST: {
      newState = { ...state, playlists: state.playlists.filter((_, idx) => idx !== payload.playlistId) };
      break;
    }

    case ADD_VIDEO_TO_PLAYLIST: {
      newState = { ...state, playlists: state.playlists.map((playlist, idx) => idx === payload.playlistId ? ({ ...playlist, videos: [...playlist.videos, payload.video] }) : playlist) };
      break;
    }

    case REMOVE_VIDEO_FROM_PLAYLIST: {
      newState = { ...state, playlists: state.playlists.map((playlist, idx) => idx === payload.playlistId ? ({ ...playlist, videos: playlist.videos.filter(video => video._id !== payload.videoId) }) : playlist) };
      break;
    }

    case ADD_TO_NOTES: {
      newState = { ...state, notes: [...state.notes, payload.note] };
      break;
    }

    case REMOVE_FROM_NOTES: {
      newState = { ...state, notes: state.notes.filter((_, idx) => idx !== payload.noteId) };
      break;
    }

    case "EDIT_NOTE": {
      console.log(payload);
      newState = { ...state, notes: state.notes.map((item, index) => index === payload.idx ? payload.note : item) };
      break;
    }
  }
  localStorage.setItem("state", JSON.stringify(newState))
  return newState;
};
