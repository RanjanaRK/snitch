import { useNavigate } from "react-router";
import { useWishlist } from "../hooks/useWishlist";
import type { Product } from "../../products/utils/productTypes";
import { X } from "lucide-react";

type Props = {
  product: Product;
  variantId: string;
};

const WishListItemcart = ({ product, variantId }: Props) => {
  const navigate = useNavigate();
  const { handleRemoveWishlist } = useWishlist();

  const imageUrl = product.images?.[0]?.url || "/snitch_editorial_warm.png";

  const handleRemove = async () => {
    // e.stopPropagation(); // important → prevents navigation

    await handleRemoveWishlist({
      productId: product._id,
      variantId,
    });
  };

  return (
    <>
      <div className="group relative overflow-hidden bg-[#f5f3f0]">
        {/* IMAGE */}
        <div className="aspect-4/5 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* REMOVE BUTTON */}
        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center bg-white/80 text-black opacity-0 transition group-hover:opacity-100 hover:bg-white"
        >
          <X size={16} />
        </button>

        {/* OPTIONAL INFO */}
        <div className="p-3">
          <h3
            className="relative line-clamp-1 cursor-pointer overflow-hidden bg-[#f5f3f0] text-sm font-medium text-[#1b1c1a]"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            {product.title}
          </h3>
        </div>
      </div>
    </>
  );
};

export default WishListItemcart;
