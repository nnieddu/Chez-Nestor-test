import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PropertyAdsContextProvider from "./contexts/PropertyAdsContext";

import Header from "./components/Header";
import Content from "./components/Content";
import DedicatedPage from "./components/DedicatedPage";

import "./style/index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
  <PropertyAdsContextProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Content />
            </>
          }
        />
        <Route path="/property/:id" element={<DedicatedPage />} />
      </Routes>
    </BrowserRouter>
  </PropertyAdsContextProvider>
  </React.StrictMode>
);
