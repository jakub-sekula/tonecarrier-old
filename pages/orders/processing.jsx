import { create } from "domain";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { useAuth } from "../../components/contexts/AuthContext";
import { useCart } from "../../components/contexts/CartContext";

const ProcessingPage = ({ query }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { user, isAuthLoading } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [success, setSuccess] = useState(false);

  const {
    payment_intent_client_secret: secret,
    payment_intent: intentId,
    name,
    email,
  } = query;

  console.log("name is: ", name);
  console.log("processing router query: ", query);

  const clearLocalIntent = async () => {
    try {
      if (sessionStorage.getItem("payment_intent")) {
        const { id } = JSON.parse(sessionStorage.getItem("payment_intent"));
        sessionStorage.removeItem("payment_intent");
        console.log(`Payment intent ${id} removed from session storage.`);
        return;
      }
      return console.log("No local payment intent to remove");
    } catch (error) {
      console.log(error);
    }
  };

  // create order if everything is OK
  useEffect(() => {
    if (cartItems.length && !isAuthLoading) {
      console.log("generating order data kurwo");
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
            value: intentId,
          },
        ],
        billing: {
          first_name: name?.split(" ")[0] || "first name",
          last_name: name?.split(" ")[1] || "last name",
          email: email || "email",
        },
      };

      console.log({ orderData });

      const createOrder = async () => {
        const order = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order?payment_intent=${intentId}`,
          {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify(orderData),
          }
        );
        if (order.status !== 201) {
          setError(order.statusText);
          return console.log("zesrało się (processing.jsx)", order.statusText);
        }

        const { orderNumber } = await order.json();
        console.log(`Order ${orderNumber} created!`);
        // clearCart();
        // router.push("/");
        // router.reload(router.pathname)
        setSuccess(true);
      };

      try {
        createOrder();
        clearLocalIntent();
      } catch (error) {
        console.log("error in processing.jsx: ", error);
        setError("error in creating order: ", error);
      }
    }
  }, [secret, cartItems, isAuthLoading]);

  return (
    <div>
      <h1>Information about order status:</h1>
      {/* <h1>Sequential ID: {sequentialId}</h1> */}
      <pre className="text-xs break-words">
        Router query: {JSON.stringify(router.query, null, "\t")}
        {/* Payment intent: {JSON.stringify(status, null, "\t")} */}
        {error}
      </pre>
      {success ? <span>order successul!</span> : <MoonLoader color="#ffffff"/>}
    </div>
  );
};

export default ProcessingPage;

export const getServerSideProps = async (ctx) => {
  /* 
    Passing query as props so that is is available on first render
    When I used useRouter(), the query returned undefined on initial render
    which was fucking up the order processing sequence.
  */
  return {
    props: {
      query: ctx.query,
    },
  };
};
