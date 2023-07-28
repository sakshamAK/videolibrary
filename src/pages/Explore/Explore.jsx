import React, { useState } from 'react'
import { VideoThumbnail } from '../../components'
import { useVideoData } from '../../contexts'
import "./Explore.css";

export const Explore = () => {
    const { videoData } = useVideoData()
    const [searchVideo, setSearchVideo] = useState(videoData);

    const getVideoList = val => {
        const newRes = val === "" ? videoData : videoData.filter(item => item.title.toLowerCase().includes(val.toLowerCase()));
        setSearchVideo(newRes);
    }

    return (
        <div className="videoListing">
            <h1>Explore</h1>
            <input className="search-explore" type = "text" onChange={e => getVideoList(e.target.value)} placeholder='Search video by title' />
            <div className="videoContainer">
                {searchVideo?.map(video => (
                    <VideoThumbnail video = {video} />
                ))}
            </div>
        </div>
    )


    // Remove profile pic from category
// Put random profile pics for all video
// Placeholder - "Search video by title"
}
