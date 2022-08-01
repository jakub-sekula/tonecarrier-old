import fetch from "node-fetch";
const cookie = require("cookie");

export const getUserDetails = async (id) => {
  try {
    const response = await fetch(
      `${process.env.WOOCOMMERCE_API_URL}/wp-json/wp/v2/users/${id}`,
      {
        headers: {
          Authorization: `Basic ${process.env.ADMIN_BASIC_AUTH_HEADER_KEY}`,
        },
      }
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
      `${process.env.WOOCOMMERCE_API_URL}/wp-json/jwt-auth/v1/token/validate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    // return validation response if unsuccessful
    if (validate.statusCode !== 200) {
      return validate;
    }

    // if the token is validated, decode the user id from it
    const id = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("ascii")
    ).data.user.id;

    const { name, slug: username } = await getUserDetails(id);

    validate.data = {
      ...validate.data,
      id: id,
      name: name,
      username: username,
    };

    return validate;
  } catch (error) {
    console.log("Error within wordpressApi.js: \n", error);
  }
};
