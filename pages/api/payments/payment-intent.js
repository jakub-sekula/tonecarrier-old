const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  const body = JSON.parse(req.body);
  const { price } = body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "gbp",
    automatic_payment_methods: { enabled: true },
    receipt_email: 'seklerek@gmail.com'
  });
  res.json({ client_secret: paymentIntent.client_secret });
};

export default handler;
