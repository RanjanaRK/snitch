import { loginSchema, type LoginFormData } from "../utils/zodSchema";
import ContinueWithGoogle from "./ContinueWithGoogle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("FORM DATA:", data);
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col lg:flex-row selection:bg-[#C9A96E]/30"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* LEFT PANEL (UNCHANGED) */}
        <div
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
          style={{ backgroundColor: "#f5f3f0" }}
        >
          <img
            src="/snitch_editorial_warm.png"
            alt="Snitch Fashion Editorial"
            className="absolute inset-0 w-full h-full object-cover object-top"
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
        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-8 sm:px-14 lg:px-20 py-16">
          <div className="w-full max-w-sm">
            <div className="mb-14">
              <p className="text-[10px] uppercase tracking-[0.22em] mb-4 font-medium text-[#C9A96E]">
                Sign in to Snitch
              </p>
              <h1 className="text-[2.6rem] xl:text-5xl font-light leading-[1.1] text-[#1b1c1a]">
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
                <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#7A6E63]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="hello@example.com"
                  {...register("email")}
                  className="w-full bg-transparent outline-none py-3 text-sm border-b border-[#d0c5b5]"
                />

                {errors.email && (
                  <span className="text-[10px] text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#7A6E63]">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full bg-transparent outline-none py-3 text-sm border-b border-[#d0c5b5]"
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
                className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 mt-2 bg-[#1b1c1a] text-[#fbf9f6]"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>

              {/* DIVIDER */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#e4e2df]" />
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#B5ADA3]">
                  or
                </span>
                <div className="flex-1 h-px bg-[#e4e2df]" />
              </div>

              {/* GOOGLE */}
              <ContinueWithGoogle />

              {/* FOOTER */}
              <p className="text-center text-[11px] text-[#B5ADA3]">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline text-[#7A6E63]">
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
