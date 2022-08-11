export const CheckoutFieldGroup = ({ children, title }) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-cooper text-primary glow text-2xl">{title}</span>
      <div className="flex flex-col gap-4 p-6 border border-primary rounded-xl shadow-lg shadow-zinc-800">
        {children}
      </div>
    </div>
  );
};

import { MdSecurity } from "react-icons/md";
export const CheckoutPlaceOrderButton = ({ form }) => {
  return (
    <>
      <button
        type="submit"
        form={form}
        className="button"
      >
        Place order
      </button>
      <span className="text-center flex  gap-2 items-center justify-center text-zinc-500">
        <MdSecurity size={18} /> Secure payment with Stripe
      </span>
    </>
  );
};

export const CheckoutTotals = ({ totalPrice }) => {
  return (
    <>
      <div className="flex font-sans text-zinc-200 align-center justify-between pt-4 border-t border-zinc-700">
        <h3>Subtotal</h3>
        <span>{totalPrice.toFixed(2)} GBP</span>
      </div>
      <div className="flex text-zinc-200 align-center justify-between ">
        <h3>Incl. VAT</h3>
        <span>{(0.2 * totalPrice).toFixed(2)} GBP</span>
      </div>
      <div className="border-t border-zinc-700 flex text-white text-lg align-center justify-between py-3 font-bold">
        <h3>Total</h3>
        <span className="font-bold text-lg">{`${totalPrice.toFixed(
          2
        )} GBP`}</span>
      </div>
    </>
  );
};

import Image from "next/image";
import Link from "next/link";
export const CheckoutProducts = ({ products, ...props }) => {
  return (
    <>
      <ul className="flex flex-col gap-4">
        {products.length ? (
          products.map((product) => {
            return <CheckoutLineItem product={product} key={product.key} />;
          })
        ) : (
          <span>No items in cart</span>
        )}
      </ul>
    </>
  );
};

export const CheckoutLineItem = ({ product }) => {
  return (
    <li className="group text-zinc-200 relative border-b border-zinc-800 flex gap-4 pb-3 font-sans last:border-0 last:p-0">
      <div className="w-16 h-16 shrink-0 relative rounded-md overflow-hidden">
        <Link href={product.url}>
          <a>
            <Image src={product.img} layout="fill" />
          </a>
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        <Link href={product.url}>
          <a className="group-hover:text-primary font-sans">{product.name}</a>
        </Link>
        <span className="w-max text-xs px-2 py-1 border text-primary border-primary rounded-md">
          {product.key}
        </span>
      </div>
      <div className="flex flex-col gap-2 ml-auto self-start">
        <span className="font-sans w-max text-right font-bold">
          {parseInt(product.price).toFixed(2)} GBP
        </span>
      </div>
    </li>
  );
};

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useRouter } from "next/router";

export const CheckoutPaymentForm = ({
  userDetails,
  orderData,
  setUserDetails,
  isEditing,
  setEditing,
  guestCheckout,
  setGuestCheckout,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const { setAuthLoading, user, logout, login } = useAuth();
  const router = useRouter();

  // console.log("userdetails", userDetails);
  // console.log("user", user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    // confirm payment in Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/orders/processing",
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }
  };

  
  

  useEffect(() => {
    setGuestCheckout(!user);
    console.log("!!user is ", !user);
  }, [user]);

  useEffect(() => {
    console.log("guest checkout status changed: ", guestCheckout);
  }, [guestCheckout]);

  return (
    <>
      <form
        id="checkout"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <CheckoutFieldGroup title="Payment details">
          <PaymentElement />
          {errorMessage && <div>{errorMessage}</div>}
        </CheckoutFieldGroup>
      </form>
    </>
  );
};
