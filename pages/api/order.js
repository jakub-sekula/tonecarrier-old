import {
  createWoocommerceOrder,
  retrieveProductById,
} from "../../utils/wooCommerceApi";
import { checkRequestToken, validateToken } from "../../utils/wordpressApi";

const cookie = require("cookie");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    //get logged in user token from cookie and validate it
    const token = checkRequestToken(req);

    if (!token) {
      return res.status(401).json("Unauthorised");
    }

    // call the validation endpoint
    const validate = await validateToken(token);

    if (validate.statusCode !== 200) {
      return res.status(400).json("Bad token");
    }

    const orderData = req.body;

    const newOrder = await createWoocommerceOrder(orderData);

    res.status(201).json(newOrder.data);
  } catch (error) {
    console.log(error);
    res.status(502).json("Bad gateway");
  }
};

export default handler;
