import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../components/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Page = () => {
  const router = useRouter();
  const [secret, setSecret] = useState(null);
  const { isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !secret) {
      console.log("Running getSecret!");
      const getSecret = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/payment-intent`,
          {
            method: "POST",
            body: JSON.stringify({
              price: String(Math.floor(100 * router.query.price)),
            }),
          }
        );
        const { client_secret } = await res.json();
        setSecret(client_secret);
      };
      getSecret();
      console.log("Secret when getSecret ran: ", secret);
    }
  });

  const options = {
    clientSecret: secret,
    appearance: {
      theme: "night",
    },
  };

  return (
    <>
      {!isAuthLoading && secret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <h1 className="text-white">loading stripe checkout</h1>
      )}
    </>
  );
};

export default Page;
