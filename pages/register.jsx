import { useEffect, useState } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setCurrentUser] = useState("");

  // log username to console when successfully registered
  useEffect(
    () => {console.log(user)}, [user]
  )


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("/api/register", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          email: email || "",
          username: email.split("@")[0] || "",
          password: password || "",
          first_name: firstName,
          last_name: lastName,
        }),
      });
      let json = await res.json();
      if (res.status !== 201) {
        console.log(json);
        return;
      }
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setCurrentUser(json.username);
      console.log(res)
    } catch (error) {
      console.error(error);
    }
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
