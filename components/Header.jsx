import { useRouter } from "next/router";
import { useAuth } from "./contexts/AuthContext";
import { useCart } from "./contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

const Header = (props) => {
  const { auth, logout, isAuthLoading, isAuthenticated } = useAuth();
  const { cartItems, setCartItems, clearCart } = useCart();
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
    <header className="w-full flex flex-wrap flex-col h-min-24 p-4 bg-zinc-700 text-white text-center shrink-0 gap-4 justify-center relative items-center">
      <Link href="/">
        <a>
          <Image src="/static/logo.svg" width={100} height={50}></Image>
        </a>
      </Link>
      <h1>
        {isAuthenticated && !isAuthLoading
          ? `Hello there ${auth.user.name}. Items in cart: ${cartItems.length}`
          : null}
      </h1>
      <ul className="gap-4 flex flex-wrap">
        <Link href="/products">
          <a className="bg-slate-800 p-2 rounded-md text-white">Products</a>
        </Link>
        <Link href="/auth">
          <a className="bg-slate-800 p-2 rounded-md text-white">Auth</a>
        </Link>
        <Link href="/account">
          <a className="bg-slate-800 p-2 rounded-md text-white">Account</a>
        </Link>
        <Link href="/orders">
          <a className="bg-slate-800 p-2 rounded-md text-white">List orders</a>
        </Link>
        <Link href="/register">
          <a className="bg-slate-800 p-2 rounded-md text-white">Register</a>
        </Link>
        <Link href="/login">
          <a className="bg-slate-800 p-2 rounded-md text-white">Log in</a>
        </Link>
        <Link href="/checkout">
          <a className="bg-slate-800 p-2 rounded-md text-white">Checkout</a>
        </Link>
        <button
          className="bg-slate-800 p-2 rounded-md text-white"
          onClick={clearCart}
        >
          {" "}
          Clear cart{" "}
        </button>
        {logOutButton()}
      </ul>
    </header>
  );
};

export default Header;
