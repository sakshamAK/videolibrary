import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFeatures } from "../../contexts";
import styles from "./Playlist.module.css";
import playlistStyles from "../../components/VideoPlayerSPA/VideoPlayer.module.css";
import { useState } from "react";

export const Playlist = () => {
  const { state, removeFromPlaylist, setTitle, setDescription, title,description, addToPlaylist } = useFeatures();
  const [showPlaylist, setPlaylistMode] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="videoListing">
      <h1>Playlists</h1>
      <div className={`${styles.playlistContainer}`}>
        {state?.playlists.map((playlist, idx) => (
          <div className={`${styles.thumbnailContainer}`} onClick={() => navigate(`/playlist/${idx}`)}>
            <i
              className={`${styles.closeBtn} material-icons`}
              onClick={(e) => {
                e.stopPropagation();
                removeFromPlaylist(idx);
              }}
            >
              close
            </i>
            <img src={playlist.videos[0]?.thumbnail ? playlist.videos[0]?.thumbnail : "https://picsum.photos/272/152"} />
            <h2>{playlist.title}</h2>
            <p>{playlist.description}</p>
          </div>
        ))}
        <span
          class="material-icons"
          style={{ fontSize: "2.4rem", cursor: "pointer", alignSelf: "center" }}
          onClick={() => setPlaylistMode(showPlaylist ? false : true)}
        >
          add_circle_outline
        </span>
      </div>
      {showPlaylist && (
        <div className={`${playlistStyles.addPlaylist}`} style = {{top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: "0 0 5px black", maxWidth: "25rem"}}>
          <span className="material-icons" style = {{cursor:"pointer", marginLeft: 'auto'}} onClick={() => setPlaylistMode(false)}>close</span>
          <h3>Add To Playlist</h3>
          <input
            className={`${playlistStyles.playlistInp}`}
            type="text"
            placeholder="Enter title of your playlist"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className={`${playlistStyles.playlistInp}`}
            type="text"
            placeholder="Write a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className={`${playlistStyles.playlistBtn} btn`}
            onClick={() => {
              addToPlaylist();
              setPlaylistMode(false);
            }
            }
          >
            Create New Playlist
          </button>
        </div>
      )}
    </div>
  );
};
