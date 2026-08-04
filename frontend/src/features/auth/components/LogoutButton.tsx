import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const LogoutButton = () => {
  const { handleLogout } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await handleLogout();

    if (res?.success) {
      navigate("/");
    }
  };

  return (
    <>
      <button onClick={handleSubmit} className="hover:underline">
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
