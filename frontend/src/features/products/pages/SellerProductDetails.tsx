import { useParams } from "react-router";

const SellerProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  console.log(productId);

  return <div>Enter</div>;
};

export default SellerProductDetails;
