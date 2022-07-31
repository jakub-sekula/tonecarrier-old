import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";

const App = () => {
  // get login function from auth context
  const { auth, login, ...rest } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setCurrentUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      const json = await res.json();

      if (res.status === 200) {
        console.log(json);
        setUsername("");
        setPassword("");
        setCurrentUser(json.user);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("kek", error);
    }
  };
  console.log(auth);
  const loggedInMessage = auth.user ? (
    <h1>Logged in as {auth.user.name}</h1>
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
    </div>
  );
};

export default App;
