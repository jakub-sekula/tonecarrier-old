import Cookies from "cookies";
import fetch, { FormData } from "node-fetch";

const options = {
  method: "POST",
};

const handler = async (req, res) => {
  const cookies = new Cookies(req, res);

  const { username, password } = req.query;
  if (!username || !password) {
    res.status(400).send("Bad request: Please provide username and password");
  }

  try {
    const data = await fetch(
      `http://woocommerce.local/wp-json/jwt-auth/v1/token?username=${username}&password=${password}`,
      options
    );
    const authResponse = await data.json();

    //if token has been successfully generated, set a cookie and send the token as a response
    if (authResponse.token) {
      cookies.set("jwt", authResponse.token);
      res.status(200);
      res.json({accessToken: authResponse.token });
    }
  } catch (error) {
    console.log(error);
    res.status(502).send("502 Bad gateway");
  }
};

export default handler;
