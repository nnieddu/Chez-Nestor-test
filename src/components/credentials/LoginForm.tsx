import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import ErrorDisplay from "../ErrorDisplay";
import { PropertyAdsContext } from "../../contexts/PropertyAdsContext";
import logo from "../../style/img/logo.png";

interface LoginResponse {
  localId: string;
  email: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, apiKey, setError, error } = useContext(PropertyAdsContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
		var emailInput = (document.getElementById('emailInput') as HTMLInputElement)?.value; //
		var passwordInput = (document.getElementById('passwordInput') as HTMLInputElement)?.value; //
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(`Erreur de connection : ${responseData.error.message}`);
      }
      const responseLoginData: LoginResponse = await response.json();
      setIsLoggedIn(true);
      localStorage.setItem("idToken", responseLoginData.idToken);
      <Navigate to="/ChezNestorImmo" />;
    } catch (error) {
      setError(error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="py-8 opacityAnimHalf">
        <img
          className="m-auto -z-10 object-cover brightness-50 max-w-[80vw] max-h-[20vh] h-auto w-auto"
          src={logo}
          alt="Living room background"
        />
      </div>
      <form
        className="lg:max-w-[50vw] max-w-[80vw] m-auto flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <label className="text-gray-700 font-medium" htmlFor="email">
          Adresse email:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-3"
          id="emailInput"
          type="text"
          required
          autoFocus
        />
        <label className="text-gray-700 font-medium" htmlFor="password">
          Mot de passe:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-3"
          id="passwordInput"
          type="password"
          required
        />
        {error ? <ErrorDisplay /> : <span className="text-transparent">{"ERROR"}</span>}
        <button className="bg-chezNestor hover:bg-chezNestorDark text-white rounded-lg py-2 px-4 hover:bg-blue-600">
          Se connecter{" "}
          {isLoading ? (
            <div
              className="text-white-600 ml-1 inline-block h-4 w-4 animate-spin rounded-full border-2
        border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            />
          ) : (
            <div className="ml-1 inline-block h-4 w-4" role="status" />
          )}
        </button>
        <br />
      </form>
    </>
  );
};

export default LoginForm;
