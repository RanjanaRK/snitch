// import { Link, useLocation } from "react-router";

// const OrderSuccess = () => {
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);

//   const orderId = queryParams.get("order_id") || "SN-00000";

//   return (
//     <div className="min-h-screen bg-[#fbf9f6] pb-24 font-['Inter'] text-[#1b1c1a] selection:bg-[#C9A96E]/30">
//       <main className="mx-auto max-w-7xl px-6 pt-12 md:px-12 lg:grid lg:grid-cols-12 lg:gap-16 lg:px-24 lg:pt-20">
//         {/* LEFT SIDE */}
//         <div className="space-y-12 lg:col-span-7">
//           {/* Heading */}
//           <section className="space-y-6">
//             <span className="text-[10px] tracking-[0.2em] text-[#7A6E63] uppercase">
//               Transaction Complete
//             </span>

//             <h1 className="font-['Cormorant_Garamond'] text-5xl leading-tight font-light tracking-tight md:text-7xl">
//               A piece of our <br />
//               <i className="italic">Atelier</i> is yours.
//             </h1>

//             <div className="mt-6 space-y-2">
//               <p className="text-sm tracking-widest text-[#7f7668] uppercase">
//                 Order Reference
//               </p>

//               <p className="font-['Cormorant_Garamond'] text-2xl text-[#745a27]">
//                 #{orderId}
//               </p>
//             </div>
//           </section>

//           {/* Order Summary */}
//           <section className="space-y-8 bg-[#f5f3f0] p-8 md:p-12">
//             <h3 className="border-b border-[#d0c5b5] pb-4 font-['Cormorant_Garamond'] text-xl">
//               Order Summary
//             </h3>

//             {/* Product */}
//             <div className="flex items-center gap-6">
//               <div className="h-32 w-24 shrink-0 overflow-hidden bg-[#eae8e5]">
//                 <img
//                   className="h-full w-full object-cover grayscale-20"
//                   src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2RecxLWsxoaJynjbfvLhuprDTMGsixBfioU4mbbHAwGqbpMf6F_huInjecTUxna_Zu_L7Gi4m-t0JDR9fsydoDl1zu3a-c0YusFQtRSFCdag1T6MBqd8acu7PunJfNXzTc5uK4eBNrw1lh0lgL_9CbR2AZs24nUxgGwKlUYjOEqEof9FSZrlOpzDmxlNMsvGmGAEPWFT42HixJtHAGEYo2R4TR2b-IV0kxjCslE4okGTbl-Ikc7WyUMQtSnfcurwHAc1qshFN3Ho"
//                   alt="product"
//                 />
//               </div>

//               <div className="grow space-y-1">
//                 <h4 className="font-['Cormorant_Garamond'] text-lg">
//                   Architectural Wool Overcoat
//                 </h4>

//                 <p className="text-sm tracking-tighter text-[#7f7668] uppercase">
//                   Camel / Large
//                 </p>

//                 <p className="mt-2 font-semibold">$1,450.00</p>
//               </div>
//             </div>

//             {/* Pricing */}
//             <div className="space-y-4 border-t border-[#d0c5b5] pt-4">
//               <div className="flex justify-between text-sm tracking-widest text-[#7A6E63] uppercase">
//                 <span>Subtotal</span>
//                 <span>$1,450.00</span>
//               </div>

//               <div className="flex justify-between text-sm tracking-widest text-[#7A6E63] uppercase">
//                 <span>Shipping</span>
//                 <span>Complimentary</span>
//               </div>

//               <div className="flex justify-between pt-2 font-['Cormorant_Garamond'] text-lg">
//                 <span>Total</span>

//                 <span className="text-[#745a27]">$1,450.00</span>
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="mt-12 space-y-12 lg:sticky lg:top-40 lg:col-span-5 lg:mt-0">
//           <div className="space-y-10">
//             {/* Delivery */}
//             <div className="space-y-4">
//               <h3 className="font-['Cormorant_Garamond'] text-xl italic">
//                 Arrival Estimate
//               </h3>

