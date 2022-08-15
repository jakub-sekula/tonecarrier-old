import { checkRequestToken, validateToken } from "../../utils/wordpressApi";
import { getDownloadLinks } from "../../utils/wooCommerceApi";
import { makeid } from "../../utils/utils";

const Downloads = ({ links, message }) => {

  return (
    <>
      <div className="flex justify-center">
        <button className="button">Hello world</button>
      </div>
      {links.length ? (
        <>
          <ul>
            {links.map((link, index) => {
              const gowno = link.links.map((each) => (
                <li key={`${makeid(8)}`}>
                  {each.name},{" "}
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/downloads/${each.hash}`}
                  >
                    link
                    <img src={each.url} className="w-24" />
                  </a>
                </li>
              ));
              return gowno;
            })}
          </ul>
          <pre>{JSON.stringify(links, null, "\t")}</pre>{" "}
        </>
      ) : <pre>{JSON.stringify(message, null, "\t")}</pre>}
    </>
  );
};

export default Downloads;

export const getServerSideProps = async (ctx) => {
  let token = checkRequestToken(ctx.req);
  const validate = await validateToken(token);

  if (validate.statusCode !== 200) {
    return { props: { links: [], message: validate} };
  }

  const links = await getDownloadLinks(validate.data.id);

  return {
    props: { links },
  };
};
