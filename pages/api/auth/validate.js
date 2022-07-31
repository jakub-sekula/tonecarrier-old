const cookie = require("cookie");
import { validateToken } from "../../../utils/wordpressApi";

const handler = async (req, res) => {
  const token = req.headers.cookie
    ? cookie.parse(req.headers.cookie)["jwt"]
    : "";

    

  try {
    // call token validation endpoint
    const validate = await validateToken(token);

    return res.status(200).json(validate);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
