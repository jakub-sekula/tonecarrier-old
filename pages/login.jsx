import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { getUserDetails } from "../utils/wordpressApi";

const App = () => {
  // get login function from auth context
  const { auth, setAuth, login, user } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password)
        .then((res) => res.json())
        .catch((err) => console.error(err));

      if (res.token) {
        const userData = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/me`
        ).then((res) => res.json());

        const { id, name, user } = userData.user;

        setAuth({
          status: "SIGNED_IN",
          user: { id: id || null, name: name || null, user: user || null },
        });
        setUsername("");
        setPassword("");
        setCurrentUser(user);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("Error in login.jsx: ", error);
    }
  };

  const loggedInMessage = auth.user ? (
    <span className="text-white">Logged in as {user.name}</span>
  ) : (
    <span className="text-white">Logged out.</span>
  );

  return (
    <div className="flex flex-col items-center  h-full py-20">
      <h1 className="font-cooper text-4xl text-[#EFAF23] glow mb-4">
        Sign in to your account
      </h1>
      <span className="text-yellow-100 mb-16 font-sans">
        Access your orders or edit your details by signing in below
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col w-96 mb-10">
        <label
          className="font-sans text-yellow-500 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          className="border-2 border-zinc-200 rounded-full px-3 py-2 mb-4"
        />
        <label
          className="font-sans text-yellow-500 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          className="border-2 border-zinc-200 rounded-full px-3 py-2 mb-8"
        />

        <button className="bg-yellow-500 rounded-full w-max px-20 py-2 self-center" type="submit">Sign in</button>
      </form>
      {loggedInMessage}
      {user ? (
        <Link href="/orders">
          <a className="text-yellow-100 italic">Go to orders</a>
        </Link>
      ) : null}
    </div>
  );
};

export default App;
