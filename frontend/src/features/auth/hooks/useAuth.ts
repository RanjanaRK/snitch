import { setUser, setError, setLoading } from "../state/auth.slice";
import { registeruser } from "../service/auth.api";
import type { RegisterFormData } from "../utils/zodSchema";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (userdata: RegisterFormData) => {
    try {
      const data = await registeruser(userdata);

      if (data.user) {
        dispatch(setUser(data.user || null));

        toast.success(data.message);
      }
    } catch (error: any) {
      dispatch(setError(error.response?.data.message || "Registration failed"));
    }
  };

  return { handleRegister };
};
