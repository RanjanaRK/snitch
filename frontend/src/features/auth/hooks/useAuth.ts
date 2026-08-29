import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  forgotPassword,
  getMe,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  verifyEmail,
} from "../service/auth.api";
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
      console.log("LOGIN ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);
      console.log("MESSAGE:", error.response?.data?.message);

      const message = error.response?.data?.message || "Login failed";

      dispatch(setError(message));

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleVerifyEmail = async (token: string) => {
    try {
      dispatch(setLoading(true));
      const data = await verifyEmail(token);
      toast.success(data.message);
      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Email verification failed";
      dispatch(setError(message));
      toast.error(message);
      throw error;
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

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));

      const data = await logout();

      toast.success(data.message);

      dispatch(setUser(null));

      return data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Logout failed";

      toast.error(message);

      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      dispatch(setLoading(true));

      const data = await forgotPassword(email);

      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to send password reset link";

      dispatch(setError(message));

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResetPassword = async (token: string, password: string) => {
    try {
      dispatch(setLoading(true));

      const data = await resetPassword(token, password);

      toast.success(data.message);

      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to reset password";

      dispatch(setError(message));

      toast.error(message);

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleVerifyEmail,
    handleGetme,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
  };
};
