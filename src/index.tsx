import { useContext, useEffect, useState } from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PropertyAdsContextProvider from "./contexts/PropertyAdsContext";
import { PropertyAdsContext } from "./contexts/PropertyAdsContext";

import Header from "./components/Header";
import Content from "./components/Content";
import DedicatedPage from "./components/DedicatedPage";
import LoginForm from "./components/LoginForm";

import "./style/index.css";

async function checkTokenValidity(token: string | null): Promise<boolean> {
  if (token == null) return false;

  const response = await fetch(
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyAAltWO-fGFPs41sJe6YyIlV59hIT7MuZU`,
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
  const { isLoggedIn, setIsLoggedIn } = useContext(PropertyAdsContext);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("idToken");

    if (token) {
      checkTokenValidity(token)
        .then((isValidToken: boolean) => {
          setIsTokenValid(isValidToken);
          setIsLoggedIn(isValidToken);
        })
        .catch((error: Error) => {
          console.error("Veuillez vous connecter : " + error);
        });
    } else {
      setIsTokenValid(false);
    }
  }, [setIsLoggedIn]);

  if (!isTokenValid && !isLoggedIn) {
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
  <PropertyAdsContextProvider>
    <App />
  </PropertyAdsContextProvider>
);
