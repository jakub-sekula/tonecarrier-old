import fetch from "node-fetch";
const cookie = require("cookie");


export const getUserDetails = async (id, token) => {
  try {
    const response = await fetch(
      `${process.env.WOOCOMMERCE_API_URL}/wp-json/wp/v2/users/${id}`,
      { headers: { Authorization: `Basic ${process.env.ADMIN_BASIC_AUTH_HEADER_KEY}` } }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const validateToken = async (token, context = undefined) => {
  try {
    // call token validation endpoint
    const validate = await fetch(
      "http://woocommerce.local/wp-json/jwt-auth/v1/token/validate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    // return validation response if unsuccessful
    if (validate.statusCode !== 200) {
      // if user account has been deleted, remove the old token
      if (validate.code === "jwt_auth_user_not_found") {
        console.log(
          "The user associated with the provided JWT does not exist. Clearing cookie..."
        );
      }
      console.log(
        "Invalid auth token. Clearing cookie..."
      );
      context.res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", "", { maxAge: 0 })
      );
      return validate;
    }

    // if the token is validated add the user ID to response
    // we can do this because the JWT includes this information in its payload
    // and we just need to decode it from base64
    validate["id"] = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("ascii")
    ).data.user.id;

    return validate;
  } catch (error) {
    console.log(error);
  }
};
