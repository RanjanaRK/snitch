import { useNavigate } from "react-router";
import type { Product } from "../utils/productTypes";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "/snitch_editorial_warm.png";
  return (
    <>
      <div
        onClick={() => {
          navigate(`/seller/product/${product._id}`);
        }}
        key={product._id}
        className="group cursor-pointer flex flex-col"
      >
        {/* Image Container */}
        <div className="aspect-4/5 overflow-hidden mb-6 bg-[#f5f3f0] ">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <h3
              className="text-xl leading-snug transition-colors duration-300 group-hover:text-[#C9A96E] font-['Cormorant_Garamond'] text-[#1b1c1a] font-semibold
              "
            >
              {product.title}
            </h3>
          </div>

          <p className="text-[12px] line-clamp-2 leading-relaxed text-[#7A6E63] ">
            {product.description}
          </p>

          <div className="mt-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#1b1c1a]">
              {product.price?.currency}{" "}
              {product.price?.amount?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
