import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import type { Product } from "../utils/productTypes";
import { useCart } from "../../cart/hooks/useCart";

type VariantAttributes = Record<string, string>;

type AvailableAttributes = Record<string, string[]>;

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedAttributes, setSelectedAttributes] =
    useState<VariantAttributes>({});
  // const navigate = useNavigate();
  const { handleGetProductDetails } = useProduct();
  const { handleAddItem } = useCart();

  async function fetchProductDetails() {
    try {
      if (!productId) return;
      const data = await handleGetProductDetails(productId);
      // Handle both cases depending on how API is structured
      setProduct(data?.product || data);
    } catch (error) {
      console.error("Failed to fetch product details", error);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedAttributes(product.variants[0].attributes || {});
    }
  }, [product]);

  const activeVariant = useMemo(() => {
    if (!product?.variants || product.variants.length === 0) return null;
    return product.variants.find((v) => {
      if (!v.attributes) return false;
      const vKeys = Object.keys(v.attributes);
      const sKeys = Object.keys(selectedAttributes);
      const isMatch = vKeys.every(
        (k) => v.attributes[k] === selectedAttributes[k],
      );
      // If they don't have exactly the same keys, they shouldn't perfectly match,
      // but we might only care about matching what's available.
      return vKeys.length === sKeys.length && isMatch;
    });
  }, [product, selectedAttributes]);

  console.log({ product, activeVariant });

  const availableAttributes = useMemo<AvailableAttributes>(() => {
    if (!product?.variants) return {};

    const attrs: Record<string, Set<string>> = {};

    product.variants.forEach((variant) => {
      if (variant.attributes) {
        Object.entries(variant.attributes).forEach(([key, value]) => {
          if (!attrs[key]) {
            attrs[key] = new Set<string>();
          }

          attrs[key].add(String(value));
        });
      }
    });

    const finalAttrs: AvailableAttributes = {};

    Object.keys(attrs).forEach((key) => {
      finalAttrs[key] = Array.from(attrs[key]);
    });

    return finalAttrs;
  }, [product]);

  useEffect(() => {
    setSelectedImage(0);
  }, [activeVariant]);

  const isVariantAvailable = !!activeVariant;

  const handleAttributeChange = (attrName: string, value: string) => {
    const newAttrs = { ...selectedAttributes, [attrName]: value };

    // Find if an exact match exists for this combination
    const exactMatch = product?.variants.find((v) => {
      const vAttrs = v.attributes || {};
      return (
        Object.keys(newAttrs).every((k) => newAttrs[k] === vAttrs[k]) &&
        Object.keys(vAttrs).every((k) => newAttrs[k] === vAttrs[k])
      );
    });

    if (exactMatch) {
      setSelectedAttributes(exactMatch.attributes);
    } else {
      // Find any variant that has this newly selected attribute to fallback nicely
      const fallbackVariant = product?.variants.find(
        (v) => v.attributes && v.attributes[attrName] === value,
      );
      if (fallbackVariant) {
        setSelectedAttributes(fallbackVariant.attributes);
      } else {
        setSelectedAttributes(newAttrs);
      }
    }
  };

  if (!product) {
    return (
      <div
        className="flex min-h-screen items-center justify-center selection:bg-[#C9A96E]/30"
        style={{ backgroundColor: "#fbf9f6" }}
      >
        <p
          style={{ fontFamily: "'Inter', sans-serif", color: "#B5ADA3" }}
          className="animate-pulse text-[10px] font-medium tracking-[0.2em] uppercase"
        >
          Retrieving piece...
        </p>
      </div>
    );
  }

  console.log(product);

  // Fallbacks
  const displayImages =
    activeVariant?.images && activeVariant.images.length > 0
      ? activeVariant.images
      : product.images && product.images.length > 0
        ? product.images
        : [{ url: "/snitch_editorial_warm.png" }];

  const displayPrice = activeVariant?.price?.amount
    ? activeVariant.price
    : product.price;

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen pb-24 selection:bg-[#C9A96E]/30"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="mx-auto max-w-7xl px-8 pt-12 lg:px-16 lg:pt-20 xl:px-24">
          <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-24">
            {/* ── LEFT: Image Gallery ── */}
            <div className="flex w-full flex-col-reverse gap-4 md:flex-row lg:w-[70%] lg:gap-6">
              {/* Thumbnails (Vertical on Desktop, Horizontal on Mobile) */}
              {displayImages.length > 1 && (
                <div className="scrollbar-hide -shrink-0 flex w-full flex-row gap-4 overflow-x-auto pb-2 md:max-h-[calc(100vh-200px)] md:w-20 md:flex-col md:overflow-y-auto md:pb-0 lg:w-24">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-4/5 w-20 shrink-0 overflow-hidden transition-all duration-300 md:w-full ${selectedImage === idx ? "opacity-100 ring-1 ring-[#C9A96E] ring-offset-2" : "opacity-50 hover:opacity-100"}`}
                      style={{
                        backgroundColor: "#f5f3f0",
                      }}
                    >
                      <img
                        src={img.url}
                        alt={`View ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div
                className="group relative aspect-4/5 w-full overflow-hidden"
                style={{ backgroundColor: "#f5f3f0" }}
              >
                <img
                  src={
                    displayImages[selectedImage]?.url || displayImages[0].url
                  }
                  alt={product.title}
                  className="h-full w-full object-cover transition-opacity duration-500"
                />
                {displayImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === 0 ? displayImages.length - 1 : prev - 1,
                        )
                      }
                      className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center border opacity-0 transition-all duration-300 group-hover:opacity-100 lg:left-6"
                      style={{
                        backgroundColor: "rgba(251,249,246,0.8)",
                        borderColor: "#e4e2df",
                        color: "#1b1c1a",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fbf9f6")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(251,249,246,0.8)")
                      }
                      aria-label="Previous image"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === displayImages.length - 1 ? 0 : prev + 1,
                        )
                      }
                      className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center border opacity-0 transition-all duration-300 group-hover:opacity-100 lg:right-6"
                      style={{
                        backgroundColor: "rgba(251,249,246,0.8)",
                        borderColor: "#e4e2df",
                        color: "#1b1c1a",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fbf9f6")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(251,249,246,0.8)")
                      }
                      aria-label="Next image"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* ── RIGHT: Product Details ── */}
            <div className="flex w-full flex-col pt-4 lg:sticky lg:top-24 lg:w-[30%]">
              <h1
                className="mb-6 text-4xl leading-[1.05] font-light md:text-5xl lg:text-6xl"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1b1c1a",
                }}
              >
                {product.title}
              </h1>

              <div className="mb-8">
                <span
                  className="text-sm font-medium tracking-[0.2em] uppercase"
                  style={{ color: "#1b1c1a" }}
                >
                  {displayPrice?.currency}{" "}
                  {displayPrice?.amount?.toLocaleString()}
                </span>
              </div>

              <div
                className="mb-8 h-px w-full"
                style={{ backgroundColor: "#e4e2df" }}
              />

              {/* Options/Variants */}
              {Object.entries(availableAttributes).map(([attrName, values]) => (
                <div key={attrName} className="mb-6">
                  <h3
                    className="mb-3 text-[10px] font-medium tracking-[0.24em] uppercase"
                    style={{ color: "#C9A96E" }}
                  >
                    {attrName}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {values.map((val: string) => {
                      const isSelected = selectedAttributes[attrName] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => handleAttributeChange(attrName, val)}
                          className={`border px-4 py-2 text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 ${isSelected ? "border-[#1b1c1a] bg-[#1b1c1a] text-[#fbf9f6]" : "border-[#d0c5b5] text-[#1b1c1a] hover:border-[#1b1c1a]"}`}
                          style={
                            isSelected ? {} : { backgroundColor: "transparent" }
                          }
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Stock Information */}
              {activeVariant && activeVariant.stock !== undefined && (
                <div className="mb-6">
                  <span
                    className={`text-[10px] font-medium tracking-[0.2em] uppercase ${activeVariant.stock > 0 ? "text-green-700" : "text-red-700"}`}
                  >
                    {activeVariant.stock > 0
                      ? `${activeVariant.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              )}

              <div className="mb-12">
                <h3
                  className="mb-4 text-[10px] font-medium tracking-[0.24em] uppercase"
                  style={{ color: "#C9A96E" }}
                >
                  The Details
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7A6E63" }}
                >
                  {product.description}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-auto flex flex-col gap-4">
                <button
                  className="w-full py-4 text-[11px] font-medium tracking-[0.25em] uppercase transition-all duration-300"
                  style={{
                    backgroundColor: "#1b1c1a",
                    color: "#fbf9f6",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#C9A96E";
                    e.currentTarget.style.color = "#1b1c1a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#1b1c1a";
                    e.currentTarget.style.color = "#fbf9f6";
                  }}
                  disabled={!isVariantAvailable}
                  onClick={() => {
                    if (!activeVariant) return;
                    handleAddItem({
                      productId: product._id,
                      variantId: activeVariant._id,
                    });
                  }}
                >
                  Add to Cart
                </button>

                <button
                  className="w-full border py-4 text-[11px] font-medium tracking-[0.25em] uppercase transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#d0c5b5",
                    color: "#1b1c1a",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#C9A96E";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#d0c5b5";
                  }}
                >
                  Buy Now
                </button>
              </div>

              {/* Extra elegant details */}
              <div
                className="mt-14 space-y-4 text-[10px] tracking-widest uppercase"
                style={{ color: "#B5ADA3" }}
              >
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "#e4e2df" }}
                >
                  <span>Shipping</span>
                  <span>Complimentary over INR 15,000</span>
                </div>
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "#e4e2df" }}
                >
                  <span>Returns</span>
                  <span>Within 14 days of delivery</span>
                </div>
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "#e4e2df" }}
                >
                  <span>Authenticity</span>
                  <span>100% Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
