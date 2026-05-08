import { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

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
      <div className="">Dashboard</div>
    </>
  );
};

export default Dashboard;
