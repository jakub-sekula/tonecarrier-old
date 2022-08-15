
import OrderProcessingSpinner from "../components/OrderProcessingSpinner";
import OrderSummary from "../components/OrderSummary";

export default function Testing(props) {
  const data = {
    id: "0269",
    line_items: [
      {
        id: 1,
        quantity: 1,
      },
      {
        id: 2,
        quantity: 1,
      },
    ],
    billing: {
      firstName: "Jakub",
      lastName: "Sekula",
      email: "seklerek@gmail.com",
    },
    payment: {
      method: "card",
      id: "3267e28yg73r5238r7632",
      status: "succeeded",
      amount: 123.5,
      cardLastFour: 4242,
      receipt_url:
        "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTE1DdmJBRG12ME5TdXNMKKmX6pcGMgbrDlfT4RA6LBY8VbsiYlp35yvPacixRhZ3dtgG8s5vMlzAHBnELpfOn8935Ul4f-GdUpHu",
    },
  };

  const cart = [
    {
      id: 24,
      key: "e27e8d52",
      name: "Album",
      price: "15",
      img: "http://woocommerce.local/wp-content/uploads/2022/07/album-1.jpg",
      url: "http://localhost:3000/products/album",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Loaded state */}
      <OrderSummary data={data} cart={cart}/>

      {/* Loading state */}
      <OrderProcessingSpinner />
      
    </div>
  );
}
