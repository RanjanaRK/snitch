import { useSelector } from "react-redux";
import type { RootState } from "../../../app/app.store";
import WishListItemcart from "../components/WishListItemcart";
import { useEffect } from "react";
import { useWishlist } from "../hooks/useWishlist";

const WishList = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const { handleGetWishlist } = useWishlist();

  useEffect(() => {
    handleGetWishlist();
  }, []);

  console.log(wishlistItems);

  if (!wishlistItems.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf9f6]">
        <p className="text-xs tracking-[0.2em] text-[#B5ADA3] uppercase">
          Your wishlist is empty
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="min-h-screen px-6 py-12 lg:px-16"
        style={{ backgroundColor: "#fbf9f6" }}
      >
        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-3xl font-light tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Wishlist
          </h1>
          <p className="mt-2 text-xs tracking-[0.2em] text-[#B5ADA3] uppercase">
            Saved pieces you love
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {wishlistItems.map((item) => (
            <WishListItemcart
              key={item._id}
              product={item.product}
              variantId={
                typeof item.variant === "string"
                  ? item.variant
                  : item.variant?._id
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default WishList;
