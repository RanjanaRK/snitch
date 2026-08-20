import { useDispatch } from "react-redux";
import { getAllOrders, getSingleOrder } from "../service/order.api";
import { setOrder, setOrders } from "../state/order.slice";

const useOrder = () => {
  const dispatch = useDispatch();

  const handleGetAllOrders = async () => {
    const response = await getAllOrders();

    dispatch(setOrders(response.orders));

    return response;
  };

  const handleGetSingleOrder = async (orderId: string) => {
    const response = await getSingleOrder(orderId);

    dispatch(setOrder(response.order));
    return response;
  };

  return {
    handleGetAllOrders,
    handleGetSingleOrder,
  };
};

export default useOrder;
