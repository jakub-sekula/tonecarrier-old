import Cookies from "cookies";
import fetch from "node-fetch";
import { getCustomerOrders } from "../../utils/wooCommerceApi";
import { validateToken } from "../../utils/wordpressApi";

const handler = async (req, res) => {
  const token = new Cookies(req,res).get("jwt") || undefined;

  if (!token) {
    res.status(401).json("No token found");
    return
  }

  const validate = await validateToken(token)
  if (validate.data.status !== 200){
      res.status(403).json(validate)
      return
  }

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { id: userID, slug: username } = await fetch(
    "http://woocommerce.local/wp-json/wp/v2/users/me",
    options
  ).then((res) => res.json());
  const userOrders = await getCustomerOrders(userID);
  const response = {
    userId: userID,
    username: username,
    orders: userOrders,
  };
  res.send(response);
};

export default handler;
