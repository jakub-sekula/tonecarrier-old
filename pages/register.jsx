import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";

const App = () => {
  const { register } = useAuth();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setCurrentUser] = useState("");

  // log username to console when successfully registered
  useEffect(() => {
    console.log('registered ', user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      const res = await register(email, password, firstName, lastName);
      const json = await res.json();

      if (res.status !== 201) {
        console.log(json);
        return;
      }
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setCurrentUser(json.username);
  };

  const loggedInMessage = user ? <h1>Successfully registered {user}</h1> : "";

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-48">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          name="firstName"
          className="border border-black"
        />
        <label htmlFor="firstName">First name</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          name="lastName"
          className="border border-black"
        />
        <label htmlFor="lastName">Last name</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          className="border border-black"
        />
        <label htmlFor="email">Email</label>
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
