import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/app.store";
import useOrder from "../hooks/useOrder";

const OrderDetails = () => {
  const { orderId } = useParams();

  const { handleGetSingleOrder } = useOrder();

  const order = useSelector((state: RootState) => state.order.order);

  useEffect(() => {
    if (orderId) {
      handleGetSingleOrder(orderId);
    }
  }, [orderId]);

  if (!order) return null;

  return (
    <div
      className="min-h-screen px-6 py-12 lg:px-16"
      style={{ backgroundColor: "#fbf9f6" }}
    >
      <h1
        className="mb-8 text-4xl font-light"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Order Details
      </h1>

      <div className="mb-8 border border-[#e4e2df] bg-white p-6">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>

        <p className="mt-2">
          <strong>Payment:</strong> {order.status}
        </p>

        <p className="mt-2">
          <strong>Status:</strong> {order.orderStatus}
        </p>

        <p className="mt-2">
          <strong>Total:</strong> ₹{order.price.amount}
        </p>
      </div>

      <div className="space-y-4">
        {order.orderItems.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 border border-[#e4e2df] bg-white p-4"
          >
            <img
              src={item.images[0]?.url}
              alt={item.title}
              className="h-24 w-20 object-cover"
            />

            <div>
              <h3 className="font-medium">{item.title}</h3>

              <p className="mt-2 text-sm text-[#7A6E63]">{item.description}</p>

              <p className="mt-2 text-sm">Qty: {item.quantity}</p>

              <p className="mt-1 font-medium">₹{item.price.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
