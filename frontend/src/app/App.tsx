import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import "./app.css";
import { routes } from "./app.routes";

function App() {
  const { handleGetme } = useAuth();

  useEffect(() => {
    handleGetme();
  }, []);

  // console.log(user);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
