import React from 'react'
import { useParams } from 'react-router-dom';
import { VideoThumbnail } from '../../components';
import { useVideoData } from '../../contexts'

export const ProductCategories = () => {
    const { videoData } = useVideoData();
    const { categoryName } = useParams();
    return (
        <div className="videoListing" >
            <h1>{categoryName}</h1>
            <div className="videoContainer">
                {videoData?.filter(({ category }) => category === categoryName)
                    .map((video) => (
                        <VideoThumbnail video = { video } />
                    ))}
            </div>
        </div>
    )
}
