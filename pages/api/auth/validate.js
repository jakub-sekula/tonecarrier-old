const cookie = require("cookie");
import { getUser } from "../../../components/contexts/AuthContext";
import { getUserDetails } from "../../../utils/wordpressApi";

const handler = async (req, res) => {
  const token = req.headers.cookie
    ? cookie.parse(req.headers.cookie)["jwt"]
    : "";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // call token validation endpoint
    const validate = await fetch(
      `${process.env.WOOCOMMERCE_API_URL}/wp-json/jwt-auth/v1/token/validate`,
      options
    ).then((res) => res.json());

    // return validation response if unsuccessful
    if (validate.statusCode !== 200) {
      // if user account has been deleted, remove the old token
      if (validate.code === "jwt_auth_user_not_found") {
        console.log(
          "The user associated with the provided JWT does not exist. Clearing cookie..."
        );
      }
      console.log("Invalid auth token. Clearing cookie...");
      res.setHeader("Set-Cookie", cookie.serialize("jwt", "", { maxAge: 0 }));
      return res.status(validate.statusCode).json(validate);
    }

    // if the token is validated add the user ID to response
    // we can do this because the JWT includes this information in its payload
    // and we just need to decode it from base64
    const id = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("ascii")
    ).data.user.id;

    const { name, slug:username } = await getUserDetails(id);

    validate.data = {
      ...validate.data,
      id: id,
      name: name,
      username: username,
    };

    return res.status(200).json(validate);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
