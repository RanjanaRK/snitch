import { useRazorpay } from "react-razorpay";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../../../app/app.store";
import { useCart } from "../hooks/useCart";

const CheckoutButton = () => {
  const navigate = useNavigate();

  const { Razorpay } = useRazorpay();

  const { handleCreateCartOrder, handleVerifyCartOrder } = useCart();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleCheckout = async () => {
    const order = await handleCreateCartOrder();

    console.log(order);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount, // Amount in paise
      currency: order.currency,
      name: "Snitch",
      description: "Test Transaction",
      order_id: order.id, // Generate order_id on server
      handler: async (response: any) => {
        console.log(response);
        const isValid = await handleVerifyCartOrder(response);
        console.log(isValid);

        if (isValid) {
          navigate(`/order-success?order_id=${response?.razorpay_order_id}`);
        }
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
