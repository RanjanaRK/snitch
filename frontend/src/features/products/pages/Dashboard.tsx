import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../hooks/useProduct";
import type { Product } from "../utils/productTypes";

const Dashboard = () => {
  const navigate = useNavigate();

  const { handleGetSellerProducts } = useProduct();

  const sellerProducts = useSelector(
    (state: any) => state.product.sellerProduct,
  );

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  console.log(sellerProducts);

  return (
    <>
      <div className="bg-[#fbf9f6]font-['Inter'] min-h-screen selection:bg-[#C9A96E]/30">
        <div className="mx-auto max-w-7xl px-8 lg:px-16 xl:px-24">
          {/* ── Top Bar ── */}
          <div className="flex items-center gap-5 pt-10 pb-0">
            <button
              onClick={() => navigate(-1)}
              className="text-lg leading-none text-[#B5ADA3] transition-colors duration-200 hover:text-[#C9A96E]"
              aria-label="Go back"
            >
              ←
            </button>
            <span className="font-mediumtracking-[0.32em] font-['Cormorant_Garamond'] text-xs text-[#C9A96E] uppercase">
              Snitch.
            </span>
          </div>

          {/* ── Page Header ── */}
          <div className="flex flex-col justify-between gap-6 overflow-hidden pt-10 pb-10 md:flex-row md:items-end">
            <div>
              <h1 className="font-['Cormorant_Garamond'] text-4xl leading-tight font-light text-[#1b1c1a] lg:text-5xl">
                Your Vault
              </h1>
              {/* Gold rule separator */}
              <div className="mt-4 h-px w-14 bg-[#C9A96E]" />
            </div>

            <button
              onClick={() => navigate("/seller/create-product")}
              className="w-full bg-[#1b1c1a] px-8 py-4 text-center text-[11px] font-medium tracking-[0.3em] text-[#fbf9f6] uppercase transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#1b1c1a] md:w-auto"
            >
              New Listing
            </button>
          </div>

          {/* ── Product Grid ── */}
          {sellerProducts && sellerProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 pb-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sellerProducts.map((prod: Product) => {
                return <ProductCard key={prod._id} product={prod} />;
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center py-24 text-center">
              <span className="mb-4 text-[10px] font-medium tracking-[0.2em] text-[#C9A96E] uppercase">
                Empty Vault
              </span>
              <p className="mx-auto max-w-md font-['Cormorant_Garamond'] text-lg leading-relaxed text-[#7A6E63]">
                You haven't added any curated pieces to your archive yet. Begin
                by creating a new listing.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
