import { Heart, Sparkle } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import type { RootState } from "../../../app/app.store";
import LogoutButton from "../../auth/components/LogoutButton";
import CategoryMenu from "./CategoryMenu";

const Nav = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <>
      {/* <nav
        className="flex items-center justify-between border-b px-8 pt-10 pb-6 lg:px-16 xl:px-24"
        style={{ borderColor: "#e4e2df" }}
      > */}
      <nav
        className="animate-in slide-in-from-top sticky top-0 z-50 flex items-center justify-between border-b bg-white/80 px-8 pt-6 pb-6 backdrop-blur-xl duration-700 lg:px-16 xl:px-24"
        style={{ borderColor: "#e4e2df" }}
      >
        <Link
          to="/"
          // className="text-sm font-medium tracking-[0.35em] uppercase transition-opacity hover:opacity-80"
          className="text-xl tracking-[0.3em] uppercase transition-all duration-300 hover:tracking-[0.4em]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#C9A96E",
          }}
        >
          Snitch.
        </Link>

        {user?.role === "buyer" && <CategoryMenu />}

        <div
          className="flex items-center gap-6 text-[10px] font-medium tracking-[0.2em] uppercase"
          style={{ color: "#7A6E63" }}
        >
          {user ? (
            <>
              <span
                className="transition-colors duration-300 hover:text-[#C9A96E]"
                style={{ color: "#1b1c1a" }}
              >
                {user.fullname}
              </span>

              {user.role === "buyer" && (
                <>
                  <Link to="/wishlist">
                    <Heart
                      size={18}
                      className="transition-all duration-300 hover:scale-110 hover:text-red-500"
                    />
                  </Link>

                  <Link
                    to="/cart"
                    className="group relative flex items-center transition-all duration-300 hover:scale-110"
                    style={{ color: "#1b1c1a" }}
                    aria-label="Shopping cart"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-colors duration-300 group-hover:text-[#C9A96E]"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    {cartItems?.length > 0 && (
                      <span
                        className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white shadow-md"
                        style={{
                          background: "linear-gradient(135deg,#C9A96E,#E0C58A)",
                          width: "16px",
                          height: "16px",
                          fontSize: "9px",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          letterSpacing: 0,
                        }}
                      >
                        {cartItems.length > 9 ? "9+" : cartItems.length}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/ai-fashion"
                    className="group flex items-center gap-2 rounded-full border border-[#eadfcf] bg-[#f7f2eb] px-4 py-2 transition-all duration-300 hover:border-[#C9A96E] hover:bg-[#C9A96E] hover:text-white"
                  >
                    <Sparkle
                      size={15}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                    AI Stylist
                  </Link>
                </>
              )}

              {user.role === "seller" && (
                <Link
                  to="/seller/dashboard"
                  className="transition-colors hover:text-[#C9A96E]"
                >
                  Seller Dashboard
                </Link>
              )}

              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="transition-colors hover:text-[#C9A96E]"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="transition-colors hover:text-[#C9A96E]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
