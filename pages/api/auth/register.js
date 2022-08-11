import fetch, { Headers } from "node-fetch";
const cookie = require("cookie");

const handler = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password) {
    res.status(400).json("Bad request: Please provide username and password");
    return;
  }
  const username = email.split("@")[0];

  const options = {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      authorization: `Basic ${process.env.ADMIN_BASIC_AUTH_HEADER_KEY}`,
    }),
    body: JSON.stringify({
      email: email,
      password: password,
      username: username,
      first_name: first_name,
      last_name: last_name,
      roles: ["customer"],
    }),
  };

  try {
    //register a new user
    const data = await fetch(
      `http://woocommerce.local/wp-json/wp/v2/users`,
      options
    );
    const registerResponse = await data.json();

    if (registerResponse?.code === "existing_user_login") {
      console.log(registerResponse.code, JSON.parse(options.body));
      return res.status(400).json({ message: registerResponse.code });
    }

    if (registerResponse?.code === "rest_invalid_param") {
      console.log(registerResponse.code, JSON.parse(options.body));
      return res.status(400).json({ message: registerResponse.code });
    }

    if (data.status !== 201) {
      console.log(data.statusText);
      return res.status(data.status).json(data.statusText);
    }

    // if successful, immediately log in the new user by getting a new token
    const loginResponse = await fetch(
      `${process.env.WOOCOMMERCE_API_URL}/wp-json/jwt-auth/v1/token`,
      {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    ).then((res) => res.json());

    // login route returns an access token for the user, set it as a cookie
    const { token } = loginResponse.data;
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", token, {
        maxAge: 1000 * 60,
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      })
    );

    // send a response to the client
    res.status(201).json({
      statusCode: 201,
      message: `user created`,
      token: token,
      user: {
        user: registerResponse.username,
        name: registerResponse.name,
        id: registerResponse.id,
        email:email
      },
    });

  } catch (error) {
    console.log(error);
    res.status(502).json({ statusCode: 502, message: "Bad gateway" });
  }
};

export default handler;
