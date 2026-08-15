import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const LogoutButton = () => {
  const { handleLogout } = useAuth();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const res = await handleLogout();

      if (res?.success) {
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <button
        onClick={handleSubmit}
        className="relative text-[10px] font-medium tracking-[0.2em] text-[#7A6E63] uppercase transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#C9A96E] after:transition-all after:duration-300 hover:text-[#C9A96E] hover:after:w-full"
      >
        Logout
      </button> */}
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className="text-[10px] font-medium tracking-[0.2em] text-[#7A6E63] uppercase transition-colors duration-300 hover:text-[#C9A96E] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Logging Out..." : "Logout"}
      </button>
    </>
  );
};

export default LogoutButton;
