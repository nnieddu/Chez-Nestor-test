import React, { useContext, useEffect, useState } from "react";

import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import PropertyAdsContextProvider from "./contexts/PropertyAdsContext";
import { PropertyAdsContext } from "./contexts/PropertyAdsContext";

import Header from "./components/Header";
import Content from "./components/Content";
import DedicatedPage from "./components/DedicatedPage";
import LoginForm from "./components/LoginForm";
import Loading from "./components/Loading";

import "./style/index.css";

async function checkTokenValidity(token: string | null): Promise<boolean> {
  if (token == null) return false;
  
  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  console.log(apiKey)
  
  const response = await fetch(
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: token,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  if (data.hasOwnProperty("error")) return false;
  return true;
}

const App = () => {
  const { isLoggedIn, setIsLoggedIn, isLoading, setIsLoading } = useContext(PropertyAdsContext);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("idToken");

    if (token) {
      checkTokenValidity(token)
        .then((isValidToken: boolean) => {
          setIsTokenValid(isValidToken);
          setIsLoggedIn(isValidToken);
			    setIsLoading(false);
        })
        .catch((error: Error) => {
          console.error("Veuillez vous connecter : " + error);
    			setIsLoading(false);
        });
    } else {
      setIsTokenValid(false);
			setIsLoading(false);
    }
  }, [setIsLoggedIn, setIsLoading]);

	if (isLoading) {
    return <Loading />;
  }

  if (!isTokenValid && !isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <HashRouter>
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
        <Route path="*" element={<Navigate to="/ChezNestorImmo" />} />
      </Routes>
    </HashRouter> 
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <PropertyAdsContextProvider>
    <App />
  </PropertyAdsContextProvider>
  // </React.StrictMode>

);
