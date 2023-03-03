import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { PropertyAdsContext } from "../contexts/PropertyAdsContext";
import logo from "../style/logo.png";

interface LoginResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn } = useContext(PropertyAdsContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAltWO-fGFPs41sJe6YyIlV59hIT7MuZU`,
        // `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: username,
            password,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data: LoginResponse = await response.json();
      setIsLoggedIn(true);
      localStorage.setItem("idToken", data.idToken);
			<Navigate to="/ChezNestorImmo" />
    } catch (error) {
      console.error(error);
			//add error display for user
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="relative py-28  mt-[1%]">
          <img
            className="m-auto absolute inset-0 -z-10 h-[18vh] lg:h-full object-cover brightness-50"
            src={logo}
            alt="Living room background"
          />
        </div>
      )}
      <form
        className={`lg:max-w-[50vw] max-w-[80vw] m-auto flex flex-col space-y-4 ${
          isLoading ? "hidden" : ""
        }`}
        onSubmit={handleSubmit}
      >
        <label className="text-gray-700 font-medium" htmlFor="username">
          Username:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-3"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="text-gray-700 font-medium" htmlFor="password">
          Password:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-3"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-chezNestor hover:bg-chezNestorDark text-white rounded-lg py-2 px-4 hover:bg-blue-600">
          Login
        </button>
				<br/>
      </form>
    </>
  );
};

export default LoginForm;
