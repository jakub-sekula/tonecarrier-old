
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
      currency: "gbp",
      brand: "visa",
      amount: 12350,
      cardLastFour: 4242,
      receipt_url:
        "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTE1DdmJBRG12ME5TdXNMKKmX6pcGMgbrDlfT4RA6LBY8VbsiYlp35yvPacixRhZ3dtgG8s5vMlzAHBnELpfOn8935Ul4f-GdUpHu",
    },
    downloads: [
        {
            "name": "Single",
            "url": "https://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2017/08/single.jpg",
            "hash": "4cd5c2bc484750ba8ec4659cfe0a5712"
        },
        {
            "name": "Twoja stara",
            "url": "http://woocommerce.local/wp-content/uploads/2022/07/vneck-tee-2.jpg",
            "hash": "7eca870237c676faaf031e797b756b42"
        },
        {
            "name": "Twój stary",
            "url": "http://woocommerce.local/wp-content/uploads/2022/07/hoodie-green-1.jpg",
            "hash": "03041d8669b811cea85f32cfd951873a"
        },
        {
            "name": "Jest w pytke",
            "url": "http://woocommerce.local/wp-content/uploads/2022/07/sunglasses-2.jpg",
            "hash": "2a016385d70b40e89ad17f3e867ce983"
        }
    ]
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
