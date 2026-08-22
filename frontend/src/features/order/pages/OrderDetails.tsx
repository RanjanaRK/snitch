import { useEffect } from "react";
import { Link, useParams } from "react-router";
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
        <div className="mx-auto max-w-5xl space-y-5">
          <div className="mb-14 border-b border-[#e4e2df] pb-10">
            <p className="mb-3 text-[10px] tracking-[0.3em] text-[#A8874F] uppercase">
              Order Details
            </p>

            <h1
              className="text-5xl font-light text-[#1b1c1a]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Order #{order._id.slice(-8)}
            </h1>

            <p className="mt-4 text-sm text-[#7A6E63]">
              Review your purchased pieces and delivery status.
            </p>
          </div>

          <div className="border border-[#e4e2df] bg-white p-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-[#B5ADA3] uppercase">
                  Payment
                </p>

                <p className="mt-2 text-[#1b1c1a]">{order.status}</p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] text-[#B5ADA3] uppercase">
                  Status
                </p>

                <p className="mt-2 text-[#A8874F]">{order.orderStatus}</p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] text-[#B5ADA3] uppercase">
                  Total
                </p>

                <p className="mt-2 text-xl font-medium text-[#1b1c1a]">
                  ₹{order.price.amount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-medium">Ordered Products</h2>

            {order.orderItems.map((item) => (
              <div
                key={item.productId}
                className="group border-b border-[#e4e2df] py-8"
              >
                <div className="flex gap-6">
                  <Link to={`/product/${item.productId}`}>
                    <img
                      src={item.images?.[0]?.url}
                      alt={item.title}
                      className="h-36 w-28 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-center">
                    <h3
                      className="text-2xl text-[#1b1c1a]"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#7A6E63]">
                      {item.description}
                    </p>

                    <div className="mt-5 flex gap-8 text-sm">
                      <span className="text-[#7A6E63]">
                        Qty: {item.quantity}
                      </span>

                      <span className="font-medium text-[#1b1c1a]">
                        ₹{item.price.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-[#ece7df] bg-white p-6 shadow-sm">
            <h3
              className="mb-6 text-xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Order Journey
            </h3>

            <div className="flex items-center justify-between">
              {["placed", "processing", "shipped", "delivered"].map(
                (step, index) => {
                  const currentIndex = [
                    "placed",
                    "processing",
                    "shipped",
                    "delivered",
                  ].indexOf(order.orderStatus);

                  const completed = index <= currentIndex;

                  return (
                    <div
                      key={step}
                      className="relative flex flex-1 flex-col items-center"
                    >
                      {/* Line */}
                      {index !== 3 && (
                        <div
                          className={`absolute top-5 left-1/2 h-[2px] w-full ${
                            index < currentIndex
                              ? "bg-[#C9A96E]"
                              : "bg-[#E5DED3]"
                          }`}
                        />
                      )}

                      {/* Circle */}
                      <div
                        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition-all ${
                          completed
                            ? "border-[#C9A96E] bg-[#C9A96E] text-white"
                            : "border-[#E5DED3] bg-white text-[#B5ADA3]"
                        }`}
                      >
                        {completed ? "✓" : index + 1}
                      </div>

                      {/* Label */}
                      <span
                        className={`mt-3 text-xs capitalize ${
                          completed ? "text-[#1b1c1a]" : "text-[#B5ADA3]"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
