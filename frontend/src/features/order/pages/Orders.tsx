import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../../../app/app.store";
import useOrder from "../hooks/useOrder";

const Orders = () => {
  const navigate = useNavigate();

  const { handleGetAllOrders } = useOrder();

  const orders = useSelector((state: RootState) => state.order.orders);

  console.log({ orders });

  useEffect(() => {
    handleGetAllOrders();
  }, []);

  return (
    <>
      <div
        className="min-h-screen px-6 py-12 lg:px-16"
        style={{ backgroundColor: "#fbf9f6" }}
      >
        <div className="mb-10">
          <h1
            className="text-4xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            My Orders
          </h1>

          <p className="mt-2 text-xs tracking-[0.2em] text-[#B5ADA3] uppercase">
            Your purchase history
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              onClick={() => navigate(`/orders/${order._id}`)}
              className="cursor-pointer rounded-lg border bg-white p-5 hover:shadow-md"
            >
              <div className="flex gap-4">
                <img
                  src={order.orderItems[0]?.images?.[0]?.url}
                  alt={order.orderItems[0]?.title}
                  className="h-20 w-20 rounded object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium">
                    {order.orderItems[0]?.title}
                    {order.orderItems.length > 1 &&
                      ` +${order.orderItems.length - 1} more`}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Order #{order._id.slice(-8)}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    ₹{order.price.amount}
                  </p>
                </div>

                <div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
