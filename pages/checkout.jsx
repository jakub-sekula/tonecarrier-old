import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useAuth } from "../components/contexts/AuthContext";
import { useCart } from "../components/contexts/CartContext";
import { useEffect, useState } from "react";
import {
  CheckoutFieldGroup,
  CheckoutTotals,
  CheckoutPlaceOrderButton,
  CheckoutProducts,
  CheckoutPaymentForm,
} from "../components/CheckoutComponents";
import Link from "next/link";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Page = () => {
  const { cartItems, isCartLoading } = useCart();
  const { isAuthLoading, user } = useAuth();
  const [secret, setSecret] = useState(null);
  const [guestCheckout, setGuestCheckout] = useState(true);
  const [orderData, setOrderData] = useState({});
  const [userDetails, setUserDetails] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ")[1] || "",
    email: user?.email || "",
    id: user?.id || 0,
  });

  useEffect(() => {
    if (!isAuthLoading) {
      setUserDetails({
        firstName: user?.name.split(" ")[0] || "",
        lastName: user?.name.split(" ")[1] || "",
        email: user?.email || "twojstary@gmail.com",
        id: user?.id || 0,
      });
    }
  }, [isAuthLoading]);

  // fetch secret from local storage or generate new one
  useEffect(() => {
    console.log("useEffect ran");
    console.log({ isAuthLoading, isCartLoading, secret, cartItems });

    if (!cartItems.length) {
      return console.log("cart is empty!");
    }

    if (!isAuthLoading && !isCartLoading && !secret && cartItems.length) {
      console.log("checking local secret first...");
      const localSecret = localStorage.getItem("clientSecret");

      if (localSecret) {
        console.log("found local client secret!", localSecret);
        setSecret(localSecret);
        return;
      }

      console.log("Running getSecret!");
      const getSecret = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/create-payment-intent`,
          {
            method: "POST",
            body: JSON.stringify({
              price: String(Math.floor(100 * totalPrice)),
              email: user?.email || userDetails.email,
            }),
          }
        );
        // console.log('res is', res)

        if (res.status !== 201) return console.log("Fetching secret failed");

        const paymentIntentRes = await res.json();
        setSecret(paymentIntentRes.client_secret);
        // localStorage.setItem("clientSecret", paymentIntentRes.client_secret);

        return;
      };
      getSecret();
    }
  }, [isAuthLoading, isCartLoading]);

  const options = {
    clientSecret: secret,
    appearance: {
      theme: "night",
      variables: {
        colorPrimary: "#EFAF23",
      },
    },
    loader: "always",
  };

  const totalPrice = cartItems
    ? cartItems.reduce((total, num) => {
        return total + parseFloat(num.price);
      }, 0)
    : 0;

  return (
    <>
      <h1 className="font-cooper text-center text-4xl text-primary glow mb-4">
        Checkout
      </h1>
      <span className="text-yellow-100  text-center mb-16 font-sans">
        Complete your transaction and get scanning in no time
      </span>
      <div className="flex gap-8 flex-col-reverse md:grid md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7 flex flex-col gap-4">
          {!cartItems.length ? (
            <span>
              There are no items in your cart.{" "}
              <Link href="/products">
                <a>Why don't you add some?</a>
              </Link>
            </span>
          ) : null}

          {!isAuthLoading && !secret ? (
            <span>zesralo sie</span>
          ) : null}

          {!isAuthLoading && secret ? (
            <Elements
              stripe={stripePromise}
              options={options}
              key={options.clientSecret}
            >
              <CheckoutPaymentForm
                id="checkout"
                orderData={orderData}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                guestCheckout={guestCheckout}
                setGuestCheckout={setGuestCheckout}
              />
            </Elements>
          ) : null}
        </div>
        <div className="flex flex-col gap-4 md:col-span-5">
          <CheckoutFieldGroup title="Your products">
            <CheckoutProducts
              products={cartItems}
              total={totalPrice}
              form="checkout"
            />
            <CheckoutTotals totalPrice={totalPrice}></CheckoutTotals>
            <CheckoutPlaceOrderButton form="checkout" />
          </CheckoutFieldGroup>
        </div>
      </div>
    </>
  );
};

export default Page;
