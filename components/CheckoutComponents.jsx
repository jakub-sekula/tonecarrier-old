import { motion } from "framer-motion";

export const CheckoutFieldGroup = ({ children, title }) => {
  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      key={title}
    >
      <span className="font-cooper text-primary glow text-2xl">{title}</span>
      <div className="flex flex-col gap-4 p-6 border border-primary rounded-xl shadow-lg shadow-zinc-800">
        {children}
      </div>
    </motion.div>
  );
};

export const CheckoutPlaceOrderButton = ({ form, secret }) => {
  return (
    <>
      <button type="submit" form={form} className="button" disabled={!secret}>
        Place order
      </button>
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
          <span>
            {"No items in cart."}
            <br></br>
            <Link href="/products">
              <a className="text-primary underline">Browse products here.</a>
            </Link>
          </span>
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
import { MdSecurity } from "react-icons/md";

export const CheckoutPaymentForm = ({ guestCheckout, setGuestCheckout }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;


    const query = new URLSearchParams({
      name: user?.name,
      email: user?.email,
      
    })

    // confirm payment in Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/orders/processing?${query}`,
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
  }, [user, setGuestCheckout]);

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
          <span className="text-center flex  gap-2 items-center justify-center text-zinc-500">
            <MdSecurity size={18} /> Secure payment with Stripe
          </span>
        </CheckoutFieldGroup>
      </form>
    </>
  );
};
