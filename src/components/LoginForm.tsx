import { useState } from "react";

type Props = {
  onLogin: (username: string, password: string) => void;
};

const LoginForm = ({ onLogin }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
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
      <button className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
