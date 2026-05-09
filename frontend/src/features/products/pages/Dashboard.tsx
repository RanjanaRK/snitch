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
      <div className=" min-h-screen bg-[#fbf9f6]font-['Inter'] selection:bg-[#C9A96E]/30">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
          {/* ── Top Bar ── */}
          <div className="pt-10 pb-0 flex items-center gap-5">
            <button
              onClick={() => navigate(-1)}
              className=" text-lg leading-none text-[#B5ADA3] hover:text-[#C9A96E] transition-colors duration-200"
              aria-label="Go back"
            >
              ←
            </button>
            <span className=" text-xs font-mediumtracking-[0.32em]  uppercase  font-['Cormorant_Garamond'] text-[#C9A96E] ">
              Snitch.
            </span>
          </div>

          {/* ── Page Header ── */}
          <div className="pt-10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
            <div>
              <h1 className="text-4xl lg:text-5xl font-light leading-tight font-['Cormorant_Garamond'] text-[#1b1c1a]">
                Your Vault
              </h1>
              {/* Gold rule separator */}
              <div className="mt-4 w-14 h-px bg-[#C9A96E]" />
            </div>

            <button
              onClick={() => navigate("/seller/create-product")}
              className="py-4 px-8 text-[11px] uppercase tracking-[0.3em] font-medium 
             transition-all duration-300 w-full md:w-auto text-center
             bg-[#1b1c1a] text-[#fbf9f6]
             hover:bg-[#C9A96E] hover:text-[#1b1c1a]"
            >
              New Listing
            </button>
          </div>

          {/* ── Product Grid ── */}
          {sellerProducts && sellerProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-24">
              {sellerProducts.map((prod: Product) => {
                return <ProductCard key={prod._id} product={prod} />;
              })}
            </div>
          ) : (
            <div className="py-24 text-center flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium mb-4 text-[#C9A96E]">
                Empty Vault
              </span>
              <p className="max-w-md mx-auto text-lg leading-relaxed font-['Cormorant_Garamond'] text-[#7A6E63]">
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
