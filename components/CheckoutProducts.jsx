// Main component
const CheckoutProducts = ({ products, ...props }) => {

  return (
    <ul className={props.className}>
      {products.map((product) => {
        return <CheckoutLineItem product={product} key={product.id} />;
      })}
    </ul>
  );
};

const CheckoutLineItem = ({ product }) => {
  return (
    <li className="border border-white">
      <span className="text-white">ID: {product.id}</span>
      <span className="text-white">
        Name: {product.name}
      </span>
      <span className="text-white">
        Price: {product.price}
      </span>
    </li>
  );
};

export default CheckoutProducts;
