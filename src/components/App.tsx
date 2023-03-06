import { useContext, useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";
import Header from "./Header";
import Content from "./Content";
import DedicatedPage from "./DedicatedAdPage";
import LoginForm from "./credentials/LoginForm";
import Loading from "./Loading";
import { checkTokenValidity } from "./credentials/CheckTokenValidity";

const App = () => {
  const { isLoggedIn, setIsLoggedIn, isLoading, setIsLoading, apiKey } =
    useContext(PropertyAdsContext);
  const [isTokenValid, setIsTokenValid] = useState(false);
	const uidToken = localStorage.getItem("idToken");

	useEffect(() => {
    setIsLoading(true);
    if (uidToken) {
      checkTokenValidity(uidToken, apiKey)
        .then((isValidToken: boolean) => {
          setIsTokenValid(isValidToken);
          setIsLoggedIn(isValidToken);
          setIsLoading(false);
        })
        .catch((error: Error) => {
          console.error("Veuillez vous connecter : " + error.message);
          setIsLoading(false);
        });
    } else {
      setIsTokenValid(false);
      setIsLoading(false);
    }
  }, [setIsLoggedIn, setIsLoading, apiKey, uidToken]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isTokenValid && !isLoggedIn && !isLoading) {
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

export default App;
