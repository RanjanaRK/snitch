import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import "./app.css";
import { routes } from "./app.routes";
const App = () => {
  const { handleGetme } = useAuth();

  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    handleGetme();
  }, []);

  console.log(user);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
