// /pages/api/getAPI.js

import stream from "stream";
import { promisify } from "util";
import fetch from "node-fetch";
import { checkRequestToken, validateToken } from "../../utils/wordpressApi";
import { getDownloadLinks } from "../../utils/wooCommerceApi";

const pipeline = promisify(stream.pipeline);

function getDownloadLinkFromHash(data, hash) {
    let arr = [];
  
    data.forEach((obj) => {
      obj.links.forEach((link) => {
        if (link.hash === hash) {
          arr.push(link);
        }
      });
    });
  
    return arr[0].url || null;
  }

const handler = async (req, res) => {

    let token = checkRequestToken(req);
    const validate = await validateToken(token);
  
    if (validate.statusCode !== 200) {
      return { props: { links: "" } };
    }

    let {hash} = req.query

    console.log("hash: ", hash)
  
    const allLinks = await getDownloadLinks(validate.data.id);

    const url = getDownloadLinkFromHash(allLinks, hash)

    // res.status(200).json(exact)
  const response = await fetch(url); // replace this with your API call & options

  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader("Content-Type", "application/jpeg");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=tonecarrier35.jpeg"
  );



  await pipeline(response.body, res);
};

export default handler;
