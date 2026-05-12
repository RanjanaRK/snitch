import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import "./app.css";
import { routes } from "./app.routes";
import type { RootState } from "./app.store";

function App() {
  const { handleGetme } = useAuth();

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    handleGetme();
  }, []);

  console.log(user);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
