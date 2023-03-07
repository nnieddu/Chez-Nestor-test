import { useContext, useEffect } from "react";
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
  const uidToken = localStorage.getItem("idToken");
	console.log("IS LOADING : ", isLoading);
  useEffect(() => {
    if (uidToken) {
      checkTokenValidity(uidToken, apiKey)
        .then(() => {
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error: Error) => {
          console.error(error + ": Veuillez vous connecter.");
          setIsLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, [setIsLoggedIn, setIsLoading, apiKey, uidToken]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
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
