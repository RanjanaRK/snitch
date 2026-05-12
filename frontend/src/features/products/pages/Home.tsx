import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../../../app/app.store";
import { useProduct } from "../hooks/useProduct";
import { useEffect } from "react";
import type { Product } from "../utils/productTypes";

const Home = () => {
  const products = useSelector((state: RootState) => state.product.products);
  // const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const { handleGetProducts } = useProduct();

  console.log(products);

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <>
      <div
        className="min-h-screen selection:bg-[#C9A96E]/30"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="mx-auto max-w-7xl px-8 lg:px-16 xl:px-24">
          {/* ── Hero / Header ── */}
          <div className="flex flex-col items-center pt-20 pb-20 text-center">
            <span
              className="mb-6 text-[10px] font-medium tracking-[0.24em] uppercase"
              style={{ color: "#C9A96E" }}
            >
              The Collection
            </span>
            <h1
              className="mb-6 text-5xl leading-tight font-light lg:text-7xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#1b1c1a",
              }}
            >
              Curated Archive
            </h1>
            <p
              className="mx-auto max-w-xl text-sm leading-relaxed"
              style={{ color: "#7A6E63" }}
            >
              Discover our latest curation of premium minimalist pieces,
              meticulously designed for effortless elegance and enduring
              quality.
            </p>
          </div>

          {/* ── Product Grid ── */}
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 pb-32 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product: Product) => {
                const imageUrl =
                  product.images && product.images.length > 0
                    ? product.images[0].url
                    : "/snitch_editorial_warm.png"; // Fallback

                return (
                  <div
                    onClick={() => navigate(`/product/${product._id}`)}
                    key={product._id}
                    className="group flex cursor-pointer flex-col"
                  >
                    {/* Image Container */}
                    <div
                      className="mb-6 aspect-4/5 overflow-hidden"
                      style={{ backgroundColor: "#f5f3f0" }}
                    >
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-2">
                      <h3
                        className="text-xl leading-snug transition-colors duration-300 group-hover:text-[#C9A96E]"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          color: "#1b1c1a",
                        }}
                      >
                        {product.title}
                      </h3>

                      <p
                        className="line-clamp-2 text-[12px] leading-relaxed"
                        style={{ color: "#7A6E63" }}
                      >
                        {product.description}
                      </p>

                      <div className="mt-2">
                        <span
                          className="text-[10px] font-medium tracking-[0.2em] uppercase"
                          style={{ color: "#1b1c1a" }}
                        >
                          {product.price?.currency}{" "}
                          {product.price?.amount?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center py-24 text-center">
              <h2
                className="mb-4 text-2xl"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1b1c1a",
                }}
              >
                No pieces available.
              </h2>
              <p
                className="mx-auto max-w-md text-sm leading-relaxed"
                style={{ color: "#7A6E63" }}
              >
                We are currently preparing our next collection. Please check
                back later.
              </p>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <footer
          className="border-t py-12 text-center"
          style={{ borderColor: "#e4e2df" }}
        >
          <span
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#C9A96E",
            }}
          >
            Snitch. © {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    </>
  );
};

export default Home;
