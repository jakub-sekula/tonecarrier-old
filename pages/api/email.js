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
    `${process.env.WOOCOMMERCE_API_URL}/wp-json/api/v1/me/email`,
    options
  );
  const userDataJson = await userDataResponse.json();

  res.status(200).json(userDataJson);
};

export default handler;
