import fetch from "node-fetch";

export const getUserDetails = async (username, token) => {
  try {
    const response = await fetch(
      `${process.env.WOOCOMMERCE_API_URL}/wp-json/wp/v2/users?slug=${username}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const validateToken = async (token) => {
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
    if (validate.data.status !== 200) {
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
