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
              className="group cursor-pointer border border-[#e4e2df] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#A8874F]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center gap-5">
                <img
                  src={order.orderItems[0]?.images?.[0]?.url}
                  alt={order.orderItems[0]?.title}
                  className="h-28 w-24 object-cover"
                />

                <div className="flex-1">
                  <p className="mb-2 text-[10px] tracking-[0.25em] text-[#A8874F] uppercase">
                    Order #{order._id.slice(-8)}
                  </p>

                  <h3
                    className="text-2xl text-[#1b1c1a]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {order.orderItems[0]?.title}
                  </h3>

                  {order.orderItems.length > 1 && (
                    <p className="mt-2 text-sm text-[#7A6E63]">
                      +{order.orderItems.length - 1} additional items
                    </p>
                  )}

                  <p className="mt-3 text-sm text-[#7A6E63]">
                    Total • ₹{order.price.amount}
                  </p>
                </div>

                <div className="text-right">
                  <span className="border border-[#e4e2df] px-4 py-2 text-[10px] tracking-[0.2em] text-[#A8874F] uppercase">
                    {order.orderStatus}
                  </span>

                  <p className="mt-5 text-xs text-[#B5ADA3]">View Details →</p>
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
