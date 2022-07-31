import { validateToken } from "../../utils/wordpressApi";
import { getCustomerOrders } from "../../utils/wooCommerceApi";

const OrderPage = ({ orders }) => {
  const id = orders.userId;

  return (
    <div>
      <h1>Information about orders for customer {id}:</h1>
      {/* <h1>Sequential ID: {sequentialId}</h1> */}
      <pre className="text-xs break-words">
        JSON dump: {JSON.stringify(orders, null, "\t")}
      </pre>
    </div>
  );
};

export default OrderPage;

export const getServerSideProps = async (context) => {
  const cookie = require("cookie");

  // get request cookie, if it's empty set it to empty string
  const reqCookie = context.req.headers.cookie || "";

  const token = cookie.parse(reqCookie)["jwt"] //returns undefined if no JWT present

  // if token exists, check if it's valid
  const validate = await validateToken(token, context);
  if (!validate.success) {
    return {
      props: {
        orders: { userId: null, orders: null, message: 'Authorisation failed. Please log in again.' },
      },
    };
  }

  // if token is valid, get user ID from validation response
  const { id } = validate;

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
};
