import { Outlet } from "react-router";
import AiFashionAssistant from "../features/ai/components/AiFashionAssistant";
import Nav from "../features/shared/components/Nav";
import { useSelector } from "react-redux";
import type { RootState } from "./app.store";

const AppLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <Nav />
      <Outlet />

      {user?.role === "buyer" && <AiFashionAssistant />}
    </>
  );
};

export default AppLayout;
