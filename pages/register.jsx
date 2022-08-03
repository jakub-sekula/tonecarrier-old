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
      <h1 className="font-cooper text-4xl text-[#EFAF23] glow mb-4">
        Register a new account
      </h1>
      <span className="text-yellow-100 mb-16 font-sans">
        You need an account to view your orders and download files
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col w-96 mb-10">
        <label
          className="font-sans text-yellow-500 text-sm font-bold mb-2"
          htmlFor="firstName"
        >
          First name
        </label>
        <input
          className="border-2 border-zinc-200 rounded-full px-3 py-2 mb-4"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          name="firstName"
        />
        <label
          className="font-sans text-yellow-500 text-sm font-bold mb-2"
          htmlFor="lastName"
        >
          Last name
        </label>

        <input
          className="border-2 border-zinc-200 rounded-full px-3 py-2 mb-4"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          name="lastName"
        />
        <label
          className="font-sans text-yellow-500 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="border-2 border-zinc-200 rounded-full px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
        />
        <label
          className="font-sans text-yellow-500 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="border-2 border-zinc-200 rounded-full px-3 py-2 mb-8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
        />
        <button
          className="bg-yellow-500 rounded-full w-max px-20 py-2 self-center"
          type="submit"
        >
          Register
        </button>
      </form>
      {loggedInMessage}
    </div>
  );
};

export default App;