//               <p className="leading-relaxed text-[#4d463a]">
//                 Your curated selection is being prepared for transit. Expect
//                 arrival between{" "}
//                 <span className="font-semibold text-[#1b1c1a]">
//                   October 24th — 26th
//                 </span>
//                 .
//               </p>
//             </div>

//             {/* Address */}
//             <div className="space-y-4">
//               <h3 className="font-['Cormorant_Garamond'] text-xl italic">
//                 Shipping Address
//               </h3>

//               <p className="text-sm leading-relaxed tracking-tighter text-[#4d463a] uppercase">
//                 Julianne V. Sterling
//                 <br />
//                 742 Avenue Montaigne, Apt 4B
//                 <br />
//                 Paris, France 75008
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col gap-4 pt-8">
//               <Link
//                 to="/orders"
//                 className="bg-[#745a27] px-8 py-5 text-center text-xs tracking-[0.2em] text-white uppercase transition-all duration-300 hover:opacity-90"
//               >
//                 View Order Status
//               </Link>

//               <Link
//                 to="/"
//                 className="border border-[#7f7668] bg-transparent px-8 py-5 text-center text-xs tracking-[0.2em] text-[#1b1c1a] uppercase transition-all duration-300 hover:bg-[#f5f3f0]"
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>

//           {/* Footer Text */}
//           <div className="border-t border-[#d0c5b5]/40 pt-12">
//             <p className="text-[10px] leading-loose tracking-widest text-[#7f7668] uppercase">
//               A confirmation email has been dispatched. For bespoke alterations
//               or inquiries, please contact our private concierge.
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default OrderSuccess;

// import { Check, Package, ArrowRight } from "lucide-react";
// import { Link, useLocation } from "react-router";

// const OrderSuccess = () => {
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);
//   const orderId = queryParams.get("order_id") || "SN-00000";

//   return (
//     <div className="min-h-screen bg-[#faf9f6] text-[#1b1c1a]">
//       <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
//         {/* SUCCESS HEADER */}
//         <section className="border-b border-[#e4e0d9] pb-12 text-center">
//           <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a96e]/40 bg-[#f5efe4]">
//             <Check size={28} strokeWidth={1.5} className="text-[#9b793e]" />
//           </div>

//           <p className="mb-3 text-[10px] font-medium tracking-[0.3em] text-[#9b793e] uppercase">
//             Payment Successful
//           </p>

//           <h1
//             className="text-5xl leading-tight font-light tracking-tight text-[#1b1c1a] sm:text-6xl"
//             style={{
//               fontFamily: "'Cormorant Garamond', serif",
//             }}
//           >
//             Thank you for your
//             <br />
//             <span className="italic">order.</span>
//           </h1>

//           <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-[#777067]">
//             Your order has been successfully placed. We've received your payment
//             and will begin preparing your items shortly.
//           </p>

//           <div className="mt-7">
//             <p className="text-[10px] tracking-[0.2em] text-[#8a8277] uppercase">
//               Order Reference
//             </p>

//             <p className="mt-2 text-lg font-medium tracking-wide text-[#80652f]">
//               #{orderId}
//             </p>
//           </div>
//         </section>

//         {/* CONTENT */}
//         <div className="grid gap-10 pt-12 lg:grid-cols-[1.5fr_1fr]">
//           {/* LEFT */}
//           <div className="space-y-8">
//             {/* ORDER SUMMARY */}
//             <section className="border border-[#e4e0d9] bg-white">
//               <div className="flex items-center justify-between border-b border-[#e4e0d9] px-6 py-5 sm:px-8">
//                 <div>
//                   <p className="text-[10px] tracking-[0.2em] text-[#9b793e] uppercase">
//                     Your Purchase
//                   </p>

//                   <h2
//                     className="mt-1 text-2xl font-light"
//                     style={{
//                       fontFamily: "'Cormorant Garamond', serif",
//                     }}
//                   >
//                     Order Summary
//                   </h2>
//                 </div>

//                 <Package
//                   size={21}
//                   strokeWidth={1.4}
//                   className="text-[#9b793e]"
//                 />
//               </div>

