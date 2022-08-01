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
    <h1>Logged in as {user.name}</h1>
  ) : (
    <h1>Logged out.</h1>
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-48">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          className="border border-black"
        />
        <label htmlFor="username">Username</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          className="border border-black"
        />
        <label htmlFor="password">Password</label>
        <button type="submit">Submit</button>
      </form>
      {loggedInMessage}
      {user ?
      <Link href="/orders">
        <a>Go to orders</a>
      </Link>:null}
    </div>
  );
};

export default App;
