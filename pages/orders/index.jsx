import { validateToken } from "../../utils/wordpressApi";
import { getCustomerOrders } from "../../utils/wooCommerceApi";

const OrderPage = ({ orders }) => {
  const id = orders.userId;

  return (
    <div>
      <h1 className='text-white'>Information about orders for customer {id}:</h1>
      {/* <h1>Sequential ID: {sequentialId}</h1> */}
      <pre className="text-xs break-words text-white">
        JSON dump: {JSON.stringify(orders, null, "\t")}
      </pre>
    </div>
  );
};

export default OrderPage;

export const getServerSideProps = async (context) => {
  try {
    const cookie = require("cookie");

    // get request cookie, if it's empty set it to null
    const token = context.req.headers.cookie
    ? cookie.parse(context.req.headers.cookie)["jwt"]
    : null;

    // if token exists, check if it's valid
    const validate = await validateToken(token);

    if (!validate.success) {
      return {
        props: {
          orders: {
            userId: null,
            orders: null,
            message: "Authorisation failed. Please log in again.",
          },
        },
      };
    }

    // if token is valid, get user ID from validation response
    const { id } = validate.data;

    const userOrders = await getCustomerOrders(id);

    const response = {
      userId: id,
      orders: userOrders,
    };

    return {
      props: {
        orders: response,
      },
    };
  } catch (error) {
    console.log("zesralo sie (orders->index.jsx): ", error);
  }
};
