import { useRouter } from "next/router";
import { retrieveOrderById } from "../../utils/wooCommerceApi";

const OrderPage = ({orders}) => {
  const router = useRouter();
  const { order: id} = router.query;

  // console.log(orders)
  // console.log(router.query)

  // const sequentialId = orders.meta_data.find(key => key['key']==='_order_number').value

  return (
    <div>
      <h1>Information about order number {id}:</h1>
      {/* <h1>Sequential ID: {sequentialId}</h1> */}
      <pre className="text-xs break-words">
        JSON dump: {JSON.stringify(orders, null, "\t")}
      </pre>
    </div>
  );
};

export default OrderPage;

export const getServerSideProps = async (context) => {
  const { order } = context.query;

  const orderData = await retrieveOrderById(order);

  return {
    props: {
      orders: orderData,
    },
  };
};
