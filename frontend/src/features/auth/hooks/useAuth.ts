import { setUser, setError, setLoading } from "../state/auth.slice";
import { registeruser } from "../service/auth.api";
import type { RegisterFormData } from "../utils/zodSchema";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (userdata: RegisterFormData) => {
    const data = await registeruser(userdata);

    dispatch(setUser(data.user || null));
  };

  return { handleRegister };
};
