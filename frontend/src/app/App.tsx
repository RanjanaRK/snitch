import { RouterProvider } from "react-router";
import "./app.css";
import { routes } from "./app.routes";
import { useSelector } from "react-redux";
import type { UserType } from "../features/auth/utils/authTypes";
const App = () => {
  const user = useSelector((state: UserType | null) => state?.auth?.user);

  console.log(user);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
