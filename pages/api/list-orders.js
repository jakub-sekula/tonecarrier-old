import fetch from "node-fetch";
import { getCustomerOrders } from "../../utils/wooCommerceApi";
// import { validateToken } from "../../utils/wordpressApi";

const handler = async (req, res) => {
  const cookie = require('cookie')

  if (!req.headers.cookie) {
    console.log('zesralo sie - no cookie in header')
    res.status(400).send()
    return
  }

  const token = undefined || cookie.parse(req.headers.cookie)['jwt']

  // return if there is no token cookie
  if (!token) {
    res.status(401).json("User not logged in - no token found");
    return;
  }

  // if token exists, check if it's valid
  const validate = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate`, {
    headers: new Headers({ Cookie: req.headers.cookie }),
  }).then(res => res.json());

  console.log(validate)

  if (validate.statusCode !== 200) {
    res.status(403).json({errorMessage: 'Token validation failed', originalData: validate});
    return;
  }

  // if token is valid, get user ID from validation response
  const { id } = validate.data;

  const userOrders = await getCustomerOrders(id);

  const response = {
    userId: id,
    orders: userOrders,
  };

  res.status(200).json(response);
};

export default handler;
