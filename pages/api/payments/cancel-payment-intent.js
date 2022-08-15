const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  const { payment_intent_id } = req.query;

  console.log({payment_intent_id})

  if (!payment_intent_id) return res.status(400).send();

  const paymentIntent = await stripe.paymentIntents
    .cancel(payment_intent_id)
    .catch((error) => {
      console.log(error);
      return res.status(400).send(error)
    });
    console.log(`Payment intent ${payment_intent_id} cancelled.`)
  return res.status(200).send("Cancelled")
};

export default handler;
