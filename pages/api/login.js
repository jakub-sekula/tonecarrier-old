import Cookies from "cookies";
import fetch from "node-fetch";

const handler = async (req, res) => {
  const cookies = new Cookies(req, res);

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
      `http://woocommerce.local/wp-json/jwt-auth/v1/token`,
      options
    );
    const authResponse = await data.json();

    if (!authResponse.token && authResponse.data.status !== 200) {
      res.status(403).json("Invalid credentials");
      return;
    }

    //if token has been successfully generated, set a cookie and send the token as a response
    if (authResponse.token) {
      //set cookie to expire after 24 hours
      cookies.set("jwt", authResponse.token, {maxAge: 1000*60*60*24});

      // get user id from auth token
      const id = JSON.parse(
        Buffer.from(authResponse.token.split(".")[1], "base64").toString("ascii")
      ).data.user.id;

      res.status(200);
      res.json({ token: authResponse.token, user: username, id: id });
    }
  } catch (error) {
    console.log(error);
    res.status(502).json("502 Bad gateway");
  }
};

export default handler;
