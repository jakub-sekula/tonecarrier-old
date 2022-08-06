import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../components/contexts/AuthContext";

const Forgot = () => {
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
    <div className="flex flex-col items-center  h-full py-20 gap-8">
      <h1 className="font-cooper text-center text-4xl text-[#EFAF23] glow mb-4">
        Reset your password
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full sm:w-96 mb-10 gap-4"
      >
        <div className="flex flex-col">
          <label className="form_field_label" htmlFor="username">
            Enter your account email
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            className="form_field"
          />
        </div>
        <button className="submit_button" type="submit">
          Send reset link
        </button>
      </form>
    </div>
  );
};

export default Forgot;
