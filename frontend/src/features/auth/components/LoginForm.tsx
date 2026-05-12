import { loginSchema, type LoginFormData } from "../utils/zodSchema";
import ContinueWithGoogle from "./ContinueWithGoogle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "sonner";
const LoginForm = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await handleLogin(data);
      toast.success(res?.message);

      if (res?.user?.role === "buyer") {
        navigate("/");
      } else if (res?.user?.role === "seller") {
        navigate("/seller/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        className="flex min-h-screen flex-col selection:bg-[#C9A96E]/30 lg:flex-row"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* LEFT PANEL (UNCHANGED) */}
        <div
          className="relative hidden overflow-hidden lg:flex lg:w-1/2"
          style={{ backgroundColor: "#f5f3f0" }}
        >
          <img
            src="/snitch_editorial_warm.png"
            alt="Snitch Fashion Editorial"
            className="absolute inset-0 h-full w-full object-cover object-top"
            style={{ filter: "brightness(0.97)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(27,24,20,0.62) 0%, rgba(27,24,20,0.08) 45%, transparent 100%)",
            }}
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex min-h-screen w-full items-center justify-center px-8 py-16 sm:px-14 lg:w-1/2 lg:px-20">
          <div className="w-full max-w-sm">
            <div className="mb-14">
              <p className="mb-4 text-[10px] font-medium tracking-[0.22em] text-[#C9A96E] uppercase">
                Sign in to Snitch
              </p>
              <h1 className="text-[2.6rem] leading-[1.1] font-light text-[#1b1c1a] xl:text-5xl">
                Enter the Vault
              </h1>
            </div>

            {/* ✅ FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-10"
            >
              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="hello@example.com"
                  {...register("email")}
                  className="w-full border-b border-[#d0c5b5] bg-transparent py-3 text-sm outline-none"
                />

                {errors.email && (
                  <span className="text-[10px] text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full border-b border-[#d0c5b5] bg-transparent py-3 text-sm outline-none"
                />

                {errors.password && (
                  <span className="text-[10px] text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full bg-[#1b1c1a] py-4 text-[11px] font-medium tracking-[0.25em] text-[#fbf9f6] uppercase transition-all duration-300 hover:bg-[#8e7e61]"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>

              {/* DIVIDER */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-[#e4e2df]" />
                <span className="text-[10px] tracking-[0.15em] text-[#B5ADA3] uppercase">
                  or
                </span>
                <div className="h-px flex-1 bg-[#e4e2df]" />
              </div>

              {/* GOOGLE */}
              <ContinueWithGoogle />

              {/* FOOTER */}
              <p className="text-center text-[11px] text-[#B5ADA3]">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-[#7A6E63] underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
