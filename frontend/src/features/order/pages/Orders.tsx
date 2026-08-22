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
              className="cursor-pointer border border-[#e4e2df] bg-white p-6 transition hover:shadow-md"
              onClick={() => navigate(`/orders/${order._id}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7A6E63]">
                    Order #{order._id.slice(-8)}
                  </p>

                  <p className="mt-2 text-xs text-[#B5ADA3]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">₹{order.price.amount}</p>

                  <span className="mt-2 inline-block rounded-full bg-[#f5f3f0] px-3 py-1 text-xs">
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
