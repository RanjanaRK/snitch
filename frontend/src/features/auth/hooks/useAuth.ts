import { setUser, setError, setLoading } from "../state/auth.slice";
import { loginUser, registerUser } from "../service/auth.api";
import type { LoginFormData, RegisterFormData } from "../utils/zodSchema";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (userdata: RegisterFormData) => {
    try {
      dispatch(setLoading(true));

      const data = await registerUser(userdata);

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

  const handleLogin = async (userData: LoginFormData) => {
    try {
      dispatch(setLoading(true));

      const data = await loginUser(userData);

      if (data.user) {
        dispatch(setUser(data.user));
      }
      toast.success(data.message);
      return data;
    } catch (error: any) {
      const message = error.response.data.message || "Login failed";

      toast.error(message);
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleRegister, handleLogin };
};
