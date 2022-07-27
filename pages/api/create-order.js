import {
  createWoocommerceOrder,
  retrieveProductById,
} from "../../utils/wooCommerceApi";

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

  const { line_items } = req.body;

  console.log(line_items);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await calculateTotalAmount(line_items),
      currency: "gbp",
    });

    const orderData = {
      payment_method: "stripe",
      payment_method_title: "Card",
      set_paid: false,
      line_items: line_items,
      meta_data: [
        {
          key: "_stripe_intent_id",
          value: paymentIntent.id,
        },
      ],
    };

    const newOrder = await createWoocommerceOrder(orderData);

    res.status(201).json(newOrder.data);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
