import { validateToken, checkRequestToken } from "../../../utils/wordpressApi";

const handler = async (req, res) => {
  const token = checkRequestToken(req);

  try {
    // call token validation endpoint
    const validate = await validateToken(token);
    return res.status(200).json(validate);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
