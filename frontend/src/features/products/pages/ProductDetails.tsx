// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { useProduct } from "../hooks/useProduct";
// import type { Product } from "../utils/productTypes";

// const ProductDetails = () => {
//   const { productId } = useParams<string>();
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedAttributes, setSelectedAttributes] = useState({});
//   //   const navigate = useNavigate();
//   //   const { handleGetProductById } = useProduct();
//   //   const { handleAddItem } = useCart();
//   //   console.log(productId);

//   const [user, setUser] = useState<Product | null>(null);

//   //   const product = useSelector((state: RootState) => state.product.products);

//   const { handleGetProductDetails } = useProduct();

//   const fetchDetails = async () => {
//     // if (!productId) {
//     //   return null;
//     // }

//     const data = await handleGetProductDetails(productId!);
//     // console.log(data);

//     setUser(data.product);
//   };

//   //   console.log(user);

//   useEffect(() => {
//     fetchDetails();
//   }, [user]);

//   return <></>;
// };

// export default ProductDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import type { Product } from "../utils/productTypes";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const { handleGetProductDetails } = useProduct();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!productId) return;

      const data = await handleGetProductDetails(productId);

      setProduct(data.product);
    };

    fetchDetails();
  }, [productId]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{
        backgroundColor: "#fbf9f6",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div>
          {/* Main Image */}
          <div
            className="overflow-hidden rounded-sm"
            style={{ backgroundColor: "#f5f3f0" }}
          >
            <img
              src={product.images[selectedImage]?.url}
              alt={product.title}
              className="h-[600px] w-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`overflow-hidden border ${
                  selectedImage === idx
                    ? "border-[#C9A96E]"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img.url}
                  alt={`thumb-${idx}`}
                  className="h-24 w-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center">
          <span
            className="mb-4 text-xs tracking-[0.3em] uppercase"
            style={{ color: "#C9A96E" }}
          >
            Snitch.
          </span>

          <h1
            className="mb-6 text-5xl font-light"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#1b1c1a",
            }}
          >
            {product.title}
          </h1>

          <p className="mb-8 text-lg" style={{ color: "#1b1c1a" }}>
            ₹ {product.price.amount}
          </p>

          <div className="mb-8 h-px" style={{ backgroundColor: "#e4e2df" }} />

          <div className="mb-10">
            <h3
              className="mb-3 text-xs tracking-[0.25em] uppercase"
              style={{ color: "#C9A96E" }}
            >
              Description
            </h3>

            <p className="leading-7" style={{ color: "#7A6E63" }}>
              {product.description}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              className="w-full py-4 text-xs tracking-[0.25em] uppercase transition-all"
              style={{
                backgroundColor: "#1b1c1a",
                color: "#fbf9f6",
              }}
            >
              Add To Cart
            </button>

            <button
              className="w-full border py-4 text-xs tracking-[0.25em] uppercase"
              style={{
                borderColor: "#d0c5b5",
                color: "#1b1c1a",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
