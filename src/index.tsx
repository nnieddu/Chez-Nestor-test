import React from "react";
import ReactDOM from "react-dom/client";

import PropertyAdsContextProvider from "./contexts/PropertyAdsContext";
import App from "./components/App";
import "./style/index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <PropertyAdsContextProvider>
    <App />
  </PropertyAdsContextProvider>
  // {/* </React.StrictMode> */}
);
