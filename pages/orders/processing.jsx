import { create } from "domain";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import { useCart } from "../../components/contexts/CartContext";

const ProcessingPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { user, isAuthLoading } = useAuth();
  const { cartItems, clearCart } = useCart();

  const { payment_intent_client_secret: secret, payment_intent: intentId } =
    router.query;

  //   console.log(cartItems);

  // create order if everything is OK
  useEffect(() => {
    if (cartItems.length && !isAuthLoading) {
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
      };

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
        clearCart()
        router.push('/')
      };

      try {
        createOrder();
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
    </div>
  );
};

export default ProcessingPage;
