import {
  createContext,
  useContext,
  useState,
  useReducer,
} from "react";
import { featuresReducer } from "../../redux";
import {
  ADD_TO_WATCHLATER,
  REMOVE_FROM_WATCHLATER,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  ADD_VIDEO_TO_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
  ADD_TO_NOTES,
  REMOVE_FROM_NOTES,
} from "../../redux/watchlistReducer/action-types";

const WatchLaterAndLikesContext = createContext(null);

const useFeatures = () => useContext(WatchLaterAndLikesContext);

const initState = JSON.parse(localStorage.getItem("state")) ? JSON.parse(localStorage.getItem("state")) : {
  watchLater: [],
  playlists: [],
  notes: [],
};

const FeaturesProvider = ({ children }) => {
  const [localState, dispatch] = useReducer(featuresReducer, initState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNotesDetails] = useState({note: "", idx: ""});
  const state = JSON.parse(localStorage.getItem("state")) ? JSON.parse(localStorage.getItem("state")) : localState;

  const toggleWatchLaterVideo = async (video) => {
    try {
      if (
        state.watchLater?.find((currVideo) => currVideo._id === video._id)
      ) {
        dispatch({
          type: REMOVE_FROM_WATCHLATER,
          payload: { watchLater: state.watchLater.filter(item => item._id !== video._id) },
        });
      } else {
        dispatch({
          type: ADD_TO_WATCHLATER,
          payload: { watchLater: [...state.watchLater, video] },
        });
      }
    } catch (err) {
      console.error(err);
    }
  }


  const addToPlaylist = async () => {
    dispatch({
      type: ADD_TO_PLAYLIST,
      payload: { playlists: { title, description, videos: [] } },
    });
    setTitle("");
    setDescription("");

  };

  const addVideoToPlaylist = async (playlistId, video) => {
    dispatch({
      type: ADD_VIDEO_TO_PLAYLIST,
      payload: { video, playlistId },
    });
    console.log(playlistId, video);
  };

  const removeVideoFromPlaylist = async (playlistId, videoId) => {
    dispatch({
      type: REMOVE_VIDEO_FROM_PLAYLIST,
      payload: { playlistId, videoId },
    });
  };

  const removeFromPlaylist = async (playlistId) => {
    dispatch({
      type: REMOVE_FROM_PLAYLIST,
      payload: { playlistId },
    });
    setTitle("");
    setDescription("");
  };

  const addToNotes = async () => {
    dispatch({
      type: ADD_TO_NOTES,
      payload: note,
    });
    setNotesDetails({note: "", idx: ""});
    
  };
  
  const removeFromNotes = async (noteId) => {
    dispatch({
      type: REMOVE_FROM_NOTES,
      payload: { noteId },
    });
    setNotesDetails({note: "", idx: ""});
  };

  const editNotes = (note, idx) => {
    console.log(note, idx);
    dispatch({
      type: "EDIT_NOTE",
      payload: { note, idx }
    })
    setNotesDetails("");
  }

  return (
    <WatchLaterAndLikesContext.Provider
      value={{
        state,
        dispatch,
        toggleWatchLaterVideo,
        addToPlaylist,
        removeFromPlaylist,
        title,
        description,
        setTitle,
        setDescription,
        addVideoToPlaylist,
        removeVideoFromPlaylist,
        addToNotes,
        removeFromNotes,
        setNotesDetails,
        note,
        editNotes
      }}
    >
      {children}
    </WatchLaterAndLikesContext.Provider>
  );
};

export { useFeatures, FeaturesProvider };
