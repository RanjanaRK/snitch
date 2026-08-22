import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/app.store";
import useOrder from "../hooks/useOrder";

const OrderDetails = () => {
  const { orderId } = useParams();

  const { handleGetSingleOrder } = useOrder();

  const order = useSelector((state: RootState) => state.order.order);

  console.log({ order });

  useEffect(() => {
    if (orderId) {
      handleGetSingleOrder(orderId);
    }
  }, [orderId]);

  if (!order) return null;

  return (
    <>
      <div className="min-h-screen bg-[#fbf9f6] p-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-3xl font-semibold">Order Details</h1>

          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-medium">
              Order #{order._id.slice(-8)}
            </h2>

            <p>Status: {order.orderStatus}</p>

            <p>Payment: {order.status}</p>

            <p>Total: ₹{order.price.amount}</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-medium">Ordered Products</h2>

            {order.orderItems.map((item) => (
              <div
                key={item.productId}
                className="mb-4 flex gap-4 border-b pb-4"
              >
                <img
                  src={item.images?.[0]?.url}
                  alt={item.title}
                  className="h-24 w-24 rounded object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>

                  <p className="mt-2">Qty: {item.quantity}</p>

                  <p className="font-semibold">₹{item.price.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
