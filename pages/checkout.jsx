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
  const { setAuthLoading, isAuthLoading, user, login, logout } = useAuth();
  const [secret, setSecret] = useState(null);
  const [guestCheckout, setGuestCheckout] = useState(true);
  const [orderData, setOrderData] = useState({});
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isEditing, setEditing] = useState(true);
  const [userDetails, setUserDetails] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ")[1] || "",
    email: user?.email || "",
    id: user?.id || 0,
  });

  useEffect(() => {
    setUserDetails({
      firstName: user?.name.split(" ")[0] || "",
      lastName: user?.name.split(" ")[1] || "",
      email: user?.email || "",
      id: user?.id || 0,
    });

    if (!isAuthLoading && user) {
      setGuestCheckout(false);
      setEditing(false);
    }
  }, [isAuthLoading]);

  // fetch secret from local storage or generate new one
  useEffect(() => {
    console.log("useEffect ran");
    console.log({ isAuthLoading, isCartLoading, secret, cartItems, isEditing });

    if (!cartItems.length) {
      return console.log("cart is empty!");
    }

    if (
      !isAuthLoading &&
      !isCartLoading &&
      !secret &&
      cartItems.length &&
      !isEditing
    ) {
      console.log("checking local secret first...");
      const localPaymentIntent = JSON.parse(
        localStorage.getItem("payment_intent")
      );
      console.log({ localPaymentIntent });

      if (localPaymentIntent) {
        console.log("found local payment intent!", localPaymentIntent);
        setSecret(localPaymentIntent.client_secret);
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

        const { client_secret, id } = await res.json();

        setSecret(client_secret);
        localStorage.setItem(
          "payment_intent",
          JSON.stringify({ client_secret, id })
        );

        return;
      };
      getSecret();
    }
  }, [isAuthLoading, isCartLoading, isEditing]);

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

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    await cancelIntent();
    setEditing(true);
    setSecret(null);
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await login(
        loginData["username"],
        loginData["password"]
      ).catch((err) => console.error(err));

      console.log("res: ", res);

      if (res.statusCode !== 200) {
        return console.log(res.statusCode, res.message);
      }

      await cancelIntent();
      setGuestCheckout(false);
      setEditing(false);

      // setUserDetails()
    } catch (error) {
      console.error("Error in login.jsx: ", error);
    }
  };

  const handleUserInfoEdit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      setEditing(true);
      setSecret(null);
      await cancelIntent();
      localStorage.removeItem("payment_intent");
      return;
    }
    setEditing(false);
  };

  const cancelIntent = async () => {
    try {
      const { id } = JSON.parse(localStorage.getItem("payment_intent"));

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/cancel-payment-intent?payment_intent_id=${id}`,
        {
          method: "POST",
        }
      );

      localStorage.getItem("payment_intent")
        ? localStorage.removeItem("payment_intent")
        : null;
    } catch (error) {
      console.log(error);
    }
  };

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

          <CheckoutFieldGroup title="Your details">
            {/* Guest and login selector if user is not signed in */}
            <div className={`${user ? "hidden" : null}`}>
              <input
                type="radio"
                checked={guestCheckout}
                id="Yes"
                name="guestCheckout"
                onChange={() => {
                  setGuestCheckout(true);
                }}
                disabled={!!user}
              />
              <label htmlFor="Yes">Guest</label>

              <input
                type="radio"
                checked={!guestCheckout}
                id="No"
                name="guestCheckout"
                onChange={() => {
                  setGuestCheckout(false);
                }}
                disabled={!!user}
              />
              <label htmlFor="No">Registered</label>
            </div>

            {guestCheckout ? (
              <form
                className="flex flex-col gap-4"
                onSubmit={handleUserInfoEdit}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <label
                      className="form_field_label w-full"
                      htmlFor="firstName"
                    >
                      First name
                    </label>
                    <input
                      value={userDetails["firstName"]}
                      onChange={handleChange}
                      type="text"
                      name="firstName"
                      className="form_field w-full"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Last name */}
                  <div className="flex flex-col w-full">
                    <label
                      className="form_field_label w-full"
                      htmlFor="lastName"
                    >
                      Last name
                    </label>
                    <input
                      value={userDetails["lastName"]}
                      onChange={handleChange}
                      type="text"
                      name="lastName"
                      className="form_field w-full"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col w-full">
                  <label className="form_field_label w-full" htmlFor="email">
                    Email
                  </label>
                  <input
                    value={userDetails["email"]}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="form_field w-full "
                    disabled={!isEditing}
                  />
                </div>
                <span className="text-xs text-zinc-500">
                  A user account will be created for you so you can access your
                  downloads at any time
                </span>
                <div className="flex gap-4 justify-end">
                  {isEditing ? (
                    <button className="button">Continue</button>
                  ) : (
                    <button className="button">Edit</button>
                  )}
                </div>
              </form>
            ) : null}

            {!guestCheckout && user ? (
              <div>
                <p>{`${userDetails.firstName} ${userDetails.lastName}`}</p>
                <p>{`${userDetails.email}`}</p>
                <button onClick={handleLogout}>sign out</button>
              </div>
            ) : null}

            {!guestCheckout && !user ? (
              <div>
                <span>sign in to your account</span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col w-full">
                      <label
                        className="form_field_label w-full"
                        htmlFor="email"
                      >
                        Username
                      </label>
                      <input
                        value={loginData["username"]}
                        onChange={handleLoginChange}
                        type="text"
                        name="username"
                        className="form_field w-full"
                      />
                    </div>

                    {/* Last name */}
                    <div className="flex flex-col w-full">
                      <label
                        className="form_field_label w-full"
                        htmlFor="password"
                      >
                        password
                      </label>
                      <input
                        value={loginData["password"]}
                        onChange={handleLoginChange}
                        type="password"
                        name="password"
                        className="form_field w-full"
                      />
                    </div>
                  </div>
                  <button onClick={handleLogin}>sign in</button>
                </form>
              </div>
            ) : null}
          </CheckoutFieldGroup>

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
          ) : (
            <span>loading stripee</span>
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
