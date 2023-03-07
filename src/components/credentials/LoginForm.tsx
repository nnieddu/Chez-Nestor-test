import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
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
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setIsLoading, apiKey } =
    useContext(PropertyAdsContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
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
      <Navigate to="/ChezNestorImmo" />;
    } catch (error) {
      console.error(error);
			// setError(error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative py-28  mt-[1%] opacityAnimHalf ">
        <img
          className="m-auto absolute inset-0 -z-10 h-[18vh] lg:h-full object-cover brightness-50"
          src={logo}
          alt="Living room background"
        />
      </div>
      <form
        className="lg:max-w-[50vw] max-w-[80vw] m-auto flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <label className="text-gray-700 font-medium" htmlFor="email">
          Adresse mail:
        </label>
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-3"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
          autoFocus
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
          Se connecter
        </button>
        <br />
      </form>
    </>
  );
};

export default LoginForm;
