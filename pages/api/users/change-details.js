const cookie = require("cookie");
import fetch, { Headers } from "node-fetch";
import { validateToken } from "../../../utils/wordpressApi";

const handler = async (req, res) => {
  // only accept POST requests
  if (req.method !== "POST") {
    return res
      .status(405)
      .setHeader("Allow", "POST")
      .json({ message: `Method not allowed`, statusCode: 405 });
  }

  // check if more than one parameter is requested
  if (Object.keys(req.body).length > 1) {
    return res
      .status(400)
      .json({ message: `Too many parameters (max. 1)`, statusCode: 400 });
  } else if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: `No parameters received. Please send exactly one parameter.`,
      statusCode: 400,
    });
  }

  //first check for token in request cookies
  let token = req.headers.cookie
    ? cookie.parse(req.headers?.cookie)["jwt"]
    : null;

  // if there is no cookie, check the authorization header
  if (token === null) {
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
  }

  try {
    // validate token
    const validate = await validateToken(token);

    if (validate.statusCode !== 200) {
      console.log("zesralo sie");
      return res.status(validate.statusCode).json(validate);
    }

    // if token is valid, get user ID from validate response
    const userId = validate.data.id;

    if (req.body.password) {
      // post to the user API route using admin credentials to change the user password
      try {
        await fetch(
          `${process.env.WOOCOMMERCE_API_URL}/wp-json/wp/v2/users/${userId}`,
          {
            method: "POST",
            headers: new Headers({
              "content-type": "application/json",
              authorization: `Basic ${process.env.ADMIN_BASIC_AUTH_HEADER_KEY}`, // Admin application password used
            }),
            body: JSON.stringify({
              password: req.body.password,
            }),
          }
        )
          .then((res) => res.json())
          .catch((error) => console.log(error));

        return res.status(200).json({
          message: `Password for user ${userId} has been changed successfully. Please log in again`,
          statusCode: 200,
        });
      } catch (error) {
        console.log(
          "Error while changing password in change-details.js: ",
          error
        );
        return res.status(500).json({
          message: "An error occurred while trying to change password",
          statusCode: 500,
        });
      }
    }

    if (req.body.email) {
      try {
        let emailRes = await fetch(
          `${process.env.WOOCOMMERCE_API_URL}/wp-json/wp/v2/users/${userId}`,
          {
            method: "POST",
            headers: new Headers({
              "content-type": "application/json",
              authorization: `Basic ${process.env.ADMIN_BASIC_AUTH_HEADER_KEY}`, // Admin application password used
            }),
            body: JSON.stringify({
              email: req.body.email,
            }),
          }
        ).catch((error) => console.log(error));
        let emailResJson = await emailRes.json();
        console.log("gowno json:", emailResJson);

        if (emailRes.status !== 200) {
          return res.status(emailRes.status).json({
            message: `The email could not be changed.`,
            email: req.body.email,
            statusCode: emailRes.status,
            original_response: emailResJson,
          });
        }

        return res.status(200).json({
          message: `Email for user ${userId} has been changed successfully.`,
          email: req.body.email,
          statusCode: 200,
        });
      } catch (error) {
        console.log("Error while changing email in change-details.js: ", error);
        return res.status(500).json({
          message: "An error occurred while trying to change email",
          statusCode: 500,
        });
      }
    }
    return res.status(400).json({
      message: `Incorrect parameters supplied`,
      statusCode: 400,
      original_request_body: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export default handler;
