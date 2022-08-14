import { checkRequestToken, validateToken } from "../../../utils/wordpressApi";

import { getDownloadLinks } from "../../../utils/wooCommerceApi";

const handler = async (req, res) => {
    // validate token
  let token = checkRequestToken(req);
  const validate = await validateToken(token);

  if (validate.statusCode !== 200) {
    return res.status(validate.statusCode).json(validate);
  }

  const links = await getDownloadLinks(validate.data.id);

  return res.status(200).json(links);
};

export default handler;
