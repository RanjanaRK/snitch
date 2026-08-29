import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../utils/zodSchema";

const ResetPasswordForm = () => {
  const { handleResetPassword } = useAuth();

  const [searchParams] = useSearchParams();

  const [isSuccess, setIsSuccess] = useState(false);

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing password reset token");
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid or missing password reset token");
      return;
    }

    try {
      const res = await handleResetPassword(token, data.password);

      toast.success(res?.message || "Password reset successfully");

      setIsSuccess(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  // SUCCESS
  if (isSuccess) {
    return (
      <div
        className="flex min-h-screen flex-col selection:bg-[#C9A96E]/30 lg:flex-row"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* LEFT PANEL */}
        <div className="group relative hidden overflow-hidden lg:flex lg:w-1/2">
          <img
            src="/snitch_editorial_warm.png"
            alt="Snitch fashion editorial"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-6000 group-hover:scale-105"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(27,24,20,0.75) 0%, rgba(27,24,20,0.15) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex min-h-screen w-full items-center justify-center px-8 py-16 sm:px-14 lg:w-1/2 lg:px-20">
          <div className="w-full max-w-sm text-center">
            <div className="mb-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f0eadf]">
                <svg
                  className="h-8 w-8 text-[#C9A96E]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <p className="mb-4 text-[10px] font-medium tracking-[0.22em] text-[#C9A96E] uppercase">
              Password Updated
            </p>

            <h1 className="text-[2.6rem] leading-[1.1] font-extralight tracking-tight text-[#1b1c1a] xl:text-5xl">
              All Set
            </h1>

            <div className="mx-auto mt-4 h-px w-20 bg-[#C9A96E]" />

            <p className="mt-6 text-sm leading-6 text-[#7A6E63]">
              Your password has been successfully updated. You can now sign in
              using your new password.
            </p>

            <Link
              to="/login"
              className="mt-8 inline-flex w-full items-center justify-center bg-[#1b1c1a] py-4 text-[11px] tracking-[0.25em] text-[#fbf9f6] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C9A96E] hover:shadow-lg"
            >
              Continue to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // RESET FORM
  return (
    <div
      className="flex min-h-screen flex-col selection:bg-[#C9A96E]/30 lg:flex-row"
      style={{
        backgroundColor: "#fbf9f6",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* LEFT PANEL */}
      <div className="group relative hidden overflow-hidden lg:flex lg:w-1/2">
        <img
          src="/snitch_editorial_warm.png"
          alt="Snitch fashion editorial"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-6000 group-hover:scale-105"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(27,24,20,0.75) 0%, rgba(27,24,20,0.15) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex min-h-screen w-full items-center justify-center px-8 py-16 sm:px-14 lg:w-1/2 lg:px-20">
        <div className="w-full max-w-sm">
          {/* HEADER */}
          <div className="mb-14">
            <p className="mb-4 text-[10px] font-medium tracking-[0.22em] text-[#C9A96E] uppercase">
              Account Recovery
            </p>

            <h1 className="text-[2.6rem] leading-[1.1] font-extralight tracking-tight text-[#1b1c1a] xl:text-5xl">
              New Password
            </h1>

            <div className="mt-4 h-px w-20 bg-[#C9A96E]" />

            <p className="mt-6 text-sm leading-6 text-[#7A6E63]">
              Create a new secure password for your account.
            </p>
          </div>

          {/* FORM */}
          <div className="animate-in fade-in slide-in-from-top-4 w-full max-w-sm duration-700">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-10"
            >
              {/* PASSWORD */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full border-b border-[#d0c5b5] bg-transparent py-3 text-sm transition-all duration-300 outline-none focus:border-[#C9A96E]"
                />

                {errors.password && (
                  <span className="text-[10px] text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="w-full border-b border-[#d0c5b5] bg-transparent py-3 text-sm transition-all duration-300 outline-none focus:border-[#C9A96E]"
                />

                {errors.confirmPassword && (
                  <span className="text-[10px] text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting || !token}
                className="w-full bg-[#1b1c1a] py-4 text-[11px] tracking-[0.25em] text-[#fbf9f6] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C9A96E] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Updating...
                  </span>
                ) : (
                  "Update Password"
                )}
              </button>

              {/* FOOTER */}
              <p className="text-center text-[11px] text-[#B5ADA3]">
                Remember your password?{" "}
                <Link to="/login" className="text-[#7A6E63] underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
