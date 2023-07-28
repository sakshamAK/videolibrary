import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useVideoData, useFeatures } from "../../contexts";
import styles from "./VideoPlayer.module.css";

export const VideoPlayer = () => {
  const { id } = useParams();
  const { videoData } = useVideoData();
  const {
    toggleWatchLaterVideo,
    state,
    addToPlaylist,
    removeFromPlaylist,
    title,
    description,
    setTitle,
    setNotesDetails,
    note,
    setDescription,
    addVideoToPlaylist,
    addToNotes,
    removeFromNotes,
    editNotes
  } = useFeatures();
  const videoItem = videoData?.find((video) => video._id === Number(id));
  const [showPlaylist, setPlaylistMode] = useState(false);
  const [showNotes, setNotes] = useState(false);
  const [buttonNotesValue, setButtonNotesValue] = useState("Add New Note");

  return (
    <div className={`${styles.SPVideogrid} videoListing`}>
      <iframe
        className={`${styles.embededPlayer}`}
        src={videoItem.src}
        frameBorder="0"
        allow="autoplay"
      ></iframe>
      <div>
        <div className={`${styles.actionButtons}`}>
          <img src="https://picsum.photos/40/40" />
          <h4>{videoItem.title}</h4>
          <div className={`${styles.actionIcons}`}>
            <i
              className={
                state.watchLater?.find((item) => item._id === videoItem._id)
                  ? "material-icons"
                  : "material-icons-outlined"
              }
              onClick={() => toggleWatchLaterVideo(videoItem)}
            >
              watch_later
            </i>
            <i
              className="material-icons"
              onClick={() => {
                setPlaylistMode(showPlaylist ? false : true)
                setNotes(false)
              }}
            >
              playlist_add
            </i>
            <i
              className="material-icons"
              onClick={() => {
                setNotes(showNotes ? false : true)
                setButtonNotesValue("Add New Note");
                setPlaylistMode(false)
              }}
            >
              edit_note
            </i>
          </div>
          {showNotes && <div className={`${styles.addPlaylist}`}>
            <i className="material-icons" style={{ marginLeft: "auto", cursor: "pointer" }} onClick={() => setNotes(false)}>close</i>
            <input
              className={`${styles.playlistInp}`}
              type="text"
              placeholder="Write your notes here"
              value={note.note}
              onChange={(e) => setNotesDetails(p => ({ ...p, note: e.target.value }))}
            />
            <button
              className={`${styles.playlistBtn} btn`}
              onClick={(e) => {
                e.target.textContent === "Add New Note" ? addToNotes() : editNotes(note.note, note.idx);
                setNotes(false)
              }}
            >
              {buttonNotesValue}
            </button>
            <hr />
          </div>}
          {showPlaylist && (
            <div className={`${styles.addPlaylist}`}>
              <h3>Add To Playlist</h3>
              <input
                className={`${styles.playlistInp}`}
                type="text"
                placeholder="Enter title of your playlist"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className={`${styles.playlistInp}`}
                type="text"
                placeholder="Write a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                className={`${styles.playlistBtn} btn`}
                onClick={addToPlaylist}
              >
                Create New Playlist
              </button>
              <hr />
              <ul className={`${styles.createdPlaylists}`}>
                {state?.playlists.map((playlist, idx) => (
                  <li onClick={() => addVideoToPlaylist(idx, videoItem)}>
                    <p>{playlist.title}</p>
                    <i
                      className="material-icons"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromPlaylist(idx);
                      }}
                    >
                      close
                    </i>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <hr />
          <h2 style={{ margin: "2rem 0 1rem 0" }}>My Notes</h2>
          <ul className={`${styles.createdNotes}`}>
            {state?.notes.map((note, idx) => (
              <li style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                {note}
                <div>
                  <i
                    className="material-icons"
                    style={{ marginRight: "1rem", cursor: "pointer" }}
                    onClick={e => {
                      setNotes(true)
                      console.log(note);
                      setNotesDetails({ note, idx });
                      setButtonNotesValue("Edit Note");
                    }}>
                    edit
                  </i>

                  <i className="material-icons" style={{ cursor: "pointer" }} onClick={() => removeFromNotes(idx)}>delete</i>
                </div>

              </li>
            ))}
          </ul>
        </div>
      </div>
      <aside className={`${styles.sideList}`}>
        <h3>More Videos: </h3>
        {videoData.map((videoElement) => (
          <div key={videoElement.id} className={`${styles.sideListCard} card`}>
            <div className={`${styles.sideListItem} horiz`}>
              <img
                className={`${styles.horizImg}`}
                src={videoElement.thumbnail}
                alt={videoElement.category}
              />
              <div className={`${styles.vertText} vert-txt`}>
                <h5>{videoElement.title}</h5>
                <p> {videoElement.creator}</p>
              </div>
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
};
