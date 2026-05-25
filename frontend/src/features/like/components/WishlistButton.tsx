import { Heart } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";
import { toast } from "sonner";
import { useState } from "react";

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
  const { handleAddWishlist } = useWishlist();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = await handleAddWishlist({
        productId,
        variantId,
      });

      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="disabled:opacity-50"
    >
      <Heart fill={isWishlisted ? "red" : "transparent"} color="red" />
    </button>
  );
};

export default WishlistButton;
