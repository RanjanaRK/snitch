import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { getMe, loginUser, registerUser } from "../service/auth.api";
import { setError, setLoading, setUser } from "../state/auth.slice";
import type { LoginFormData, RegisterFormData } from "../utils/zodSchema";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (userdata: RegisterFormData) => {
    try {
      dispatch(setLoading(true));

      const data = await registerUser(userdata);

      // console.log(data);

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

      return data;
    } catch (error: any) {
      const message = error.response.data.message || "Login failed";

      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetme = async () => {
    try {
      dispatch(setLoading(true));

      const data = await getMe();
      // console.log(data.user);

      if (data.user) {
        dispatch(setUser(data.user));
      }
    } catch (error: any) {
      // console.log(error);

      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleRegister, handleLogin, handleGetme };
};
