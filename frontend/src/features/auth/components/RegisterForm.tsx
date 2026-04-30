"use client";

import ContinueWithGoogle from "./ContinueWithGoogle";
import { useForm } from "react-hook-form";

type RegisterFormData = {
  fullName: string;
  contactNumber: string;
  email: string;
  password: string;
  isSeller: boolean;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      isSeller: false,
    },
  });

  const isSeller = watch("isSeller");

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row selection:bg-[#C9A96E]/30"
      style={{
        backgroundColor: "#fbf9f6",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* LEFT PANEL  */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/snitch_editorial_warm.png"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm">
          {/* HEADER */}
          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.22em] mb-4 text-[#C9A96E]">
              Welcome to Snitch
            </p>
            <h1 className="text-[2.6rem] font-light text-[#1b1c1a]">
              Elevate Your Style
            </h1>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-9"
          >
            {/* FULL NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase text-[#7A6E63]">
                Full Name
              </label>
              <input
                {...register("fullName", { required: true })}
                placeholder="e.g. John Doe"
                className="w-full bg-transparent py-3 text-sm border-b border-[#d0c5b5] outline-none"
              />
            </div>

            {/* CONTACT */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase text-[#7A6E63]">
                Contact Number
              </label>
              <input
                {...register("contactNumber", { required: true })}
                placeholder="+91 98765 43210"
                className="w-full bg-transparent py-3 text-sm border-b border-[#d0c5b5] outline-none"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase text-[#7A6E63]">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="hello@example.com"
                className="w-full bg-transparent py-3 text-sm border-b border-[#d0c5b5] outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase text-[#7A6E63]">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="••••••••"
                className="w-full bg-transparent py-3 text-sm border-b border-[#d0c5b5] outline-none"
              />
            </div>

            {/* SELLER CHECKBOX */}
            <label className="flex items-center gap-4 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  {...register("isSeller")}
                  className="peer sr-only"
                />
                <div
                  className="w-4 h-4 border flex items-center justify-center"
                  style={{
                    borderColor: isSeller ? "#C9A96E" : "#d0c5b5",
                    backgroundColor: isSeller ? "#C9A96E" : "transparent",
                  }}
                >
                  {isSeller && (
                    <svg className="w-2.5 h-2.5" viewBox="0 0 12 12">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#fbf9f6"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <span
                className="text-[11px] uppercase"
                style={{ color: isSeller ? "#C9A96E" : "#7A6E63" }}
              >
                Register as Seller
              </span>
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-[11px] uppercase tracking-[0.25em] bg-[#1b1c1a] text-[#fbf9f6]"
            >
              {isSubmitting ? "Creating..." : "Sign Up"}
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[#e4e2df]" />
              <span className="text-[10px] text-[#B5ADA3]">or</span>
              <div className="flex-1 h-px bg-[#e4e2df]" />
            </div>

            <ContinueWithGoogle />

            {/* FOOTER */}
            <p className="text-center text-[11px] text-[#B5ADA3]">
              Already have an account?{" "}
              <a href="/login" className="underline text-[#7A6E63]">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
