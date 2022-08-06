import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../components/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CheckoutProducts from "../components/CheckoutProducts";
import { fetchWooCommerceProducts } from "../utils/wooCommerceApi";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const line_items = [
  {
    product_id: 21,
    quantity: 1,
  },
  {
    product_id: 22,
    quantity: 1,
  },
  {
    product_id: 23,
    quantity: 1,
  },
];

// const products = [
//   {
//     id: 1,
//     name: "Orange juice",
//     price: 21.37
//   },
//   {
//     id: 2,
//     name: "Gorilla munch",
//     price: 6.90
//   },
//   {
//     id: 3,
//     name: "Police brutality",
//     price: 9.97
//   },
// ]

const Page = ({ products }) => {
  const router = useRouter();
  const [secret, setSecret] = useState(null);
  const { isAuthLoading } = useAuth();

  let arr = [];

  products.map((product) => {
    arr.push({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  const totalPrice = arr.reduce((total, num)=> {
    return total + parseInt(num.price)
  },0)


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
        <>
          <h1 className="font-cooper text-center text-4xl text-[#EFAF23] glow mb-4">
            Checkout
          </h1>
          <span className="text-yellow-100  text-center mb-16 font-sans">
            Enter your card details to complete the transaction
          </span>
          <div className="flex gap-8 flex-col-reverse md:grid md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <h2 className="font-bold text-white text-xl">Your details</h2>
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm/>
              </Elements>
            </div>
            <div className="flex flex-col gap-4 md:col-span-4">
              <span className="font-bold text-white text-xl">Your products</span>
              <div className="h-48 overflow-y-scroll">
                <CheckoutProducts products={arr} />
              </div>
              <span className="self-end font-fold text-white text-xl">Total: £{totalPrice}</span>
            </div>
          </div>
          ){" "}
        </>
      ) : (
        <h1 className="text-white">loading stripe checkout</h1>
      )}
    </>
  );
};

export default Page;

export const getServerSideProps = async () => {
  const endpoint = "products";
  const fetch_params = {
    per_page: 100,
  };

  const products = await fetchWooCommerceProducts(endpoint, fetch_params).catch(
    (error) => {
      console.log(error);
    }
  );

  return {
    props: {
      products: products.data,
    },
  };
};
