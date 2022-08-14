import { checkRequestToken, validateToken } from "../../utils/wordpressApi";
import { getDownloadLinks } from "../../utils/wooCommerceApi";
import { useId } from "react";


const Downloads = ({ links }) => {
  const id = useId()

  return (
    <>
      <div className="flex justify-center">
        <button className="button">Hello world</button>
      </div>
      <ul>
        {links.map((link, index) => {
          const gowno = link.links.map((each) => (
            <li key={`${id}-${index}`}>
              {each.name},{" "}
              <a href={`${process.env.NEXT_PUBLIC_API_URL}/dl/?hash=${each.hash}`}>
                link
                <img src={each.url} className="w-24" />
              </a>
            </li>
          ));
          return gowno;
        })}
      </ul>
      <pre>{JSON.stringify(links, null, "\t")}</pre>
    </>
  );
};

export default Downloads;

export const getServerSideProps = async (ctx) => {
  let token = checkRequestToken(ctx.req);
  const validate = await validateToken(token);

  if (validate.statusCode !== 200) {
    return { props: { links: "" } };
  }

  const links = await getDownloadLinks(validate.data.id);

  return {
    props: { links },
  };
};
