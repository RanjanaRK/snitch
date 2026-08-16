import { Heart } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router";

interface WishlistButtonProps {
  productId: string;
  variantId: string;
  isWishlisted?: boolean;
}

const WishlistButton = ({
  productId,
  variantId,
  isWishlisted = false,
}: WishlistButtonProps) => {
  const navigate = useNavigate();

  const { handleAddWishlist } = useWishlist();

  const [loading] = useState(false);

  const [liked, setLiked] = useState(isWishlisted);

  const handleSubmit = async () => {
    try {
      setLiked(!liked);

      const data = await handleAddWishlist({
        productId,
        variantId,
      });

      toast.success(data.message);
    } catch (error: any) {
      setLiked(liked);
      toast.error(error.response.data.message);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="group disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" />
      ) : (
        <Heart
          size={20}
          className={`transition-all duration-300 ${
            isWishlisted
              ? "scale-110 fill-red-500 text-red-500"
              : "text-[#7A6E63] hover:scale-110 hover:text-red-500"
          }`}
        />
      )}
    </button>
  );
};

export default WishlistButton;
