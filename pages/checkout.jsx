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

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Page = () => {
  const { cartItems } = useCart();
  const { isAuthLoading, user } = useAuth();
  const [secret, setSecret] = useState(null);
  const [orderData, setOrderData] = useState({});
  const [userDetails, setUserDetails] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ")[1] || "",
    email: user?.email || "mail@mail.com",
    id: user?.id || 0,
  });
  const [isEditing, setEditing] = useState(false);

  // fetch secret from local storage or generate new one
  useEffect(() => {
    console.log("useEffect ran");
    console.log({ isAuthLoading, secret, cartItems });

    if (!isAuthLoading && !secret && cartItems.length) {
      console.log("checking local secret first...");
      const localSecret = localStorage.getItem("clientSecret");

      // if (localSecret) {
      //   console.log("found local client secret!", localSecret);
      //   setSecret(localSecret);
      //   return;
      // }

      if (!isEditing) {
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
          const paymentIntentRes = await res.json();
          setSecret(paymentIntentRes.client_secret);
          // localStorage.setItem("clientSecret", paymentIntentRes.client_secret);

          return;
        };
        getSecret();
      }
    }
  }, [isAuthLoading, isEditing]);

  // set orderData when secret is fetched
  useEffect(() => {
    if (!isAuthLoading) {
      const orderData = {
        customer_id: user?.id || 0,
        payment_method: "stripe",
        payment_method_title: "Card",
        set_paid: true,
        line_items: cartItems.map((item) => {
          return { product_id: item.id, quantity: 1 };
        }),
        meta_data: [
          {
            key: "_stripe_intent_id",
            value: secret,
          },
        ],
      };
      console.log("orderdata within useeffect: ", orderData);
      setOrderData(orderData);
    }
  }, [secret]);

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
          
            {!isAuthLoading && secret && cartItems ? (
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
                />
              </Elements>
            ) : (
              <span>Loading Stripe checkout</span>
            )}
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
