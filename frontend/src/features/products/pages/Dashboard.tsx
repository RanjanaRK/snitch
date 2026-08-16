import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../hooks/useProduct";
import type { Product } from "../utils/productTypes";
import type { RootState } from "../../../app/app.store";

const Dashboard = () => {
  const navigate = useNavigate();

  const { handleGetSellerProducts } = useProduct();

  const sellerProducts = useSelector(
    (state: RootState) => state.product.sellerProduct,
  );

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  console.log(sellerProducts);

  return (
    <>
      <div className="bg-[#fbf9f6]font-['Inter'] selection:bg-[#C9A96E]/30v min-h-screen">
        <div className="mx-auto max-w-7xl px-8 lg:px-16 xl:px-24">
          {/* ── Top Bar ── */}

          {/* ── Page Header ── */}

          <div className="flex flex-col justify-between gap-8 border-b border-[#e4e2df] pt-4 pb-10 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] tracking-[0.35em] text-[#C9A96E] uppercase">
                Seller Dashboard
              </p>

              <h1 className="font-['Cormorant_Garamond'] text-5xl font-light text-[#1b1c1a] lg:text-7xl">
                Your Vault
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#7A6E63]">
                Manage your curated collection, monitor inventory, and present
                exceptional pieces to customers.
              </p>

              <div className="mt-6 h-px w-20 bg-[#C9A96E]" />
            </div>

            <button
              onClick={() => navigate("/seller/create-product")}
              className="group relative overflow-hidden border border-[#1b1c1a] px-8 py-4 text-[11px] tracking-[0.28em] uppercase transition-all duration-500 hover:border-[#C9A96E]"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-[#C9A96E] transition-transform duration-500 group-hover:scale-x-100" />

              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#1b1c1a]">
                New Listing
              </span>
            </button>
          </div>

          {/* stats section */}

          <div className="my-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div className="border border-[#e4e2df] bg-white/60 p-6">
              <p className="text-[10px] tracking-[0.2em] text-[#B5ADA3] uppercase">
                Total Listings
              </p>

              <h3 className="mt-3 font-['Cormorant_Garamond'] text-4xl text-[#1b1c1a]">
                {sellerProducts?.length || 0}
              </h3>
            </div>

            <div className="border border-[#e4e2df] bg-white/60 p-6">
              <p className="text-[10px] tracking-[0.2em] text-[#B5ADA3] uppercase">
                Collection
              </p>

              <h3 className="mt-3 font-['Cormorant_Garamond'] text-4xl text-[#1b1c1a]">
                Active
              </h3>
            </div>
          </div>

          {/* ── Product Grid ── */}
          {sellerProducts && sellerProducts.length > 0 ? (
            // <div className="grid grid-cols-1 gap-x-8 gap-y-16 pb-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="grid grid-cols-1 gap-x-10 gap-y-20 pb-32 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sellerProducts.map((prod: Product) => {
                return <ProductCard key={prod._id} product={prod} />;
              })}
            </div>
          ) : (
            <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
              <span className="mb-4 text-[10px] tracking-[0.35em] text-[#C9A96E] uppercase">
                Empty Vault
              </span>

              <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-[#1b1c1a]">
                Begin Your Collection
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#7A6E63]">
                Your archive awaits its first piece. Create a listing and start
                building your premium collection.
              </p>

              <button
                onClick={() => navigate("/seller/create-product")}
                className="mt-10 border border-[#1b1c1a] px-8 py-4 text-[11px] tracking-[0.25em] uppercase transition-all duration-300 hover:border-[#C9A96E] hover:bg-[#C9A96E]"
              >
                Create First Listing
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
