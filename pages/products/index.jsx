import Link from "next/link";
import { fetchWooCommerceProducts } from "../../utils/wooCommerceApi";

const AllProducts = ({ products }) => {
  const productList = products.map((product) => {


    const productLink = `products/${product.slug}`
    return (
        <li key={[product.id]}>
            <Link href={productLink}>{product.name}</Link>
        </li>
        );
  });

  return (
    <div>
        <ul>{productList}</ul>
    </div>
  )
};

export default AllProducts;

export const getStaticProps = async () => {
  const endpoint = "products";
  const fetch_params = {
    per_page: 100,
  };

  const products = await fetchWooCommerceProducts(endpoint, fetch_params).catch(
    (error) => {
      console.log(error);
    }
  );

  return {
    props: {
      title: 'All products',
      products: products.data,
    },
    revalidate: 1
  };
};
