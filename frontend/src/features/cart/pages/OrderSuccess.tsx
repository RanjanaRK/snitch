import { Link, useLocation } from "react-router";

const OrderSuccess = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const orderId = queryParams.get("order_id") || "SN-00000";

  return (
    <div className="min-h-screen bg-[#fbf9f6] pb-24 font-['Inter'] text-[#1b1c1a] selection:bg-[#C9A96E]/30">
      <main className="mx-auto max-w-7xl px-6 pt-12 md:px-12 lg:grid lg:grid-cols-12 lg:gap-16 lg:px-24 lg:pt-20">
        {/* LEFT SIDE */}
        <div className="space-y-12 lg:col-span-7">
          {/* Heading */}
          <section className="space-y-6">
            <span className="text-[10px] tracking-[0.2em] text-[#7A6E63] uppercase">
              Transaction Complete
            </span>

            <h1 className="font-['Cormorant_Garamond'] text-5xl leading-tight font-light tracking-tight md:text-7xl">
              A piece of our <br />
              <i className="italic">Atelier</i> is yours.
            </h1>

            <div className="mt-6 space-y-2">
              <p className="text-sm tracking-widest text-[#7f7668] uppercase">
                Order Reference
              </p>

              <p className="font-['Cormorant_Garamond'] text-2xl text-[#745a27]">
                #{orderId}
              </p>
            </div>
          </section>

          {/* Order Summary */}
          <section className="space-y-8 bg-[#f5f3f0] p-8 md:p-12">
            <h3 className="border-b border-[#d0c5b5] pb-4 font-['Cormorant_Garamond'] text-xl">
              Order Summary
            </h3>

            {/* Product */}
            <div className="flex items-center gap-6">
              <div className="h-32 w-24 shrink-0 overflow-hidden bg-[#eae8e5]">
                <img
                  className="h-full w-full object-cover grayscale-20"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2RecxLWsxoaJynjbfvLhuprDTMGsixBfioU4mbbHAwGqbpMf6F_huInjecTUxna_Zu_L7Gi4m-t0JDR9fsydoDl1zu3a-c0YusFQtRSFCdag1T6MBqd8acu7PunJfNXzTc5uK4eBNrw1lh0lgL_9CbR2AZs24nUxgGwKlUYjOEqEof9FSZrlOpzDmxlNMsvGmGAEPWFT42HixJtHAGEYo2R4TR2b-IV0kxjCslE4okGTbl-Ikc7WyUMQtSnfcurwHAc1qshFN3Ho"
                  alt="product"
                />
              </div>

              <div className="grow space-y-1">
                <h4 className="font-['Cormorant_Garamond'] text-lg">
                  Architectural Wool Overcoat
                </h4>

                <p className="text-sm tracking-tighter text-[#7f7668] uppercase">
                  Camel / Large
                </p>

                <p className="mt-2 font-semibold">$1,450.00</p>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4 border-t border-[#d0c5b5] pt-4">
              <div className="flex justify-between text-sm tracking-widest text-[#7A6E63] uppercase">
                <span>Subtotal</span>
                <span>$1,450.00</span>
              </div>

              <div className="flex justify-between text-sm tracking-widest text-[#7A6E63] uppercase">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>

              <div className="flex justify-between pt-2 font-['Cormorant_Garamond'] text-lg">
                <span>Total</span>

                <span className="text-[#745a27]">$1,450.00</span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <div className="mt-12 space-y-12 lg:sticky lg:top-40 lg:col-span-5 lg:mt-0">
          <div className="space-y-10">
            {/* Delivery */}
            <div className="space-y-4">
              <h3 className="font-['Cormorant_Garamond'] text-xl italic">
                Arrival Estimate
              </h3>

              <p className="leading-relaxed text-[#4d463a]">
                Your curated selection is being prepared for transit. Expect
                arrival between{" "}
                <span className="font-semibold text-[#1b1c1a]">
                  October 24th — 26th
                </span>
                .
              </p>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="font-['Cormorant_Garamond'] text-xl italic">
                Shipping Address
              </h3>

              <p className="text-sm leading-relaxed tracking-tighter text-[#4d463a] uppercase">
                Julianne V. Sterling
                <br />
                742 Avenue Montaigne, Apt 4B
                <br />
                Paris, France 75008
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 pt-8">
              <Link
                to="/orders"
                className="bg-[#745a27] px-8 py-5 text-center text-xs tracking-[0.2em] text-white uppercase transition-all duration-300 hover:opacity-90"
              >
                View Order Status
              </Link>

              <Link
                to="/"
                className="border border-[#7f7668] bg-transparent px-8 py-5 text-center text-xs tracking-[0.2em] text-[#1b1c1a] uppercase transition-all duration-300 hover:bg-[#f5f3f0]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Footer Text */}
          <div className="border-t border-[#d0c5b5]/40 pt-12">
            <p className="text-[10px] leading-loose tracking-widest text-[#7f7668] uppercase">
              A confirmation email has been dispatched. For bespoke alterations
              or inquiries, please contact our private concierge.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
