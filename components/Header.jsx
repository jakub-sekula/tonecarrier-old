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
      return await logout().then((res) => {});
    } catch (error) {
      console.error("Error in header.jsx: ", error);
    }
  };

  const logOutButton = () => {
    if (!isAuthenticated) {
      return (
        <Link href={"/login"}>
          <a className="bg-slate-800 p-2  rounded-md text-white">Log in</a>
        </Link>
      );
    } else {
      return (
        <button
          onClick={handleLogout}
          className="bg-slate-800 p-2 rounded-md text-white"
        >
          Log out
        </button>
      );
    }
  };

  return (
    <header className="w-screen  flex flex-col h-min-24 p-4 bg-zinc-700 text-white text-center shrink-0 gap-4 justify-center relative items-center">
      <h1>
        {title} {auth.status} as {auth?.user?.name}
      </h1>
      <ul className="gap-4 flex">
        {
          //display home button if not on homepage
          router.pathname !== "/" ? (
            <Link href="/">
              <a className="bg-slate-800 p-2 rounded-md text-white">
                Home
              </a>
            </Link>
          ) : null
        }
        <Link href="/products">
          <a className="bg-slate-800 p-2 rounded-md text-white">Products</a>
        </Link>
        <Link href="/auth">
          <a className="bg-slate-800 p-2 rounded-md text-white">Auth</a>
        </Link>
        <Link href="/api/list-orders">
          <a className="bg-slate-800 p-2 rounded-md text-white">List orders</a>
        </Link>
        <Link href="/register">
          <a className="bg-slate-800 p-2 rounded-md text-white">Register</a>
        </Link>
        <Link href="/login">
          <a className="bg-slate-800 p-2 rounded-md text-white">Log in</a>
        </Link>
        {logOutButton()}
      </ul>
    </header>
  );
};

export default Header;
