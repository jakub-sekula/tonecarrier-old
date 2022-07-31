import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";

const Header = ({ title }) => {
  const { auth, logout, ...rest } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      return await logout().then((res) => {
        console.log(res.status, auth)
      });
    } catch (error) {
      console.error("kek", error);
    }
  };

  const logOutButton = () => {
    if (auth.status === "SIGNED_OUT") {
      return;
    } else {
      return (
        <button
          onClick={handleSubmit}
          className="bg-slate-800 p-2 absolute right-6 rounded-md text-white"
        >
          Log out
        </button>
      );
    }
  };

  return (
    <header className="w-screen h-24 bg-slate-200 text-center shrink-0 flex justify-center relative items-center">
      <h1>
        {title} {auth.status} as {auth?.user?.name}
      </h1>
      {logOutButton()}
    </header>
  );
};

export default Header;
