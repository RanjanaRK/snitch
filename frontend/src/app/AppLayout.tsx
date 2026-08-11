import { Outlet } from "react-router";
import AiFashionAssistant from "../features/ai/components/AiFashionAssistant";
import Nav from "../features/shared/components/Nav";

const AppLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <AiFashionAssistant />
    </>
  );
};

export default AppLayout;
