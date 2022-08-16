import {
  createWoocommerceOrder,
  getDownloadLinks,
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
    const paymentIntent = await stripe.paymentIntents.retrieve(
      req.query.payment_intent
    );

    const { status, client_secret, charges, amount, currency } = paymentIntent;
    const { receipt_url } = charges.data[0];
    const { last4, brand } = charges.data[0].payment_method_details.card;

    console.log("Status of payment intent checked in order.js: ", {
      status,
      client_secret,
    });

    const orderData = req.body;

    if (status !== "succeeded") return res.status(400).json(status);

    const newOrder = await createWoocommerceOrder(orderData).catch((err) =>
      console.error(err)
    );

    const orderNumber = newOrder.meta_data.find(
      (obj) => obj.key === "_order_number"
    ).value;

    await stripe.paymentIntents
      .update(req.query.payment_intent, {
        metadata: { order_id: newOrder.id, orderNumber: orderNumber },
      })
      .catch((err) => console.log(err));


    const downloads = await getDownloadLinks(newOrder.customer_id).then(
      (res) => {
        return res.filter((order) => order.order_id === newOrder.id);
      }
    );
    console.log("downloads: ", downloads);


    return res.status(201).json({
      message: "Order created",
      order_number: orderNumber,
      id: newOrder.id,
      downloads: downloads[0].links,
      payment: {
        amount,
        currency,
        status,
        brand,
        last4,
        receipt_url,
      },
      billing: {
        firstName: newOrder.billing.first_name,
        lastName: newOrder.billing.last_name,
        email: newOrder.billing.email
      }
    });
  } catch (error) {
    console.log("error in order.js ", error);
    return res.status(500).json("Internal server error");
  }
};

export default handler;
