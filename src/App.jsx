import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, SideBar } from "./components";
import {
  Explore,
  Home,
  Playlist,
  ProductCategories,
  WatchLater,
} from "./pages";
import { VideoPlayer } from "./components/VideoPlayerSPA/VideoPlayer";
import { SinglePlaylist } from "./pages/SinglePlaylist/SinglePlaylist";

export function App() {
  return (
    <>
      <div className="gridContent">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/:categoryName" element={<ProductCategories />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="/playlists" element={<Playlist />} />
          <Route path="/playlist/:id" element={<SinglePlaylist />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