//               {/* PRODUCT */}
//               <div className="p-6 sm:p-8">
//                 <div className="flex gap-5">
//                   <div className="h-28 w-22 shrink-0 overflow-hidden bg-[#f2f0ec] sm:h-32 sm:w-24">
//                     <img
//                       src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2RecxLWsxoaJynjbfvLhuprDTMGsixBfioU4mbbHAwGqbpMf6F_huInjecTUxna_Zu_L7Gi4m-t0JDR9fsydoDl1zu3a-c0YusFQtRSFCdag1T6MBqd8acu7PunJfNXzTc5uK4eBNrw1lh0lgL_9CbR2AZs24nUxgGwKlUYjOEqEof9FSZrlOpzDmxlNMsvGmGAEPWFT42HixJtHAGEYo2R4TR2b-IV0kxjCslE4okGTbl-Ikc7WyUMQtSnfcurwHAc1qshFN3Ho"
//                       alt="Architectural Wool Overcoat"
//                       className="h-full w-full object-cover"
//                     />
//                   </div>

//                   <div className="flex flex-1 flex-col justify-center">
//                     <h3
//                       className="text-xl font-light"
//                       style={{
//                         fontFamily: "'Cormorant Garamond', serif",
//                       }}
//                     >
//                       Architectural Wool Overcoat
//                     </h3>

//                     <p className="mt-2 text-[11px] tracking-[0.15em] text-[#8a8277] uppercase">
//                       Camel · Large
//                     </p>

//                     <p className="mt-4 text-sm font-medium">$1,450.00</p>
//                   </div>
//                 </div>

//                 {/* PRICE */}
//                 <div className="mt-8 space-y-4 border-t border-[#e8e5df] pt-6">
//                   <div className="flex justify-between text-sm text-[#777067]">
//                     <span>Subtotal</span>
//                     <span>$1,450.00</span>
//                   </div>

//                   <div className="flex justify-between text-sm text-[#777067]">
//                     <span>Shipping</span>
//                     <span className="text-[#80652f]">Complimentary</span>
//                   </div>

//                   <div className="flex justify-between border-t border-[#e8e5df] pt-5">
//                     <span
//                       className="text-xl font-light"
//                       style={{
//                         fontFamily: "'Cormorant Garamond', serif",
//                       }}
//                     >
//                       Total
//                     </span>

//                     <span className="text-xl font-medium text-[#80652f]">
//                       $1,450.00
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* DELIVERY */}
//             <section className="border border-[#e4e0d9] bg-white p-6 sm:p-8">
//               <div className="flex items-start gap-4">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5efe4]">
//                   <Package
//                     size={18}
//                     strokeWidth={1.5}
//                     className="text-[#9b793e]"
//                   />
//                 </div>

//                 <div>
//                   <p className="text-[10px] tracking-[0.2em] text-[#9b793e] uppercase">
//                     Delivery
//                   </p>

//                   <h3
//                     className="mt-1 text-xl font-light"
//                     style={{
//                       fontFamily: "'Cormorant Garamond', serif",
//                     }}
//                   >
//                     Estimated Arrival
//                   </h3>

//                   <p className="mt-2 text-sm leading-6 text-[#777067]">
//                     Your order is being prepared for shipment.
//                   </p>

//                   <p className="mt-3 text-sm font-medium text-[#1b1c1a]">
//                     October 24th — 26th
//                   </p>
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* RIGHT */}
//           <aside className="lg:sticky lg:top-10 lg:self-start">
//             <div className="border border-[#e4e0d9] bg-white">
//               {/* ADDRESS */}
//               <div className="p-6 sm:p-8">
//                 <p className="text-[10px] tracking-[0.2em] text-[#9b793e] uppercase">
//                   Delivering To
//                 </p>

//                 <h3
//                   className="mt-2 text-2xl font-light"
//                   style={{
//                     fontFamily: "'Cormorant Garamond', serif",
//                   }}
//                 >
//                   Shipping Address
//                 </h3>

