import { fetchWooCommerceProducts } from "../../utils/wooCommerceApi";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCart } from "../../components/contexts/CartContext";
import { useId } from "react";


function ProductPage({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  if (router.isFallback) {
    return <div className="text-white">Loading...</div>;
  }

  const line_items = {
    line_items: [
      {
        product_id: `${product.id}`,
        quantity: 1,
      },
    ],
  };

  const createOrder = async () => {
    const order = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(line_items),
    });

    const orderJson = await order.json();

    console.log(orderJson)

    if (order.status !== 201) {
      console.error(
        `Could not create order: ${order.status} ${order.statusText}`
      );
      return;
    }

    // have to find order number like this because of the sequential numbers plugin
    const orderNumber = orderJson.meta_data.find(
      (obj) => obj.key === "_order_number"
    ).value;
    console.log(`Order ${orderNumber} created!`);
  };


  return (
    <div className="w-64 flex flex-col mx-auto text-white">
      <Image
        src={product.images[0].src}
        alt={product.images[0].alt}
        width={200}
        height={200}
      />
      <h1 className="font-['Cooper_Black'] text-2xl">{product.name}</h1>
      <p>£{product.price}</p>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
      <Link href="/products">
        <a className="underline text-blue-700 hover:text-slate-900">Go back</a>
      </Link>
      <button onClick={createOrder}>Order</button>
      <button
        onClick={() => {
          addToCart({
            id: product.id,
            key: Math.random().toString(16).slice(2, 10),
            name: product.name,
            price: product.price,
            img: product.images[0].src || "",
            url: `${process.env.NEXT_PUBLIC_HOME_URL}/products/${product.slug}`
          });
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductPage;

export const getStaticPaths = async () => {
  const endpoint = "products";
  const fetch_params = {
    per_page: 100,
  };
  const products = await fetchWooCommerceProducts(endpoint, fetch_params).catch(
    (error) => {
      console.log(error);
    }
  );

  const paths = products.data.map((product) => {
    return { params: { slug: product.slug } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const endpoint = "products";
  const fetch_params = {
    slug: params.slug,
  };

  const data = await fetchWooCommerceProducts(endpoint, fetch_params).catch(
    (error) => {
      console.log(error);
    }
  );

  return {
    props: {
      title: data.data[0].name,
      product: data.data[0],
    },
  };
};
