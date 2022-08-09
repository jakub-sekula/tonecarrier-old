import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";

const App = () => {
  // get login function from auth context
  const { login, isAuthenticated, isAuthLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  if (isAuthenticated && !isAuthLoading) {
    router.push("account");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password).catch((err) =>
        console.error(err)
      );

      if (res.statusCode !== 200)
        return console.log(res.statusCode, res.message);
    } catch (error) {
      console.error("Error in login.jsx: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center  h-full py-20">
      <h1 className="font-cooper text-center text-4xl text-primary glow mb-4">
        Sign in to your account
      </h1>
      <span className="text-yellow-100 mb-16 font-sans text-center">
        Access your orders or edit your details by signing in below
      </span>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full sm:w-96 mb-10 gap-4"
      >
        <div className="flex flex-col">
          <label className="form_field_label" htmlFor="username">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            className="form_field"
          />
        </div>
        <div className="flex flex-col">
          <label className="form_field_label" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="form_field"
          />
        </div>
        <button className="submit_button self-center" type="submit">
          Sign in
        </button>
        <span className="text-zinc-400 text-sm self-center">
          <Link href="/forgot"><a>Forgot password?</a></Link>
        </span>
      </form>
    </div>
  );
};

export default App;
