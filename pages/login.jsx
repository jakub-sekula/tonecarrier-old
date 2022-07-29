import { useState } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setCurrentUser] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("/api/login", {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      let json = await res.json();
      if (res.status === 200) {
        console.log(json);
        setUsername('')
        setPassword('')
        setCurrentUser(json.user)
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loggedInMessage = user ? <h1>Logged in as {user}</h1> : <h1>Logged out.</h1>

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
