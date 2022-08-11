import {
  createWoocommerceOrder,
  retrieveProductById,
} from "../../utils/wooCommerceApi";

const calculateTotalAmount = async (lineItems) => {
  const total = await Promise.all(
    lineItems.map((lineItem) => {
      return getProductTotal(lineItem);
    })
  ).then((res) => {
    return res.reduce((curr, next) => curr + next);
  });
  return total;
};

const getProductTotal = async (lineItem) => {
  let product = await retrieveProductById(lineItem.product_id.toString());
  let productTotal = lineItem.quantity * (parseFloat(product.price) * 100);
  return productTotal;
};

//Main API call handler
const handler = async (req, res) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  if (req.method !== "POST") {
    res.status(405).json("Only POST requests allowed");
    return;
  }

  if (!req.query.payment_intent) {
    res.status(400).json("Bad request");
    return;
  }

  try {
    const { status, client_secret } = await stripe.paymentIntents.retrieve(
      req.query.payment_intent
    );

    console.log("order.js ", { status, client_secret });

    const orderData = req.body;

    if (status !== "succeeded") return res.status(400).json(newOrder.data);

    const newOrder = await createWoocommerceOrder(orderData);

    const orderNumber = newOrder.meta_data.find(
      (obj) => obj.key === "_order_number"
    ).value;

    return res.status(201).json({message: "Order created", orderNumber: orderNumber});
  } catch (error) {
    console.log("error in order.js ", error);
    return res.status(500).json("Internal server error");
  }
};

export default handler;
