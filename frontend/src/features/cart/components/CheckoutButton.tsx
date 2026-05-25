import { useRazorpay, type RazorpayOrderOptions } from "react-razorpay";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/app.store";
import { useCart } from "../hooks/useCart";
import type { CartProduct } from "../utils/types";

interface Props {
  order: CartProduct[];
}

const CheckoutButton = () => {
  const { Razorpay, error, isLoading } = useRazorpay();

  const { handleCreateCartOrder } = useCart();

  const user = useSelector((state: RootState) => state.auth.user);

  //   const handlePayment = async () => {
  //     const order = await handleCreateCartOrder();
  //     console.log(order);

  //     const options: RazorpayOrderOptions = {
  //       key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
  //       amount: 50000, // Amount in paise
  //       currency: "INR",
  //       name: "Test Company",
  //       description: "Test Transaction",
  //       order_id: "order_9A33XWu170gUtm", // Generate order_id on server
  //       handler: async (response) => {
  //         // const isValid = await handleVerifyCartOrder(response);

  //         // if (isValid) {
  //         //   navigate(`/order-success?order_id=${response?.razorpay_order_id}`);
  //         // }

  //         console.log(response);
  //       },
  //       prefill: {
  //         name: "John Doe",
  //         email: "john.doe@example.com",
  //         contact: "9999999999",
  //       },
  //       theme: {
  //         color: "#F37254",
  //       },
  //     };

  //     const razorpayInstance = new Razorpay(options);
  //     razorpayInstance.open();
  //   };

  const handleCheckout = async () => {
    const order = await handleCreateCartOrder();

    console.log(order);
    // console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);

    console.log();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount, // Amount in paise
      currency: order.currency,
      name: "Snitch",
      description: "Test Transaction",
      order_id: order.id, // Generate order_id on server
      handler: async (response: any) => {
        // const isValid = await handleVerifyCartOrder(response)
        // if (isValid) {
        //     navigate(`/order-success?order_id=${response?.razorpay_order_id}`)
        // }
        console.log(response);
      },
      prefill: {
        name: user?.fullname,
        email: user?.email,
        contact: user?.contact,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();

    console.log(razorpayInstance);

    // const options: RazorpayOrderOptions = {
    //   key: "rzp_test_Stdp2SEQoWzF5l",
    //   amount: order.amount, // Amount in paise
    //   currency: order.currency,
    //   name: "Test Company",
    //   description: "Test Transaction",
    //   order_id: "order_9A33XWu170gUtm", // Generate order_id on server
    //   handler: (response) => {
    //     console.log(response);
    //     alert("Payment Successful!");
    //   },
    //   prefill: {
    //     name: "John Doe",
    //     email: "john.doe@example.com",
    //     contact: "9999999999",
    //   },
    //   theme: {
    //     color: "#F37254",
    //   },
    // };

    // const razorpayInstance = new Razorpay(options);
    // razorpayInstance.open();
  };

  return (
    <>
      <button
        id="proceed-checkout"
        className="mb-3 w-full bg-[#1b1c1a] py-4 text-[11px] font-medium tracking-[0.25em] text-[#fbf9f6] uppercase transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#1b1c1a]"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
    </>
  );
};

export default CheckoutButton;
