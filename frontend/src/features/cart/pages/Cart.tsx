import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/app.store";
import { useCart } from "../hooks/useCart";
import { Link, useNavigate } from "react-router";
import type { Product, Variant } from "../../products/utils/productTypes";
import CheckoutButton from "../components/CheckoutButton";

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
  const cart = useSelector((state: RootState) => state.cart);

  const {
    handleGetCartItem,
    handleIncreamentCartItem,
    handleDecreamentCartItem,
    handleRemoveCartItem,
  } = useCart();

  const navigate = useNavigate();

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    handleGetCartItem();
  }, []);

  const getDisplayImage = (product: Product, variant: Variant) => {
    console.log(variant);

    if (variant?.images?.length) return variant.images[0].url;
    if (product?.images?.length) return product.images[0].url;
    return null;
  };

  const formatCurrency = (amount: number, currency = "INR") =>
    `${currency} ${Number(amount).toLocaleString("en-IN")}`;

  if (!cart?.items?.length) {
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
                  {cart?.items.length}{" "}
                  {cart?.items.length === 1 ? "piece" : "pieces"}
                </p>
              </div>

              {/* ── Cart Item List ── */}
              <div className="flex flex-col gap-6">
                {cart.items.map((item) => {
                  const { product, variant, price } = item;

                  const productId = product?._id;

                  const variantId =
                    typeof variant === "string" ? variant : variant?._id;

                  const imageUrl = getDisplayImage(product, variant);

                  const displayPrice =
                    price ?? variant?.price ?? product?.price;

                  const qty = quantities[productId] ?? item.quantity ?? 1;

                  const attributes = variant?.attributes ?? {};

                  const stock = variant?.stock;

                  return (
                    <div
                      key={product._id}
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
                              id={`qty-dec-${product._id}`}
                              onClick={() =>
                                handleDecreamentCartItem({
                                  productId,
                                  variantId,
                                })
                              }
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
                              id={`qty-inc-${product._id}`}
                              onClick={() =>
                                handleIncreamentCartItem({
                                  productId,
                                  variantId,
                                })
                              }
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
                            id={`remove-${product._id}`}
                            className="text-[10px] font-medium tracking-[0.22em] uppercase transition-all duration-200 hover:underline hover:opacity-70"
                            style={{ color: tokens.muted }}
                            onClick={() =>
                              handleRemoveCartItem({ productId, variantId })
                            }
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
                  boxShadow: "0 20px 40px rgba(27,28,26,0.04) ",
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
                      {cart.totalPrice}
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
                      className="text-[10px] tracking-widest uppercase"
                      style={{
                        color:
                          cart.totalPrice >= 15000 ? "#5a7a5a" : tokens.muted,
                      }}
                    >
                      {cart.totalPrice >= 15000
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
                    <span className="text-[10px] tracking-widest text-[#5a7a5a] uppercase">
                      Included
                    </span>
                  </div>
                </div>

                {/* Total divider */}
                <div className="mb-6 border-t border-[#e4e2df]" />

                {/* Grand Total */}
                <div className="mb-8 flex items-baseline justify-between">
                  <span
                    className="text-[10px] font-medium tracking-[0.22em] uppercase"
                    style={{ color: tokens.onSurface }}
                  >
                    Total
                  </span>
                  <span className="bg-[#f5f3f0] text-base font-medium tracking-[0.18em] uppercase">
                    {formatCurrency(cart.totalPrice)}
                  </span>
                </div>

                {/* Primary CTA */}
                {/* <button
                  id="proceed-checkout"
                  className="mb-3 w-full bg-[#1b1c1a] py-4 text-[11px] font-medium tracking-[0.25em] text-[#fbf9f6] uppercase transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#1b1c1a]"
                >
                  Proceed to Checkout
                </button> */}

                <CheckoutButton />
                <button
                  id="continue-shopping"
                  className="w-full border border-[#d0c5b5] bg-transparent py-4 text-[11px] font-medium tracking-[0.25em] text-[#1b1c1a] uppercase transition-all duration-300 hover:border-[#C9A96E]"
                >
                  Continue Shopping
                </button>

                {/* Policy footnote */}
                <p className="mt-6 text-center text-[9px] leading-relaxed tracking-[0.14em] text-[#B5ADA3] uppercase">
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
