const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  const body = JSON.parse(req.body);
  const { price, email } = body;

  console.log("email in payment intent api: ", email)
  if (!email) return res.status(400).send()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "gbp",
    automatic_payment_methods: { enabled: true },
    receipt_email: email,
  });
  return res.status(201).json({
    client_secret: paymentIntent.client_secret,
    id: paymentIntent.id,
  });
};

export default handler;
