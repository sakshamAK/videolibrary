import React from "react";
import { useParams } from "react-router-dom";
import { VideoThumbnail } from "../../components/videoThumbnail/VideoThumbnail";
import { useFeatures } from "../../contexts";
import styles from "./SinglePlaylist.module.css";

export const SinglePlaylist = () => {
  const { state, removeVideoFromPlaylist } = useFeatures();
  const { id } = useParams();
  const selectedPlaylist = state.playlists?.find((item, idx) => idx === Number(id));
  const myPlaylist = selectedPlaylist ? selectedPlaylist : [];
  return (
    <div className="videoListing">
      <h1>{myPlaylist.title}</h1>
      <div className="videoContainer">
        {myPlaylist.videos?.map((item) => (
          <div className = {`${styles.closeIconContainer}`}>
            <i className = "material-icons" onClick = {() => removeVideoFromPlaylist(Number(id), item._id)} >close</i>
            <VideoThumbnail video={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
