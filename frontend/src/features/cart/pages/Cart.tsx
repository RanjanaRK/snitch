import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/app.store";
import { useCart } from "../hooks/useCart";
import { Link, useNavigate } from "react-router";
import type { Product, Variant } from "../../products/utils/productTypes";

const tokens = {
  surface: "#fbf9f6",
  surfaceLow: "#f5f3f0",
  surfaceLowest: "#ffffff",
  surfaceHigh: "#eae8e5",
  surfaceHighest: "#e4e2df",
  onSurface: "#1b1c1a",
  onSurfaceVariant: "#4d463a",
  secondary: "#7A6E63",
  muted: "#B5ADA3",
  primary: "#C9A96E",
  primaryDark: "#745a27",
  outlineVariant: "#d0c5b5",
  outline: "#7f7668",
};

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { handleGetCartItem } = useCart();

  console.log(cartItems);

  const navigate = useNavigate();

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    handleGetCartItem();
  }, []);

  const changeQty = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) + delta),
    }));
  };

  const getVariantDetails = (product: Product, variantId: Variant) => {
    if (!product?.variants || !variantId) return null;
    return product.variants;
  };

  const getDisplayImage = (product: Product, variant: Variant) => {
    if (variant?.images?.length) return variant.images[0].url;
    if (product?.images?.length) return product.images[0].url;
    return null;
  };

  const formatCurrency = (amount: number, currency = "INR") =>
    `${currency} ${Number(amount).toLocaleString("en-IN")}`;

  if (!cartItems?.length) {
    return (
      <>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <div
          className="flex min-h-screen flex-col"
          style={{
            backgroundColor: tokens.surface,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Nav */}
          <nav
            className="flex items-center justify-between px-8 pt-10 pb-6 lg:px-16 xl:px-24"
            style={{ borderBottom: `1px solid ${tokens.surfaceHighest}` }}
          >
            <Link
              to="/"
              className="text-sm font-medium tracking-[0.35em] uppercase transition-opacity hover:opacity-80"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: tokens.primary,
              }}
            >
              Snitch.
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="text-[10px] font-medium tracking-[0.22em] uppercase transition-colors hover:opacity-70"
              style={{ color: tokens.secondary }}
            >
              Return to Archive
            </button>
          </nav>

          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 pb-24">
            <p
              className="text-5xl leading-tight font-light md:text-6xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: tokens.onSurface,
              }}
            >
              Your selection is empty.
            </p>
            <p
              className="text-[10px] tracking-[0.22em] uppercase"
              style={{ color: tokens.muted }}
            >
              Curate your collection
            </p>
            <Link
              to="/"
              className="mt-4 px-10 py-4 text-[11px] font-medium tracking-[0.25em] uppercase transition-all duration-300"
              style={{
                backgroundColor: tokens.onSurface,
                color: tokens.surface,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.primary;
                e.currentTarget.style.color = tokens.onSurface;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = tokens.onSurface;
                e.currentTarget.style.color = tokens.surface;
              }}
            >
              Explore the Archive
            </Link>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen pb-24 selection:bg-[#C9A96E]/30"
        style={{
          backgroundColor: tokens.surface,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Main Content ── */}
        <div className="mx-auto max-w-7xl px-8 pt-12 lg:px-16 lg:pt-20 xl:px-24">
          <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-20">
            <div className="w-full lg:w-[65%]">
              {/* Heading */}
              <div className="mb-10">
                <h1
                  className="mb-2 leading-[1.05] font-light"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: tokens.onSurface,
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  }}
                >
                  Your Selection
                </h1>
                <p
                  className="text-[10px] font-medium tracking-[0.24em] uppercase"
                  style={{ color: tokens.muted }}
                >
                  {cartItems?.length}{" "}
                  {cartItems?.length === 1 ? "piece" : "pieces"}
                </p>
              </div>

              {/* ── Cart Item List ── */}
              <div className="flex flex-col gap-6">
                {cartItems.map((item) => {
                  const {
                    product,
                    variant,
                    price,
                    product: { _id },
                  } = item;
                  const variantDetail = getVariantDetails(product, variant);
                  const imageUrl = getDisplayImage(product, variant);
                  const displayPrice =
                    price ?? variant?.price ?? product?.price;
                  const qty = quantities[_id] ?? item.quantity ?? 1;
                  const attributes = variant?.attributes ?? {};
                  const stock = variant?.stock;
                  const variantPrice = variant?.price;

                  return (
                    <div
                      key={_id}
                      className="flex gap-6 p-6 transition-all duration-300 md:gap-8 md:p-8"
                      style={{ backgroundColor: tokens.surfaceLow }}
                    >
                      {/* Product Image */}
                      <div
                        className="shrink-0 overflow-hidden"
                        style={{
                          width: "clamp(100px, 15vw, 160px)",
                          aspectRatio: "4/5",
                          backgroundColor: tokens.surfaceHighest,
                        }}
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product?.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div
                            className="flex h-full w-full items-center justify-center"
                            style={{ backgroundColor: tokens.surfaceHigh }}
                          />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          {/* Title */}
                          <h2
                            className="mb-3 leading-tight font-light"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                              color: tokens.onSurface,
                            }}
                          >
                            {product?.title}
                          </h2>

                          {/* Variant Attribute Chips */}
                          {Object.keys(attributes).length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-2">
                              {Object.entries(attributes).map(([key, val]) => (
                                <span
                                  key={key}
                                  className="px-3 py-1 text-[9px] font-medium tracking-[0.18em] uppercase"
                                  style={{
                                    backgroundColor: tokens.primary,
                                    color: "#fff",
                                  }}
                                >
                                  {val}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Price */}
                          <p
                            className="mb-1 text-[11px] font-medium tracking-[0.2em] uppercase"
                            style={{ color: tokens.onSurface }}
                          >
                            {displayPrice
                              ? formatCurrency(
                                  displayPrice.amount,
                                  displayPrice.currency,
                                )
                              : "—"}
                          </p>

                          {/* Stock */}
                          {stock !== undefined && (
                            <p
                              className="mb-4 text-[10px] tracking-[0.15em] uppercase"
                              style={{ color: tokens.muted }}
                            >
                              {stock > 0 ? `${stock} in stock` : "Out of stock"}
                            </p>
                          )}
                          {displayPrice.amount !== variantPrice.amount && (
                            <>
                              {displayPrice.amount > variantPrice.amount ? (
                                <p className="mb-4 text-[10px] font-bold tracking-[0.15em] text-green-800 uppercase">
                                  {" "}
                                  you will get this at{" "}
                                  {formatCurrency(
                                    variantPrice.amount,
                                    variantPrice.currency,
                                  )}{" "}
                                  save{" "}
                                  {Math.abs(
                                    variantPrice.amount - displayPrice.amount,
                                  )}
                                  .{" "}
                                </p>
                              ) : (
                                <p className="mb-4 text-[10px] font-bold tracking-[0.15em] text-red-600 uppercase">
                                  {" "}
                                  Warning this product will cost you{" "}
                                  {Math.abs(
                                    variantPrice.amount - displayPrice.amount,
                                  )}{" "}
                                  more.{" "}
                                </p>
                              )}
                            </>
                          )}
                        </div>

                        {/* Bottom Row: Quantity + Remove */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity Stepper */}
                          <div
                            className="flex items-center"
                            style={{
                              border: `1px solid ${tokens.outlineVariant}`,
                            }}
                          >
                            <button
                              id={`qty-dec-${_id}`}
                              //   onClick={() => changeQty(_id, -1)}
                              className="flex h-9 w-9 items-center justify-center text-sm font-light transition-colors hover:opacity-60"
                              style={{
                                color: tokens.onSurface,
                                borderRight: `1px solid ${tokens.outlineVariant}`,
                              }}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span
                              className="w-10 text-center text-[11px] font-medium tracking-[0.12em] select-none"
                              style={{ color: tokens.onSurface }}
                            >
                              {qty}
                            </span>
                            <button
                              id={`qty-inc-${_id}`}
                              //   onClick={() =>
                              //     handleIncrementCartItem({
                              //       productId: _id,
                              //       variantId,
                              //     })
                              //   }
                              className="flex h-9 w-9 items-center justify-center text-sm font-light transition-colors hover:opacity-60"
                              style={{
                                color: tokens.onSurface,
                                borderLeft: `1px solid ${tokens.outlineVariant}`,
                              }}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            id={`remove-${_id}`}
                            className="text-[10px] font-medium tracking-[0.22em] uppercase transition-all duration-200 hover:underline hover:opacity-70"
                            style={{ color: tokens.muted }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Policy strip */}
              <div
                className="mt-10 grid grid-cols-3 gap-4 pt-8 text-[10px] tracking-[0.12em] uppercase"
                style={{
                  borderTop: `1px solid ${tokens.surfaceHighest}`,
                  color: tokens.muted,
                }}
              >
                <div>
                  <p
                    className="mb-1 font-medium"
                    style={{ color: tokens.secondary }}
                  >
                    Shipping
                  </p>
                  <p>Complimentary over INR 15,000</p>
                </div>
                <div>
                  <p
                    className="mb-1 font-medium"
                    style={{ color: tokens.secondary }}
                  >
                    Returns
                  </p>
                  <p>Within 14 days of delivery</p>
                </div>
                <div>
                  <p
                    className="mb-1 font-medium"
                    style={{ color: tokens.secondary }}
                  >
                    Authenticity
                  </p>
                  <p>100% Guaranteed</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:sticky lg:top-28 lg:w-[35%]">
              <div
                className="p-8"
                style={{
                  backgroundColor: tokens.surfaceLowest,
                  boxShadow: "0 20px 40px rgba(27,28,26,0.04)",
                }}
              >
                {/* Heading */}
                <h2
                  className="mb-6 font-light"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.75rem",
                    color: tokens.onSurface,
                  }}
                >
                  The Total
                </h2>

                {/* Tonal divider */}
                <div
                  className="mb-6"
                  style={{ height: 1, backgroundColor: tokens.surfaceHighest }}
                />

                {/* Line items */}
                <div className="mb-6 flex flex-col gap-4">
                  <div className="flex items-baseline justify-between">
                    <span
                      className="text-[10px] tracking-[0.18em] uppercase"
                      style={{ color: tokens.secondary }}
                    >
                      Subtotal
                    </span>
                    <span
                      className="text-[11px] font-medium tracking-[0.12em] uppercase"
                      style={{ color: tokens.onSurface }}
                    >
                      {formatCurrency(cartItems.totalPrice)}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span
                      className="text-[10px] tracking-[0.18em] uppercase"
                      style={{ color: tokens.secondary }}
                    >
                      Shipping
                    </span>
                    <span
                      className="text-[10px] tracking-[0.1em] uppercase"
                      style={{
                        color:
                          cartItems.totalPrice >= 15000
                            ? "#5a7a5a"
                            : tokens.muted,
                      }}
                    >
                      {cartItems.totalPrice >= 15000
                        ? "Complimentary"
                        : `Complimentary over INR 15,000`}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span
                      className="text-[10px] tracking-[0.18em] uppercase"
                      style={{ color: tokens.secondary }}
                    >
                      Duties & Taxes
                    </span>
                    <span
                      className="text-[10px] tracking-[0.1em] uppercase"
                      style={{ color: tokens.muted }}
                    >
                      Included
                    </span>
                  </div>
                </div>

                {/* Total divider */}
                <div
                  className="mb-6"
                  style={{ height: 1, backgroundColor: tokens.surfaceHighest }}
                />

                {/* Grand Total */}
                <div className="mb-8 flex items-baseline justify-between">
                  <span
                    className="text-[10px] font-medium tracking-[0.22em] uppercase"
                    style={{ color: tokens.onSurface }}
                  >
                    Total
                  </span>
                  <span
                    className="text-base font-medium tracking-[0.18em] uppercase"
                    style={{ color: tokens.onSurface }}
                  >
                    {formatCurrency(cartItems.totalPrice)}
                  </span>
                </div>

                {/* Primary CTA */}
                <button
                  id="proceed-checkout"
                  className="mb-3 w-full py-4 text-[11px] font-medium tracking-[0.25em] uppercase transition-all duration-300"
                  style={{
                    backgroundColor: tokens.onSurface,
                    color: tokens.surface,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = tokens.primary;
                    e.currentTarget.style.color = tokens.onSurface;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = tokens.onSurface;
                    e.currentTarget.style.color = tokens.surface;
                  }}
                  //   onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>

                {/* Secondary ghost CTA */}
                <button
                  id="continue-shopping"
                  className="w-full py-4 text-[11px] font-medium tracking-[0.25em] uppercase transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${tokens.outlineVariant}`,
                    color: tokens.onSurface,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tokens.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = tokens.outlineVariant;
                  }}
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>

                {/* Policy footnote */}
                <p
                  className="mt-6 text-center text-[9px] leading-relaxed tracking-[0.14em] uppercase"
                  style={{ color: tokens.muted }}
                >
                  Free returns within 14 days · Authenticity guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
