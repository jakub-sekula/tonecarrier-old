import fetch from "node-fetch";
import { getCustomerOrders } from "../../utils/wooCommerceApi";
import { checkRequestToken, validateToken } from "../../utils/wordpressApi";

const handler = async (req, res) => {

  // if (!req.headers.cookie) {
  //   res.status(400).json({message: 'No cookie found', status: 400})
  //   return
  // }

  const token = checkRequestToken(context.req)

  // return if there is no token cookie
  if (!token) {
    res.status(401).json({message: "No token found", status: 401});
    return;
  }

  // if token exists, check if it's valid
  const validate = await validateToken(token)

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
