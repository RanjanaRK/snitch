import { setUser, setError, setLoading } from "../state/auth.slice";
import { registeruser } from "../service/auth.api";
import type { RegisterFormData } from "../utils/zodSchema";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (userdata: RegisterFormData) => {
    try {
      dispatch(setLoading(true));

      const data = await registeruser(userdata);

      if (data.user) {
        dispatch(setUser(data.user));
      }

      toast.success(data.message);

      return data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";

      dispatch(setError(message));

      toast.error(message);

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleRegister };
};
