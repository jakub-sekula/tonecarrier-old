// import Cookies from "cookies";
const cookie = require("cookie");
import { strict } from "assert";
import fetch from "node-fetch";

const handler = async (req, res) => {
  // const cookies = new Cookies(req, res);

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json("Bad request: Please provide username and password");
    return;
  }

  const options = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  try {
    const data = await fetch(
      `${process.env.WOOCOMMERCE_API_URL}/wp-json/jwt-auth/v1/token`,
      options
    );
    const authResponse = await data.json();

    const { token } = authResponse.data;

    if (!token && authResponse.statusCode !== 200) {
      res.status(403).json(authResponse);
      return;
    }

    //if token has been successfully generated, set a cookie and send the token as a response
    if (token) {
      //set cookie to expire after 24 hours
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", String(token), {
          maxAge: 1000 * 60,
          path: "/",
          httpOnly: true,
          sameSite: 'strict'
        })
      );

      // get user id from auth token
      const decoded = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString("ascii")
      );

      const { id } = decoded.data.user;

      res.status(200);
      res.json({ token: token, user: username, id: id });
    }
  } catch (error) {
    console.log(error);
    res.status(502).json("502 Bad gateway");
  }
};

export default handler;