//                 <div className="mt-5 border-l border-[#c9a96e] pl-4">
//                   <p className="text-sm leading-6 text-[#4d463a]">
//                     Julianne V. Sterling
//                     <br />
//                     742 Avenue Montaigne, Apt 4B
//                     <br />
//                     Paris, France 75008
//                   </p>
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               <div className="border-t border-[#e4e0d9] bg-[#faf9f6] p-6 sm:p-8">
//                 <Link
//                   to="/orders"
//                   className="group flex w-full items-center justify-center gap-3 bg-[#80652f] px-6 py-4 text-[11px] font-medium tracking-[0.18em] text-white uppercase transition-all duration-300 hover:bg-[#6f5728]"
//                 >
//                   View Order Status
//                   <ArrowRight
//                     size={15}
//                     className="transition-transform duration-300 group-hover:translate-x-1"
//                   />
//                 </Link>

//                 <Link
//                   to="/"
//                   className="mt-3 flex w-full items-center justify-center border border-[#d6d0c7] bg-white px-6 py-4 text-[11px] font-medium tracking-[0.18em] text-[#1b1c1a] uppercase transition-all duration-300 hover:border-[#9b793e] hover:text-[#80652f]"
//                 >
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>

//             {/* CONFIRMATION */}
//             <div className="mt-6 border-t border-[#e4e0d9] pt-6">
//               <p className="text-center text-[10px] leading-5 tracking-[0.08em] text-[#8a8277] uppercase">
//                 A confirmation email has been sent to your registered email
//                 address. You can track your order anytime from your orders page.
//               </p>
//             </div>
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default OrderSuccess;

import { ArrowRight, Check, Package, Truck } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../../../app/app.store";
import useOrder from "../../order/hooks/useOrder";

