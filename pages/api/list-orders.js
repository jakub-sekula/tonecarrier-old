import Cookies from "cookies";
import fetch from "node-fetch";
import { getCustomerOrders } from "../../utils/wooCommerceApi";
import { validateToken } from "../../utils/wordpressApi";

const handler = async (req, res) => {
  const token = new Cookies(req, res).get("jwt") || undefined;

  // return if there is no token cookie
  if (!token) {
    res.status(401).json("User not logged in - no token found");
    return;
  }

  // if token exists, check if it's valid
  const validate = await validateToken(token);

  if (validate.data.status !== 200) {
    res.status(403).json(validate);
    return;
  }

  // if token is valid, get user ID from validation response
  const { id } = validate;

  const userOrders = await getCustomerOrders(id);

  const response = {
    userId: id,
    orders: userOrders,
  };

  res.status(200).json(response);
};

export default handler;
