import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";

const App = () => {
  const { auth, user, isAuthenticated, isAuthLoading, register } = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  if (isAuthenticated && !isAuthLoading) {
    router.push("account");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(email, password, firstName, lastName);

    if (res.statusCode !== 201) {
      console.log(json);
      return;
    }
  };

  const loggedInMessage = user ? (
    <span className="text-white">Successfully registered {user.name}</span>
  ) : (
    ""
  );

  return (
    <div className="flex flex-col items-center  h-full py-20">
      <h1 className="font-cooper text-center text-4xl text-primary glow mb-4">
        Register a new account
      </h1>
      <span className="text-yellow-100  text-center mb-16 font-sans">
        You need an account to view your orders and download files
      </span>
      <form
        onSubmit={handleSubmit}
        className="flex  flex-col w-full sm:w-96 mb-10 gap-4"
      >
        <div className="flex flex-col">
          <label className="form_field_label" htmlFor="firstName">
            First name
          </label>
          <input
            className="form_field"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            name="firstName"
          />
        </div>
        <div className="flex flex-col">
          <label className="form_field_label" htmlFor="lastName">
            Last name
          </label>

          <input
            className="form_field"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="lastName"
          />
        </div>
        <div className="flex flex-col">
          <label className="form_field_label" htmlFor="email">
            Email
          </label>
          <input
            className="form_field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
          />
        </div>
        <div className="flex flex-col">
          <label className="form_field_label" htmlFor="password">
            Password
          </label>
          <input
            className="form_field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </div>
        <button className="submit_button self-center" type="submit">
          Register
        </button>
        <span className="text-zinc-400 text-sm self-center">
          Already registered? <Link href='/login'><a>Sign in</a></Link>
        </span>
      </form>
      {loggedInMessage}
    </div>
  );
};

export default App;
