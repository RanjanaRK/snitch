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

  const imageUrl = product.images?.[0]?.url;

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await handleRemoveWishlist({
      productId: product._id,
      variantId,
    });
  };

  return (
    <>
      <div
        className="group relative cursor-pointer border border-[#e4e2df] bg-[#fbf9f6] transition-all duration-500 hover:border-[#C9A96E]"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        {/* IMAGE */}
        <div className="aspect-4/5 overflow-hidden bg-[#f5f3f0]">
          <img
            src={imageUrl}
            alt={product.title}
            className="h-full w-full object-cover transition-all duration-1000 ease-out group-hover:scale-[1.04]"
            // className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>

        {/* REMOVE */}
        <button
          onClick={handleRemove}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center border border-[#e4e2df] bg-[#fbf9f6]/90 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:border-red-400 hover:text-red-500"
        >
          <X size={15} />
        </button>

        {/* CONTENT */}
        <div className="p-5">
          <p
            className="mb-2 text-[9px] tracking-[0.25em] uppercase"
            style={{ color: "#C9A96E" }}
          >
            Saved Piece
          </p>

          <h3
            className="mb-3 line-clamp-1 text-xl transition-colors duration-300 group-hover:text-[#C9A96E]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#1b1c1a",
            }}
          >
            {product.title}
          </h3>

          <div className="h-px w-full bg-[#e4e2df]" />

          <div className="mt-4 flex items-center justify-between">
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "#7A6E63" }}
            >
              Wishlist
            </span>

            <span
              className="text-[10px] tracking-[0.2em] uppercase opacity-0 transition-all duration-300 group-hover:opacity-100"
              style={{ color: "#C9A96E" }}
            >
              View →
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishListItemcart;
