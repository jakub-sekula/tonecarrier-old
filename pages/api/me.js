import { checkRequestToken } from "../../utils/wordpressApi";

const handler = async (req, res) => {
  const token = checkRequestToken(req);

  if (!token) {
    res.status(403).json({ status: "User not logged in", user: null });
    return;
  }

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const userDataResponse = await fetch(
    `${process.env.WOOCOMMERCE_API_URL}/wp-json/wp/v2/users/me`,
    options
  );
  const userDataJson = await userDataResponse.json();

  if (userDataResponse.status !== 200) {
    console.log(userDataJson);
    return res.status(userDataResponse.status).send(userDataJson);
  }

  const { id, name, slug: user, ...rest } = userDataJson;
  const response = {
    status: "Logged in",
    user: {
      id,
      name,
      user,
    },
    rest: rest,
  };

  res.status(200).send(response);
};

export default handler;
