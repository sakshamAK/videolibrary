import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { categories } from "../../db/categories";
import { videos } from "../../db/videos";

const VideoDataContext = createContext(null);
const useVideoData = () => useContext(VideoDataContext);

const getVideoData = () => {
    const data = videos;
    return data;
}

const getCategoriesData = () => {
    const data = categories;
    return data;
}

const VideoDataProvider = ({ children }) => {
    const videoData = getVideoData();
    const categoryData = getCategoriesData();

    return (
        <VideoDataContext.Provider value={{ videoData, categoryData }}>
            {children}
        </VideoDataContext.Provider>
    )
}

export { useVideoData, VideoDataProvider }