import React from "react";
import ReactDOM from "react-dom/client";

import PropertyAdsContextProvider from "./contexts/PropertyAdsContext";

import "./style/index.css";

import Header from "./components/Header";
import Content from "./components/Content";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
    <PropertyAdsContextProvider>
      <Header />
      <Content />
    </PropertyAdsContextProvider>
  // </React.StrictMode>
);
