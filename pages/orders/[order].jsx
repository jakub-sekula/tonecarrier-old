import { useRouter } from "next/router";
import { retrieveProductById } from "../../utils/wooCommerceApi";

const OrderPage = ({ price }) => {
  const router = useRouter();
  const { order } = router.query;

  return (
    <div>
      product number {order} with a price of £{price}
    </div>
  );
};

export default OrderPage;

export const getServerSideProps = async (context) => {
  const { order } = context.query;

  console.log(context.query)

  const product = await retrieveProductById(order);
  const { price } = product || "hello";

  return {
    props: { price: price },
  };
};
