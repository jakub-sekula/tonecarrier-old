import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import Link from "next/link";

const Header = ({ title }) => {
  const { auth, logout, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      return await logout().then((res) => {
      });
    } catch (error) {
      console.error("Error in header.jsx: ", error);
    }
  };

  const logOutButton = () => {
    if (!isAuthenticated) {
      return (
        <Link href={"/login"}>
          <a className="bg-slate-800 p-2 absolute right-6 rounded-md text-white">
            Log in
          </a>
        </Link>
      );
    } else {
      return (
        <button
          onClick={handleLogout}
          className="bg-slate-800 p-2 absolute right-6 rounded-md text-white"
        >
          Log out
        </button>
      );
    }
  };

  return (
    <header className="w-screen h-24 bg-slate-200 text-center shrink-0 flex justify-center relative items-center">
      {//display home button if not on homepage
      router.pathname !== '/' ? <Link href="/" >
        <a className="bg-slate-800 p-2 absolute left-6 rounded-md text-white">Go home</a>
      </Link>: null} 
      <h1>
        {title} {auth.status} as {auth?.user?.name} 
      </h1>
      {logOutButton()}
      
    </header>
  );
};

export default Header;
