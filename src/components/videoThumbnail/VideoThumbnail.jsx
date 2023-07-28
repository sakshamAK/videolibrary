import React from "react";
import { Link } from "react-router-dom";
import { useFeatures } from "../../contexts";
import styles from "./VideoThumbnail.module.css";

export const VideoThumbnail = ({ video }) => {
  const {
    _id,
    thumbnail,
    category = "",
    title = "",
    views = "",
    creator = "",
  } = video;
  const { toggleWatchLaterVideo, state } =
  useFeatures();
  
  return (
    <div className={`${styles.thumbnailContainer}`} key={_id}>
      <Link
        to={`/video/${_id}`}
        className={`${styles.thumbnailContainer}`}
      >
        <img
          className="img-resp"
          src={thumbnail}
          alt={category}
          title={title}
        />
        <div className={`${styles.description}`}>
          <div className={`${styles.categTitle}`}>
            <img src="https://picsum.photos/40/40" />
            <div>
              <h4>{title}</h4>
              <div>
                {category !== "" ? <h4>{category}</h4> : ""}
                {views !== "" ? (
                  <p>
                    {views} views | {creator}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className={`${styles.shortcutIconsContainer}`}>
        <button
          className={`${styles.shortcutIcons}`}
          title="watch later"
          onClick={(e) => {
            e.stopPropagation();
            toggleWatchLaterVideo(video);
          }}
        >
          <i
            className={
              state.watchLater?.find((item) => item._id === video._id)
                ? "material-icons"
                : "material-icons-outlined"
            }
          >
            watch_later
          </i>
        </button>
      </div>
    </div>
  );
};
