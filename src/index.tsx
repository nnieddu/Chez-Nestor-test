import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PropertyAdsContextProvider from "./contexts/PropertyAdsContext";
import { PropertyAdsContext } from "./contexts/PropertyAdsContext";

import Header from "./components/Header";
import Content from "./components/Content";
import DedicatedPage from "./components/DedicatedPage";
import LoginForm from "./components/LoginForm";

import "./style/index.css";

const App = () => {
  const { isLoggedIn } = useContext(PropertyAdsContext);

  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/ChezNestorImmo"
            element={
              <>
                <Header />
                <Content />
              </>
            }
          />
          <Route path="/property/:id" element={<DedicatedPage />} />
					<Route path="*" element={<Navigate to="/ChezNestorImmo" />} />
        </Routes>
      </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <PropertyAdsContextProvider>
		<App />
    </PropertyAdsContextProvider>
  </React.StrictMode>
);
