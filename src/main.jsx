import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { VideoDataProvider } from "./contexts";
import { FeaturesProvider } from "./contexts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <StrictMode>
    <BrowserRouter>
        <VideoDataProvider>
          <FeaturesProvider>
            <App />
          </FeaturesProvider>
        </VideoDataProvider>
    </BrowserRouter>
  </StrictMode>
);
