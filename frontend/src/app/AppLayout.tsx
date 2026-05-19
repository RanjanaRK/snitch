import { Outlet } from "react-router";
import Nav from "../features/shared/components/nav";

const AppLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default AppLayout;
