import axios from "axios";
import { useSelector } from "react-redux";

export default function Checkout() {
  const cart = useSelector(state => state.cart);

  const payNow = async () => {
    const res = await axios.post("http://localhost:5000/api/payment/create-order", {
      amount: cart.reduce((a, c) => a + c.price, 0),
      items: cart,
      phone: "91XXXXXXXXXX",
    });

    const options = {
      key: "rzp_testrzp_test_SCyFipYISNGnun",
      amount: res.data.razorOrder.amount,
      order_id: res.data.razorOrder.id,
      handler: async () => {
        await axios.post("http://localhost:5000/api/payment/success", {
          orderId: res.data.order._id,
        });
        alert("Payment Success");
      },
    };

    new window.Razorpay(options).open();
  };

  return <button onClick={payNow}>Pay Now</button>;
}