const OrderSuccess = () => {
  const location = useLocation();

  const { handleGetSingleOrder } = useOrder();

  const order = useSelector((state: RootState) => state.order.order);

  const queryParams = new URLSearchParams(location.search);

  const orderId = queryParams.get("order_id");

  useEffect(() => {
    if (orderId) {
      handleGetSingleOrder(orderId);
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
        <div className="text-center">
          <h1
            className="text-3xl font-light"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Order not found
          </h1>

          <Link
            to="/"
            className="mt-5 inline-block text-sm text-[#80652f] underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#d8d2c8] border-t-[#80652f]" />

          <p className="mt-4 text-sm text-[#777067]">Loading your order...</p>
        </div>
      </div>
    );
  }

  const totalItems = order.orderItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const formatDate = (date?: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const estimatedDelivery = order.estimatedDelivery
    ? formatDate(order.estimatedDelivery)
    : "To be confirmed";

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1b1c1a]">
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
        {/* SUCCESS HEADER */}

        <section className="border-b border-[#e4e0d9] pb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a96e]/40 bg-[#f5efe4]">
            <Check size={28} strokeWidth={1.5} className="text-[#9b793e]" />
          </div>

          <p className="mb-3 text-[10px] font-medium tracking-[0.3em] text-[#9b793e] uppercase">
            Payment Successful
          </p>

          <h1
            className="text-5xl leading-tight font-light tracking-tight sm:text-6xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Thank you for your
            <br />
            <span className="italic">order.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-[#777067]">
            Your order has been successfully placed. We've received your payment
            and will begin preparing your items shortly.
          </p>

          <div className="mt-7">
            <p className="text-[10px] tracking-[0.2em] text-[#8a8277] uppercase">
              Order Reference
            </p>

            <p className="mt-2 text-lg font-medium tracking-wide text-[#80652f]">
              #{order._id.slice(-8).toUpperCase()}
            </p>
          </div>
        </section>

        {/* CONTENT */}

        <div className="grid gap-10 pt-12 lg:grid-cols-[1.5fr_1fr]">
          {/* LEFT */}

          <div className="space-y-8">
            {/* ORDER SUMMARY */}

            <section className="border border-[#e4e0d9] bg-white">
              <div className="flex items-center justify-between border-b border-[#e4e0d9] px-6 py-5 sm:px-8">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#9b793e] uppercase">
                    Your Purchase
                  </p>

                  <h2
                    className="mt-1 text-2xl font-light"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    Order Summary
                  </h2>
                </div>

                <Package
                  size={21}
                  strokeWidth={1.4}
                  className="text-[#9b793e]"
                />
              </div>

              {/* PRODUCTS */}

              <div className="divide-y divide-[#e8e5df]">
                {order.orderItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="flex gap-5 p-6 sm:p-8"
                  >
                    {/* IMAGE */}

                    <div className="h-28 w-22 shrink-0 overflow-hidden bg-[#f2f0ec] sm:h-32 sm:w-24">
                      <img
                        src={item.images?.[0]?.url}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* DETAILS */}

                    <div className="flex flex-1 flex-col justify-center">
                      <h3
                        className="text-xl font-light"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      >
                        {item.title}
                      </h3>

                      <p className="mt-2 text-[11px] tracking-[0.15em] text-[#8a8277] uppercase">
                        Quantity · {item.quantity}
                      </p>

                      <p className="mt-4 text-sm font-medium">
                        {formatPrice(item.price.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* PRICE */}

              <div className="border-t border-[#e8e5df] p-6 sm:p-8">
                <div className="flex justify-between text-sm text-[#777067]">
                  <span>
                    Subtotal · {totalItems}{" "}
                    {totalItems === 1 ? "item" : "items"}
                  </span>

                  <span>{formatPrice(order.price.amount)}</span>
                </div>

                <div className="mt-4 flex justify-between text-sm text-[#777067]">
                  <span>Shipping</span>

                  <span className="text-[#80652f]">Complimentary</span>
                </div>

                <div className="mt-5 flex justify-between border-t border-[#e8e5df] pt-5">
                  <span
                    className="text-xl font-light"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    Total
                  </span>

                  <span className="text-xl font-medium text-[#80652f]">
                    {formatPrice(order.price.amount)}
                  </span>
                </div>
              </div>
            </section>

            {/* DELIVERY */}

            <section className="border border-[#e4e0d9] bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5efe4]">
                  <Truck
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#9b793e]"
                  />
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#9b793e] uppercase">
                    Delivery
                  </p>

                  <h3
                    className="mt-1 text-xl font-light"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    Estimated Arrival
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#777067]">
                    Your order is currently{" "}
                    <span className="font-medium text-[#1b1c1a]">
                      {order.orderStatus}
                    </span>
                    .
                  </p>

                  <p className="mt-3 text-sm font-medium text-[#1b1c1a]">
                    {estimatedDelivery}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT */}

          <aside className="lg:sticky lg:top-10 lg:self-start">
            <div className="border border-[#e4e0d9] bg-white">
              {/* ORDER STATUS */}

              <div className="p-6 sm:p-8">
                <p className="text-[10px] tracking-[0.2em] text-[#9b793e] uppercase">
                  Order Status
                </p>

                <h3
                  className="mt-2 text-2xl font-light"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {order.orderStatus}
                </h3>

                <div className="mt-5 border-l border-[#c9a96e] pl-4">
                  <p className="text-sm leading-6 text-[#4d463a]">
                    Order placed successfully.
                  </p>

                  <p className="mt-2 text-xs text-[#8a8277]">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="border-t border-[#e4e0d9] bg-[#faf9f6] p-6 sm:p-8">
                <Link
                  to={`/orders/${order._id}`}
                  className="group flex w-full items-center justify-center gap-3 bg-[#80652f] px-6 py-4 text-[11px] font-medium tracking-[0.18em] text-white uppercase transition-all duration-300 hover:bg-[#6f5728]"
                >
                  Track Order
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/"
                  className="mt-3 flex w-full items-center justify-center border border-[#d6d0c7] bg-white px-6 py-4 text-[11px] font-medium tracking-[0.18em] text-[#1b1c1a] uppercase transition-all duration-300 hover:border-[#9b793e] hover:text-[#80652f]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* CONFIRMATION */}

            <div className="mt-6 border-t border-[#e4e0d9] pt-6">
              <p className="text-center text-[10px] leading-5 tracking-[0.08em] text-[#8a8277] uppercase">
                Your payment has been successfully processed. You can track your
                order anytime from your orders page.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
